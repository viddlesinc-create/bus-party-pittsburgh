import fs from 'fs';
import path from 'path';

const domain = 'https://pittpartybus.com';

// Organized routes by content type
const pageRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/fleet", priority: "0.9", changefreq: "weekly" },
  { path: "/events", priority: "0.9", changefreq: "weekly" },
  { path: "/pricing", priority: "0.9", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/faqs", priority: "0.8", changefreq: "monthly" },
  { path: "/testimonials", priority: "0.8", changefreq: "weekly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" }
];

const blogRoutes = [
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/blog/party-bus-pricing-guide", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/top-events-pittsburgh", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/party-bus-vs-limo", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/bachelor-bachelorette-ideas", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/wedding-transportation", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/corporate-event-transportation", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/concert-party-bus", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/prom-transportation-safety", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/party-bus-safety-tips", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/accurate-party-bus-estimate", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/party-buses-near-me", priority: "0.7", changefreq: "monthly" }
];

const locationRoutes = [
  { path: "/locations", priority: "0.8", changefreq: "weekly" },
  { path: "/locations/north-hills", priority: "0.7", changefreq: "monthly" },
  { path: "/locations/south-hills", priority: "0.7", changefreq: "monthly" },
  { path: "/locations/downtown", priority: "0.7", changefreq: "monthly" },
  { path: "/locations/south-side", priority: "0.7", changefreq: "monthly" },
  { path: "/locations/oakland", priority: "0.7", changefreq: "monthly" }
];

const generateUrlset = (routes) => {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

const generateSitemapIndex = () => {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-locations.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
};

const generateSitemaps = () => {
  const publicDir = path.join(process.cwd(), 'public');
  
  // Generate individual sitemaps
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generateUrlset(pageRoutes));
  fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), generateUrlset(blogRoutes));
  fs.writeFileSync(path.join(publicDir, 'sitemap-locations.xml'), generateUrlset(locationRoutes));
  
  // Generate sitemap index
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemapIndex());
  
  const totalUrls = pageRoutes.length + blogRoutes.length + locationRoutes.length;
  console.log('✅ Sitemaps generated successfully for pittpartybus.com!');
  console.log(`📊 Generated ${totalUrls} URLs across 3 sitemaps:`);
  console.log(`   - sitemap-pages.xml: ${pageRoutes.length} URLs`);
  console.log(`   - sitemap-blog.xml: ${blogRoutes.length} URLs`);
  console.log(`   - sitemap-locations.xml: ${locationRoutes.length} URLs`);
};

generateSitemaps();
