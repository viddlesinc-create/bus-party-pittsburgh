import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Complete list of all routes that need to be pre-rendered
const routes = [
  "/",
  "/fleet",
  "/events",
  "/locations",
  "/pricing",
  "/contact",
  "/faqs",
  "/blog",
  "/testimonials",
  "/privacy",
  "/terms",
  "/blog/party-bus-pricing-guide",
  "/blog/top-events-pittsburgh",
  "/blog/party-bus-vs-limo",
  "/blog/bachelor-bachelorette-ideas",
  "/blog/wedding-transportation",
  "/blog/corporate-event-transportation",
  "/blog/concert-party-bus",
  "/blog/prom-transportation-safety",
  "/blog/party-bus-safety-tips",
  "/blog/accurate-party-bus-estimate"
];

console.log(`📋 Pre-rendering ${routes.length} routes for pittpartybus.com...`);

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const distDir = path.join(__dirname, '../dist');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const rendered = await render(route);
      
      // Insert meta tags and rendered HTML
      let html = template
        .replace('<!--ssr-outlet-->', rendered.html)
        .replace('</head>', `${rendered.helmet.title}${rendered.helmet.meta}${rendered.helmet.link}${rendered.helmet.script}</head>`);

      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(distDir, `${routePath}.html`);
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, html);
      
      // Verify content is present
      const hasH1 = html.includes('<h1');
      const hasMeta = html.includes('meta name="description"');
      const statusIcon = hasH1 && hasMeta ? '✅' : '⚠️';
      
      console.log(`${statusIcon} ${route} → ${path.relative(process.cwd(), filePath)}`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Pre-rendering Summary:`);
  console.log(`   ✅ Success: ${successCount}/${routes.length}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }

  await vite.close();
  console.log('🎉 Prerendering with meta tags complete!');
}

prerender().catch(console.error);
