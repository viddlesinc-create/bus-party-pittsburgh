#!/usr/bin/env node
/**
 * Prerender Script - Static Generation for SEO
 * 
 * Prerenders key pages to static HTML for optimal SEO performance.
 * Run after build: node scripts/prerender.js
 */
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Pages to prerender (high-priority SEO pages)
const PRERENDER_ROUTES = [
  '/',
  '/fleet',
  '/events',
  '/locations',
  '/pricing',
  '/contact',
  '/faqs',
  '/blog',
  '/testimonials',
  '/privacy',
  '/terms',
  '/blog/party-bus-pricing-guide',
  '/blog/top-events-pittsburgh',
  '/blog/party-bus-vs-limo',
  '/blog/bachelor-bachelorette-ideas',
  '/blog/wedding-transportation',
  '/blog/corporate-event-transportation',
  '/blog/concert-party-bus',
  '/blog/prom-transportation-safety',
  '/blog/party-bus-safety-tips',
  '/blog/accurate-party-bus-estimate',
];

async function prerender() {
  const startTime = Date.now();
  console.log('🎯 Starting prerender process...\n');

  // Check for production build first
  const prodServerEntry = path.join(root, 'dist/server/entry-server.js');
  const prodClientDir = path.join(root, 'dist/client');
  const hasProdBuild = fs.existsSync(prodServerEntry) && fs.existsSync(prodClientDir);

  let render;
  let template;
  let distDir;
  let vite;

  if (hasProdBuild) {
    // Use production build
    console.log('📦 Using production build...');
    const serverModule = await import(prodServerEntry);
    render = serverModule.render;
    template = fs.readFileSync(path.join(prodClientDir, 'index.html'), 'utf-8');
    distDir = prodClientDir;
  } else {
    // Use Vite dev server for development prerendering
    console.log('📦 Using Vite dev server...');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    const serverModule = await vite.ssrLoadModule('/src/entry-server.tsx');
    render = serverModule.render;
    template = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
    distDir = path.join(root, 'dist');
  }

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  console.log(`📄 Prerendering ${PRERENDER_ROUTES.length} pages...\n`);

  const results = {
    success: [],
    failed: [],
  };

  for (const route of PRERENDER_ROUTES) {
    try {
      // Render the page
      const renderResult = await render(route);
      
      // Handle both object and string returns
      const html = typeof renderResult === 'string' ? renderResult : renderResult.html;
      const helmet = typeof renderResult === 'object' ? renderResult.helmet : null;
      const initialData = typeof renderResult === 'object' ? renderResult.initialData : null;

      // Build the final HTML
      let finalHtml = template.replace('<!--ssr-outlet-->', html);

      // Inject helmet data if available
      if (helmet) {
        const helmetTitle = helmet.title?.toString() || '';
        const helmetMeta = helmet.meta?.toString() || '';
        const helmetLink = helmet.link?.toString() || '';
        const helmetScript = helmet.script?.toString() || '';
        
        // Insert before </head>
        finalHtml = finalHtml.replace(
          '</head>',
          `${helmetTitle}${helmetMeta}${helmetLink}${helmetScript}</head>`
        );
      }

      // Inject initial data for hydration
      if (initialData) {
        const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`;
        finalHtml = finalHtml.replace('</head>', `${dataScript}</head>`);
      }

      // Determine output path
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(distDir, `${routePath}.html`);
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the prerendered HTML
      fs.writeFileSync(filePath, finalHtml);

      console.log(`  ✅ ${route}`);
      results.success.push(route);
    } catch (error) {
      console.log(`  ❌ ${route}: ${error.message}`);
      results.failed.push({ route, error: error.message });
    }
  }

  if (vite) {
    await vite.close();
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n📊 Prerender Summary:');
  console.log(`   ✅ Success: ${results.success.length}`);
  console.log(`   ❌ Failed: ${results.failed.length}`);
  console.log(`   ⏱️  Duration: ${duration}s`);

  if (results.failed.length > 0) {
    console.log('\n⚠️  Failed pages:');
    results.failed.forEach(({ route, error }) => {
      console.log(`   - ${route}: ${error}`);
    });
  }

  console.log('\n🎉 Prerender complete for pittpartybus.com!');
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
