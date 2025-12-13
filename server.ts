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

  // Gzip compression for production
  app.use(compression());

  let vite: any;

  if (!isProduction) {
    // ============================================
    // DEVELOPMENT MODE - Vite SSR Middleware
    // ============================================
    const { createServer: createViteServer } = await import('vite');
    
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    // Use Vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // ============================================
    // PRODUCTION MODE - Static Assets
    // ============================================
    const sirv = (await import('sirv')).default;
    
    // Serve static assets from dist/client
    app.use(
      '/assets',
      sirv(path.resolve(__dirname, 'dist/client/assets'), {
        maxAge: 31536000, // 1 year cache for hashed assets
        immutable: true,
      })
    );

    // Serve other static files
    app.use(
      sirv(path.resolve(__dirname, 'dist/client'), {
        extensions: [],
        gzip: true,
        brotli: true,
      })
    );
  }

  // ============================================
  // SSR Handler - All Routes
  // ============================================
  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      // 1. Load the HTML template
      let template: string;
      
      if (!isProduction) {
        // Development: read fresh template and transform with Vite
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        // Production: use pre-built template
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        );
      }

      // 2. Load the server entry module
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
        // Production: use the built server bundle
        const module = await import('./dist/server/entry-server.js');
        render = module.render;
      }

      // 3. Render the app to HTML
      const { html: appHtml, helmet, initialData, statusCode } = await render(url);

      // 4. Inject rendered content into template
      let finalHtml = template;

      // Inject SSR content
      if (template.includes('<!--ssr-outlet-->')) {
        finalHtml = finalHtml.replace('<!--ssr-outlet-->', appHtml);
      } else {
        // Fallback: replace empty root div
        finalHtml = finalHtml.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
      }

      // Inject head tags (title, meta, etc.)
      if (helmet) {
        finalHtml = finalHtml.replace(
          '</head>',
          `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}</head>`
        );
      }

      // Inject initial data for hydration (prevent XSS by escaping)
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

      // 5. Send the response
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(finalHtml);

    } catch (error) {
      // Handle errors
      if (!isProduction && vite) {
        // In dev, let Vite fix the stack trace
        vite.ssrFixStacktrace(error as Error);
      }
      
      console.error('SSR Error:', error);
      
      // Send error page
      res.status(500).end(
        isProduction 
          ? 'Internal Server Error' 
          : `<pre>${(error as Error).stack}</pre>`
      );
    }
  });

  // Start server
  app.listen(port, () => {
    console.log(`\n🚀 SSR Server running at http://localhost:${port}`);
    console.log(`   Mode: ${isProduction ? 'Production' : 'Development'}`);
    if (!isProduction) {
      console.log(`   HMR: Enabled via Vite middleware`);
    }
    console.log('');
  });
}

createServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
