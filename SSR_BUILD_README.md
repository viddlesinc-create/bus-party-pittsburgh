# SSR Build Instructions for Pitt Party Bus

## Prerequisites
Make sure you have Node.js installed.

## Build Commands

### Generate Updated Sitemap
```bash
node scripts/generate-sitemap.js
```

### Full SSR Build
```bash
node scripts/build-ssr.js
```

### Prerender All Routes (Optional - for advanced SSR)
```bash
node scripts/prerender.js
```

## What Gets Built

The SSR build process:
1. ✅ Generates sitemap.xml for all 19 routes
2. ✅ Builds optimized production bundle
3. ✅ Copies robots.txt and sitemap.xml to dist/
4. ✅ Creates static HTML files for all routes
5. ✅ Ensures all pages are crawlable without JavaScript

## Routes Included (pittpartybus.com)

**Main Pages:**
- / (Homepage)
- /fleet
- /events  
- /locations
- /pricing
- /contact
- /faqs
- /blog
- /testimonials

**Blog Posts:**
- /blog/party-bus-pricing-guide
- /blog/top-events-pittsburgh
- /blog/party-bus-vs-limo
- /blog/bachelor-bachelorette-ideas
- /blog/wedding-transportation
- /blog/corporate-event-transportation
- /blog/concert-party-bus
- /blog/prom-transportation-safety
- /blog/party-bus-safety-tips
- /blog/accurate-party-bus-estimate

## Deployment

After running the build:
1. The `dist/` folder contains your complete static site
2. Deploy the `dist/` folder to your hosting provider
3. All routes will be server-rendered and SEO-ready

## Testing SSR

Test that content is server-rendered:
```bash
curl -s https://pittpartybus.com | grep "<h1"
```

You should see H1 tags in the response, proving server-side rendering is working.

## SEO Benefits

✅ All content rendered before JavaScript
✅ Meta tags in initial HTML  
✅ Structured data server-rendered
✅ Perfect for search engine crawlers
✅ Fast TTFB and Core Web Vitals
✅ Social media preview cards work perfectly

## Notes

- SSR configuration is in `vite.config.ts`
- Entry points: `src/entry-server.tsx` and `src/entry-client.tsx`
- Main entry updated for hydration support
- All routes configured with proper priorities in sitemap
