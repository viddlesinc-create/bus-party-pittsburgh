# Hostinger Deployment Guide for Pitt Party Bus
## Complete SSR Setup & Troubleshooting

---

## 🚨 CRITICAL ISSUE DIAGNOSIS

**Problem:** Ahrefs crawl shows missing H1 tags, canonical tags, and meta tags on live site.

**Root Cause:** Hostinger is serving the base `index.html` file instead of the pre-rendered HTML files from the SSR build.

**Why This Happens:**
- The build process (`npm run build`) correctly generates pre-rendered HTML files for all 21 routes
- Each route gets its own `.html` file with full SEO meta tags, H1s, canonicals, and structured data
- However, without proper server configuration, Hostinger serves only `index.html` for all routes
- This means crawlers see an empty React shell without any content or meta tags

---

## ✅ THE COMPLETE FIX

### Step 1: Update Your Build Process

Your current build command is correct:
```bash
npm run build
```

This executes `scripts/build-ssr-complete.js` which:
1. Generates sitemap
2. Builds the Vite application
3. Pre-renders all 21 routes with full meta tags
4. Copies static assets (robots.txt, sitemap.xml, .htaccess)

### Step 2: Verify Build Output

After running `npm run build`, check that these files exist in `dist/`:
```
dist/
├── index.html          ✅ Homepage with full SEO
├── fleet.html          ✅ Fleet page with full SEO
├── events.html         ✅ Events page with full SEO
├── locations.html      ✅ Locations page with full SEO
├── pricing.html        ✅ Pricing page with full SEO
├── contact.html        ✅ Contact page with full SEO
├── faqs.html           ✅ FAQs page with full SEO
├── blog.html           ✅ Blog page with full SEO
├── testimonials.html   ✅ Testimonials with full SEO
├── privacy.html        ✅ Privacy page with full SEO
├── terms.html          ✅ Terms page with full SEO
├── blog/
│   ├── party-bus-pricing-guide.html
│   ├── top-events-pittsburgh.html
│   ├── party-bus-vs-limo.html
│   ├── bachelor-bachelorette-ideas.html
│   ├── wedding-transportation.html
│   ├── corporate-event-transportation.html
│   ├── concert-party-bus.html
│   ├── prom-transportation-safety.html
│   ├── party-bus-safety-tips.html
│   └── accurate-party-bus-estimate.html
├── .htaccess           ✅ Server configuration
├── robots.txt          ✅ Crawler instructions
└── sitemap.xml         ✅ All routes listed
```

### Step 3: Verify Pre-rendered HTML Content

Open any `.html` file in `dist/` and verify it contains:

**Required Elements:**
- ✅ `<h1>` tag with page-specific content
- ✅ `<meta name="description">` with page description
- ✅ `<link rel="canonical">` with full URL
- ✅ `<meta property="og:title">` and other OG tags
- ✅ `<meta name="twitter:card">` and other Twitter tags
- ✅ `<script type="application/ld+json">` with structured data
- ✅ Full page content (not just React mounting div)

**Example from `dist/fleet.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Premium Party Bus & Limousine Fleet - Pittsburgh | Pitt Party Bus</title>
  <meta name="description" content="Browse our luxury party bus and limousine fleet...">
  <link rel="canonical" href="https://pittpartybus.com/fleet">
  <meta property="og:title" content="Premium Party Bus & Limousine Fleet...">
  ...
</head>
<body>
  <div id="root">
    <header>...</header>
    <main>
      <h1>Premium Party Bus & Limousine Fleet - Pittsburgh</h1>
      <!-- Full page content here -->
    </main>
    <footer>...</footer>
  </div>
</body>
</html>
```

### Step 4: Deploy to Hostinger

**Method 1: File Manager Upload (Recommended for First-Time)**
1. Log into Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html/` directory
4. **Delete all existing files** (or backup first)
5. Upload entire `dist/` folder contents to `public_html/`
6. Ensure `.htaccess` file is present (may be hidden - enable "Show Hidden Files")

**Method 2: FTP Upload**
1. Use FileZilla or similar FTP client
2. Connect to your Hostinger FTP
3. Navigate to `public_html/` directory
4. Upload entire `dist/` folder contents
5. Verify `.htaccess` uploaded (it's a hidden file)

**Method 3: Git Auto-Deploy**
1. Connect your GitHub repository to Hostinger
2. Set build command: `npm run build`
3. Set output directory: `dist/`
4. Enable auto-deploy on push to main branch

### Step 5: Verify .htaccess is Working

The `.htaccess` file is **CRITICAL**. It tells Hostinger to serve the correct HTML files.

**Verify .htaccess exists:**
```bash
# Via SSH or File Manager
ls -la public_html/.htaccess
```

**Test .htaccess rules:**
```bash
# Test that /fleet loads /fleet.html
curl -I https://pittpartybus.com/fleet
# Should return 200 OK

# Test that HTTPS redirect works
curl -I http://pittpartybus.com
# Should return 301 redirect to https://
```

### Step 6: Clear All Caches

**A. Hostinger Cache:**
1. Go to Hostinger control panel
2. Find **Website** section
3. Click **Clear Cache** or **Purge Cache**

**B. Cloudflare (if using):**
1. Log into Cloudflare
2. Go to **Caching** → **Configuration**
3. Click **Purge Everything**

**C. Browser Cache:**
1. Open Chrome DevTools (F12)
2. Right-click reload button
3. Select "Empty Cache and Hard Reload"

### Step 7: Verify Live Site

**Test 1: View Page Source (Most Important)**
```bash
# Homepage
curl -s https://pittpartybus.com | grep "<h1"
# Should return: <h1>Premium Party Bus & Limo Rentals in Pittsburgh, PA</h1>

# Fleet page
curl -s https://pittpartybus.com/fleet | grep "<h1"
# Should return: <h1>Premium Party Bus & Limousine Fleet - Pittsburgh</h1>

# Check canonical
curl -s https://pittpartybus.com/fleet | grep "canonical"
# Should return: <link rel="canonical" href="https://pittpartybus.com/fleet">
```

**Test 2: Browser Check**
1. Visit https://pittpartybus.com
2. Right-click → "View Page Source" (NOT Inspect Element)
3. Search for `<h1>` - should find the H1 tag
4. Search for `canonical` - should find canonical link
5. Search for `og:title` - should find Open Graph tags

**Test 3: SEO Tools**
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

---

## 🔍 TROUBLESHOOTING

### Issue: Still seeing empty HTML

**Solution:**
1. Verify `.htaccess` is in `public_html/` root
2. Check Hostinger Apache configuration allows `.htaccess` overrides
3. Contact Hostinger support to enable `mod_rewrite`

### Issue: 404 errors on routes

**Solution:**
1. Verify all `.html` files are in correct locations
2. Check `.htaccess` rewrite rules match your file structure
3. Ensure `.htaccess` RewriteEngine is On

### Issue: Mixed content warnings

**Solution:**
1. Verify all internal links use relative paths or HTTPS
2. Check `.htaccess` HTTPS redirect is working
3. Update any hardcoded HTTP URLs in code

### Issue: Old content showing

**Solution:**
1. Clear Hostinger cache
2. Clear Cloudflare cache (if applicable)
3. Wait 5-10 minutes for DNS propagation
4. Use incognito/private browsing to test

---

## 📋 POST-DEPLOYMENT CHECKLIST

After deployment, verify:

- [ ] `.htaccess` file exists in `public_html/` root
- [ ] All 21 `.html` files exist in correct locations
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Homepage loads at `https://pittpartybus.com`
- [ ] All routes load without 404 errors
- [ ] HTTP redirects to HTTPS
- [ ] View Page Source shows H1 tags
- [ ] View Page Source shows canonical tags
- [ ] View Page Source shows full Open Graph tags
- [ ] Structured data appears in page source
- [ ] Internal links work correctly
- [ ] Images load correctly
- [ ] No console errors in browser

---

## 🎯 VERIFICATION COMMANDS

Run these after deployment:

```bash
# Test H1 presence on all pages
curl -s https://pittpartybus.com | grep -o '<h1[^>]*>[^<]*</h1>'
curl -s https://pittpartybus.com/fleet | grep -o '<h1[^>]*>[^<]*</h1>'
curl -s https://pittpartybus.com/events | grep -o '<h1[^>]*>[^<]*</h1>'
curl -s https://pittpartybus.com/blog | grep -o '<h1[^>]*>[^<]*</h1>'

# Test canonical tags
curl -s https://pittpartybus.com | grep "canonical"
curl -s https://pittpartybus.com/fleet | grep "canonical"

# Test Open Graph tags
curl -s https://pittpartybus.com | grep "og:title"
curl -s https://pittpartybus.com | grep "og:description"
curl -s https://pittpartybus.com | grep "og:image"

# Test structured data
curl -s https://pittpartybus.com | grep "application/ld+json"

# Test HTTPS redirect
curl -I http://pittpartybus.com | grep "301"
```

---

## 🚀 NEXT STEPS AFTER SUCCESSFUL DEPLOYMENT

1. **Submit to Google Search Console**
   - Add property for https://pittpartybus.com
   - Submit sitemap: https://pittpartybus.com/sitemap.xml
   - Request indexing for key pages

2. **Wait 48-72 Hours**
   - Allow time for crawlers to re-index
   - Google will gradually crawl all pages

3. **Re-run Ahrefs Audit**
   - Should now show all H1 tags present
   - Should show all canonical tags present
   - Should show complete meta tags

4. **Monitor Google Search Console**
   - Check for crawl errors
   - Monitor page indexation status
   - Track search performance

---

## 📞 SUPPORT

If issues persist after following this guide:

1. **Verify build output locally:**
   ```bash
   npm run build
   npm run verify-ssr
   ```

2. **Check Hostinger configuration:**
   - Contact Hostinger support
   - Ask them to verify `mod_rewrite` is enabled
   - Ask them to verify `.htaccess` files are allowed

3. **Share specific error:**
   - Exact URL showing issue
   - Screenshot of "View Page Source"
   - Error messages from browser console

---

## ✅ SUCCESS CRITERIA

Your deployment is successful when:

✅ All 21 routes return 200 OK status
✅ Each page has unique H1 tag in HTML source
✅ Each page has canonical tag in HTML source  
✅ Each page has complete Open Graph tags
✅ Structured data appears on all pages
✅ No JavaScript required to see page content
✅ Ahrefs crawl shows zero critical issues
✅ Google Rich Results Test validates structured data
✅ Social media preview cards show correct images
