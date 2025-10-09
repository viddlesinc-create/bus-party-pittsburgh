import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  for (const route of routes) {
    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const rendered = await render(route);
      
      // Insert meta tags into head
      let html = template
        .replace('<!--ssr-outlet-->', rendered.html)
        .replace('</head>', `${rendered.helmet.title}${rendered.helmet.meta}${rendered.helmet.link}</head>`);

      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(distDir, `${routePath}.html`);
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, html);
      console.log(`✅ Prerendered with SEO: ${route} → ${filePath}`);

    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error);
    }
  }

  await vite.close();
  console.log('🎉 Prerendering with meta tags complete!');
}

prerender().catch(console.error);
