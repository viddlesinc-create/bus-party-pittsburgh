/**
 * ============================================
 * Pitt Party Bus - SSR Server
 * ============================================
 * 
 * This is the CANONICAL production entrypoint for the application.
 * 
 * IMPORTANT: Every HTTP request in production is served by this Node server,
 * which runs the SSR render function for that URL before sending HTML to the browser.
 * 
 * The app does NOT require prerendered static files. This server performs
 * true per-request server-side rendering on every incoming request.
 * 
 * Commands:
 *   Development: npm run dev     (Vite SSR middleware with HMR)
 *   Production:  npm run build   (Build client + server bundles)
 *                npm run start   (Run this server in production mode)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function createServer() {
  const app = express();

  // Gzip compression for all responses
  app.use(compression());

  let vite: any;

  if (!isProduction) {
    // ============================================
    // DEVELOPMENT MODE
    // ============================================
    // Uses Vite's SSR middleware for hot module replacement.
    // Every request is still server-rendered, but with live reloading.
    
    const { createServer: createViteServer } = await import('vite');
    
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    // ============================================
    // PRODUCTION MODE - Static Asset Serving
    // ============================================
    // Serves pre-built static assets (JS, CSS, images) from dist/client.
    // These are the client-side hydration bundles, NOT pre-rendered HTML.
    
    const sirv = (await import('sirv')).default;
    
    // Cache hashed assets forever (they have content hashes in filenames)
    app.use(
      '/assets',
      sirv(path.resolve(__dirname, 'dist/client/assets'), {
        maxAge: 31536000, // 1 year
        immutable: true,
      })
    );

    // Serve other static files (robots.txt, sitemap.xml, etc.)
    app.use(
      sirv(path.resolve(__dirname, 'dist/client'), {
        extensions: [],
        gzip: true,
        brotli: true,
      })
    );
  }

  // ============================================
  // SSR HANDLER - PER-REQUEST RENDERING
  // ============================================
  // THIS IS THE KEY: Every request that reaches this handler is
  // rendered fresh by the SSR render function. No static HTML files
  // are served - all content is generated on-demand for each request.
  
  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      // ----------------------------------------
      // Step 1: Load the HTML template
      // ----------------------------------------
      let template: string;
      
      if (!isProduction) {
        // Development: read fresh template and transform with Vite
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        // Production: use the built template from dist/client
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
      }

      // ----------------------------------------
      // Step 2: Load the SSR render function
      // ----------------------------------------
      let render: (url: string) => Promise<{ 
        html: string; 
        helmet: { title: string; meta: string; link: string; script: string }; 
        initialData: unknown;
        matchedRoute: string | null;
        statusCode: number;
      }>;
      
      if (!isProduction) {
        // Development: use Vite's SSR module loader (with HMR)
        const module = await vite.ssrLoadModule('/src/entry-server.tsx');
        render = module.render;
      } else {
        // Production: use the pre-built server bundle
        const module = await import('./dist/server/entry-server.js');
        render = module.render;
      }

      // ----------------------------------------
      // Step 3: RENDER THE APP TO HTML
      // ----------------------------------------
      // This is where SSR happens. The render() function:
      // - Matches the route for the URL
      // - Loads any data required by the route
      // - Renders the React app to an HTML string
      // - Extracts meta tags from react-helmet-async
      // - Returns the HTML and data for hydration
      
      const { html: appHtml, helmet, initialData, statusCode } = await render(url);

      // ----------------------------------------
      // Step 4: Inject rendered content into template
      // ----------------------------------------
      let finalHtml = template;

      // Inject the SSR-rendered React app HTML
      if (template.includes('<!--ssr-outlet-->')) {
        finalHtml = finalHtml.replace('<!--ssr-outlet-->', appHtml);
      } else {
        finalHtml = finalHtml.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
      }

      // Inject head tags (title, meta, Open Graph, etc.)
      if (helmet) {
        finalHtml = finalHtml.replace(
          '</head>',
          `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}</head>`
        );
      }

      // ----------------------------------------
      // Step 5: Inject initial data for hydration
      // ----------------------------------------
      // The client will use window.__INITIAL_DATA__ to hydrate
      // without needing to re-fetch data
      
      if (initialData !== null) {
        const serializedData = JSON.stringify(initialData)
          .replace(/</g, '\\u003c')
          .replace(/>/g, '\\u003e')
          .replace(/&/g, '\\u0026');
        finalHtml = finalHtml.replace(
          '</body>',
          `<script>window.__INITIAL_DATA__=${serializedData}</script></body>`
        );
      }

      // ----------------------------------------
      // Step 6: Send the fully-rendered HTML response
      // ----------------------------------------
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(finalHtml);

    } catch (error) {
      // Handle errors
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(error as Error);
      }
      
      console.error('SSR Error:', error);
      
      res.status(500).end(
        isProduction 
          ? 'Internal Server Error' 
          : `<pre>${(error as Error).stack}</pre>`
      );
    }
  });

  // ============================================
  // Start the server
  // ============================================
  app.listen(port, () => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`🚀 SSR Server running at http://localhost:${port}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`   Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
    console.log(`   SSR:  Every request is server-side rendered`);
    if (!isProduction) {
      console.log(`   HMR:  Enabled via Vite middleware`);
    }
    console.log('');
  });
}

createServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
