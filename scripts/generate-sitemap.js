import fs from 'fs';
import path from 'path';

const domain = 'https://pittpartybus.com';

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

const generateSitemap = () => {
  const now = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
  let priority = '0.8';
  let changefreq = 'weekly';
  
  if (route === '/') {
    priority = '1.0';
  } else if (route.startsWith('/blog/')) {
    priority = '0.6';
    changefreq = 'monthly';
  } else if (['/fleet', '/pricing', '/events'].includes(route)) {
    priority = '0.9';
  }
  
  return `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully for pittpartybus.com!');
};

generateSitemap();
