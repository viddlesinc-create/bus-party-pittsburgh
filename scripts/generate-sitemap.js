import fs from 'fs';
import path from 'path';

const domain = 'https://pittpartybus.com';

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/fleet", priority: "0.9", changefreq: "weekly" },
  { path: "/events", priority: "0.9", changefreq: "weekly" },
  { path: "/locations", priority: "0.8", changefreq: "weekly" },
  { path: "/pricing", priority: "0.9", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/faqs", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/testimonials", priority: "0.8", changefreq: "weekly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/blog/party-bus-pricing-guide", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/top-events-pittsburgh", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/party-bus-vs-limo", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/bachelor-bachelorette-ideas", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/wedding-transportation", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/corporate-event-transportation", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/concert-party-bus", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/prom-transportation-safety", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/party-bus-safety-tips", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/accurate-party-bus-estimate", priority: "0.7", changefreq: "monthly" }
];

const generateSitemap = () => {
  const now = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
  return `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully for pittpartybus.com!');
  console.log(`📊 Generated ${routes.length} URLs in sitemap`);
};

generateSitemap();
