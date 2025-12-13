# Pitt Party Bus - SSR Production Guide

## Overview

This application uses **true per-request Server-Side Rendering (SSR)**. Every HTTP request is rendered by a Node.js server before being sent to the browser.

**Canonical deployment: Node.js SSR server (not static HTML files)**

---

## Quick Start

```bash
# Install dependencies
npm install

# Development (with HMR)
npm run dev

# Production build
npm run build

# Start production SSR server
npm run start
```

---

## Architecture

### Entry Points

| File | Purpose |
|------|---------|
| `src/entry-client.tsx` | Client-side hydration |
| `src/entry-server.tsx` | Server-side render function |
| `server.ts` | Express server (dev + prod) |

### Build Output

```
dist/
├── client/              # Static assets for the browser
│   ├── index.html       # HTML template (SSR content injected here)
│   ├── assets/          # JS, CSS bundles (hashed)
│   ├── robots.txt
│   └── sitemap.xml
└── server/
    └── entry-server.js  # SSR bundle used by server.ts
```

### Request Flow

```
Browser Request
      ↓
Express Server (server.ts)
      ↓
Load SSR bundle (dist/server/entry-server.js)
      ↓
Call render(url) function
      ↓
React renders to HTML string
      ↓
Helmet extracts meta tags
      ↓
Route loader data serialized
      ↓
HTML template populated with:
  - SSR content
  - Meta tags
  - window.__INITIAL_DATA__
      ↓
HTML Response sent to browser
      ↓
Browser hydrates with React
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with Vite SSR + HMR |
| `npm run build` | Build client + server bundles |
| `npm run start` | **Production SSR server** |
| `npm run prerender` | (Optional) Generate static HTML |
| `npm run verify-ssr` | (Optional) Verify meta tags |

---

## Production Deployment

### Requirements

- Node.js 18+ runtime
- Able to run persistent processes

### Steps

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the SSR server:**
   ```bash
   npm run start
   # OR
   NODE_ENV=production npx tsx server.ts
   ```

3. **Configure your hosting:**
   - Point your domain to port 3000 (or set `PORT` env var)
   - Use a reverse proxy (nginx, Caddy) if needed
   - Enable process manager (PM2, systemd) for auto-restart

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | - | Set to `production` for prod |

---

## How SSR Works

### Every Request is Rendered Fresh

The `server.ts` handler calls `render(url)` for **every incoming request**:

```typescript
app.use('*', async (req, res) => {
  const { html, helmet, initialData, statusCode } = await render(url);
  
  // Inject into template...
  res.send(finalHtml);
});
```

This means:
- ✅ Content is always up-to-date
- ✅ Dynamic data works without client-side fetching
- ✅ SEO crawlers see complete HTML immediately
- ✅ Meta tags are in the initial response

### Hydration

After the browser receives the SSR HTML:

1. `window.__INITIAL_DATA__` contains the serialized route data
2. React hydrates the existing DOM (no re-render)
3. The app becomes interactive

---

## Optional: Static Prerendering

For edge caching or CDN deployment, you can optionally generate static HTML:

```bash
npm run prerender
```

This creates `.html` files for each route in `dist/client/`. These are **not required** for production - they're an optimization for specific hosting scenarios.

---

## SEO Features

All pages include:
- ✅ Server-rendered content (visible without JavaScript)
- ✅ Proper `<title>` tags
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)
- ✅ H1 tags in initial HTML

---

## Hosting Recommendations

### Recommended (Node.js SSR)

- **Railway** - Easy Node.js deployment
- **Render** - Free tier available
- **Fly.io** - Global edge deployment
- **DigitalOcean App Platform** - Managed Node.js
- **AWS EC2 / Lightsail** - Full control
- **VPS providers** - Any with Node.js support

### For Static Prerendering Only

If you use `npm run prerender`, you can deploy `dist/client/` to:
- Netlify
- Vercel (static mode)
- Cloudflare Pages
- GitHub Pages

But the canonical deployment remains the Node.js SSR server.

---

## Troubleshooting

### "Client build not found"

Run `npm run build` before `npm run start`.

### SSR content not appearing

1. Check that `index.html` contains `<!--ssr-outlet-->` or `<div id="root"></div>`
2. Verify `dist/server/entry-server.js` exists
3. Check server logs for render errors

### Hydration mismatch warnings

These are usually caused by:
- Date/time differences between server and client
- Browser-only APIs used during SSR
- Random values generated during render

---

## Confirmation

> **Every HTTP request in production is served by the Node SSR server, which runs the SSR render function for that URL before sending HTML to the browser.**

The application does not require static prerendering. The Node.js server handles all requests with true per-request SSR.
