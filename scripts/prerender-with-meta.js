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
      
      // Comprehensive verification of SSR content
      const hasH1 = html.includes('<h1');
      const hasMeta = html.includes('meta name="description"');
      const hasCanonical = html.includes('rel="canonical"');
      const hasOgTags = html.includes('property="og:title"') && html.includes('property="og:description"');
      const hasTwitterCard = html.includes('name="twitter:card"');
      const hasStructuredData = html.includes('application/ld+json');
      const hasNavLinks = html.includes('href="/fleet"') && html.includes('href="/contact"');
      
      const checks = {
        'H1': hasH1,
        'Meta': hasMeta,
        'Canonical': hasCanonical,
        'OpenGraph': hasOgTags,
        'Twitter': hasTwitterCard,
        'Schema': hasStructuredData,
        'NavLinks': hasNavLinks
      };
      
      const failedChecks = Object.entries(checks).filter(([_, passed]) => !passed).map(([name]) => name);
      const statusIcon = failedChecks.length === 0 ? '✅' : '⚠️';
      const status = failedChecks.length === 0 ? 'PASS' : `MISSING: ${failedChecks.join(', ')}`;
      
      console.log(`${statusIcon} ${route.padEnd(45)} ${status}`);
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
