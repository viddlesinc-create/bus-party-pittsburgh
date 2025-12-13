# SSR Deployment Guide - Pitt Party Bus

## Canonical Deployment: Node.js SSR Server

This application uses **true per-request Server-Side Rendering**. Every HTTP request is rendered by the Node.js server before being sent to the browser.

---

## Production Deployment Steps

### 1. Build the Application

```bash
npm run build
```

This creates:
- `dist/client/` - Static assets (JS, CSS, images)
- `dist/server/` - SSR bundle for the Node server

### 2. Start the Production Server

```bash
npm run start
```

Or directly:

```bash
NODE_ENV=production npx tsx server.ts
```

The server listens on port 3000 (or `$PORT`).

### 3. Configure Your Hosting

#### Railway / Render / Fly.io

These platforms auto-detect Node.js. Configure:

- **Build command:** `npm run build`
- **Start command:** `npm run start`
- **Port:** 3000 (or use `$PORT`)

#### VPS (DigitalOcean, AWS, etc.)

1. Clone your repo to the server
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Use PM2 for process management:
   ```bash
   pm2 start "npm run start" --name pittpartybus
   pm2 save
   pm2 startup
   ```
5. Configure nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name pittpartybus.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

---

## What Happens on Each Request

```
1. Browser requests /fleet
2. Express server receives request
3. server.ts loads dist/server/entry-server.js
4. render('/fleet') is called
5. React renders the Fleet page to HTML
6. Helmet extracts meta tags
7. Route loader fetches fleet data
8. HTML template is populated with:
   - Rendered React content
   - <title>, <meta>, Open Graph tags
   - window.__INITIAL_DATA__ for hydration
9. Complete HTML sent to browser
10. Browser displays content immediately
11. React hydrates for interactivity
```

---

## Verifying SSR is Working

### Method 1: curl

```bash
curl -s https://pittpartybus.com/fleet | grep -i "<h1"
```

You should see the H1 tag in the response.

### Method 2: View Source

1. Open your site in a browser
2. Right-click → "View Page Source"
3. You should see complete HTML content, not just `<div id="root"></div>`

### Method 3: Check Meta Tags

```bash
curl -s https://pittpartybus.com/fleet | grep -i "og:title"
```

Open Graph tags should be in the initial HTML.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Server port (default: 3000) |

---

## Optional: Static Prerendering

For CDN edge caching, you can optionally prerender static HTML:

```bash
npm run prerender
```

This is **not required** for production. The Node server handles all requests with per-request SSR.

---

## Why Node.js SSR?

| Feature | Static HTML | Node.js SSR |
|---------|-------------|-------------|
| Dynamic content | ❌ Rebuild required | ✅ Always fresh |
| SEO | ✅ Good | ✅ Good |
| Personalization | ❌ Limited | ✅ Full |
| Hosting complexity | Simple | Node.js required |
| Time to first byte | Faster | Slightly slower |

For Pitt Party Bus, Node.js SSR provides:
- Complete SEO coverage
- Dynamic meta tags per route
- Fresh content on every request
- Proper hydration for React

---

## Explicit Confirmation

> **Every HTTP request in production is served by the Node SSR server, which runs the SSR render function for that URL before sending HTML to the browser.**

No static prerendering is required. The application functions correctly with only the Node.js server.
