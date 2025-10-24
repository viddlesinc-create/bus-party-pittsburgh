# SSR Verification Guide for Pitt Party Bus

## What is Server-Side Rendering (SSR)?

Server-Side Rendering ensures that all SEO-critical content is present in the initial HTML response from the server, **before** any JavaScript runs. This is crucial for:
- Search engine crawlers (Google, Bing)
- Social media bots (Facebook, Twitter, LinkedIn)
- Performance and Core Web Vitals
- Users with JavaScript disabled

## Our SSR Implementation

We use **Static Site Generation (SSG)** via pre-rendering at build time, which provides:
- ✅ All HTML generated at build time
- ✅ No server needed - works on static hosting
- ✅ Maximum performance (instant page loads)
- ✅ Perfect for SEO (all content immediately available)

## Build Process

### 1. Build Command
```bash
npm run build
```

This runs the complete SSR build pipeline:
1. Generates sitemap.xml
2. Builds the Vite application
3. Pre-renders all 21 routes with full SEO meta tags
4. Copies static assets (robots.txt, sitemap.xml)
5. Verifies build output

### 2. Routes Pre-rendered

All these routes are pre-rendered with full SEO:
- `/` - Homepage
- `/fleet` - Fleet showcase
- `/events` - Event services
- `/locations` - Service areas
- `/pricing` - Pricing information
- `/contact` - Contact form
- `/faqs` - FAQ page
- `/blog` - Blog index
- `/testimonials` - Customer reviews
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/blog/party-bus-pricing-guide`
- `/blog/top-events-pittsburgh`
- `/blog/party-bus-vs-limo`
- `/blog/bachelor-bachelorette-ideas`
- `/blog/wedding-transportation`
- `/blog/corporate-event-transportation`
- `/blog/concert-party-bus`
- `/blog/prom-transportation-safety`
- `/blog/party-bus-safety-tips`
- `/blog/accurate-party-bus-estimate`

## Verification Methods

### Method 1: Automated Verification Script
```bash
node scripts/verify-ssr.js
```

This checks all routes for:
- ✅ H1 headings
- ✅ Meta descriptions
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Navigation links
- ✅ No noindex tags

### Method 2: Manual cURL Test
Test any route to see raw server HTML:

```bash
# Homepage
curl -s https://pittpartybus.com/ | grep "<h1"

# Fleet page
curl -s https://pittpartybus.com/fleet | grep "<h1"

# Blog post
curl -s https://pittpartybus.com/blog/party-bus-pricing-guide | grep "<h1"
```

You should see the H1 tag in the response, proving content is server-rendered.

### Method 3: View Page Source
1. Visit any page on https://pittpartybus.com
2. Right-click → "View Page Source" (NOT Inspect Element)
3. Search for:
   - `<h1` - Primary heading should be visible
   - `meta name="description"` - Meta description present
   - `application/ld+json` - Structured data present
   - `rel="canonical"` - Canonical URL present
   - `property="og:` - Open Graph tags present

### Method 4: Google Tools
1. **Google Search Console URL Inspection**
   - Submit URL to Google Search Console
   - Click "Test Live URL"
   - View rendered HTML
   - Check "View Crawled Page" → "More Info" → "View Page Source"

2. **Rich Results Test**
   - Visit https://search.google.com/test/rich-results
   - Enter your URL
   - Verify structured data is detected

3. **Mobile-Friendly Test**
   - Visit https://search.google.com/test/mobile-friendly
   - Verify page loads and content is visible

### Method 5: Disable JavaScript Test
1. Open Chrome DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Disable JavaScript" and press Enter
4. Refresh the page
5. All content should still be visible (may lack interactivity)

## What's Rendered Server-Side

### On Every Page:
- ✅ Primary content (H1-H6, paragraphs, lists)
- ✅ Navigation links (header, footer)
- ✅ Internal links (related posts, services, CTAs)
- ✅ Images with alt attributes
- ✅ Meta title and description
- ✅ Canonical URL
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ robots meta tag (index, follow)
- ✅ JSON-LD structured data

### Page-Specific Structured Data:

**Homepage:**
- Organization schema (LocalBusiness)
- Website schema with SearchAction

**Blog Posts:**
- Article schema
- Breadcrumb schema
- Organization schema

**Service Pages:**
- Service schema
- LocalBusiness schema
- Breadcrumb schema

**Fleet Page:**
- Product/Vehicle listings
- Organization schema

## Common Issues and Solutions

### Issue: "No H1 tag found"
**Solution:** Check that the page component has an `<h1>` tag. Every page needs exactly one H1.

### Issue: "No structured data found"
**Solution:** Ensure the page imports and uses the `<StructuredData>` component with appropriate schema.

### Issue: "Missing Open Graph tags"
**Solution:** Verify the `<MetaTags>` component is being used on the page with all required props.

### Issue: "Content appears after page load"
**Solution:** Content may be loaded via useEffect. Move it to static JSX that renders immediately.

### Issue: "404 errors for routes"
**Solution:** Ensure the route is added to:
1. `src/App.tsx` (Routes definition)
2. `src/entry-client.tsx` (Client routes)
3. `scripts/prerender-with-meta.js` (Routes array)
4. `scripts/generate-sitemap.js` (Routes array)

## File Structure

```
project/
├── dist/                          # Built static files
│   ├── index.html                # Homepage
│   ├── fleet.html                # Fleet page
│   ├── blog/
│   │   └── party-bus-pricing-guide.html
│   ├── robots.txt               # Crawler instructions
│   └── sitemap.xml              # All URLs
├── scripts/
│   ├── build-ssr-complete.js    # Main build orchestrator
│   ├── prerender-with-meta.js   # Pre-renders all routes
│   ├── generate-sitemap.js      # Creates sitemap.xml
│   └── verify-ssr.js            # Validates SSR output
├── src/
│   ├── entry-server.tsx         # SSR entry point
│   ├── entry-client.tsx         # Client hydration
│   └── components/
│       ├── MetaTags.tsx         # SEO meta tags (Helmet)
│       └── StructuredData.tsx   # JSON-LD schemas (Helmet)
└── public/
    ├── robots.txt
    └── sitemap.xml
```

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Run `node scripts/verify-ssr.js` - all checks pass
- [ ] Test with cURL on staging URL
- [ ] View page source - H1 visible
- [ ] Check Google Search Console URL Inspection
- [ ] Run Rich Results Test
- [ ] Test with JavaScript disabled
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Check Core Web Vitals (PageSpeed Insights)

## Performance Targets

With our SSR implementation, aim for:
- ⚡ TTFB (Time to First Byte): < 200ms
- ⚡ FCP (First Contentful Paint): < 1.0s
- ⚡ LCP (Largest Contentful Paint): < 2.0s
- ⚡ CLS (Cumulative Layout Shift): < 0.1
- ⚡ FID (First Input Delay): < 100ms

## SEO Checklist

Every page should have:
- [x] One H1 tag (unique per page)
- [x] Meta description (150-160 chars)
- [x] Canonical URL
- [x] Open Graph tags (title, description, image)
- [x] Twitter Card tags
- [x] robots: "index, follow"
- [x] JSON-LD structured data
- [x] Alt text on all images
- [x] Internal links in content
- [x] Semantic HTML (header, main, nav, footer)
- [x] Mobile responsive
- [x] Fast loading (< 2s LCP)

## Testing Different Pages

```bash
# Test homepage
curl -s https://pittpartybus.com/ | grep -A 5 "<h1"

# Test service page
curl -s https://pittpartybus.com/fleet | grep "application/ld+json"

# Test blog post
curl -s https://pittpartybus.com/blog/wedding-transportation | grep 'property="og:type"'

# Test meta description
curl -s https://pittpartybus.com/pricing | grep 'meta name="description"'

# Test canonical
curl -s https://pittpartybus.com/events | grep 'rel="canonical"'
```

## Maintenance

When adding new pages:
1. Create the page component with `<MetaTags>` and `<StructuredData>`
2. Add route to `src/App.tsx`
3. Add route to `src/entry-client.tsx`
4. Add route to `scripts/prerender-with-meta.js`
5. Add route to `scripts/generate-sitemap.js`
6. Build and verify with `node scripts/verify-ssr.js`

## Support and Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

**Last Updated:** January 2025
**Site:** https://pittpartybus.com
**Build System:** Vite + React + SSG (Static Site Generation)
