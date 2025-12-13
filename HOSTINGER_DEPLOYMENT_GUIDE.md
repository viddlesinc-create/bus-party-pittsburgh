# Hostinger Deployment Guide - Pitt Party Bus

## Important: Node.js Hosting Required

This application uses **true per-request Server-Side Rendering (SSR)**. Every HTTP request is rendered by a Node.js server before being sent to the browser.

**Standard shared hosting (PHP-based) will NOT work for full SSR.**

---

## Option 1: Hostinger VPS (Recommended)

Hostinger VPS plans support Node.js applications with full SSR.

### Setup Steps

1. **Order a VPS plan** from Hostinger with Ubuntu

2. **SSH into your VPS:**
   ```bash
   ssh root@your-vps-ip
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone your repository:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/pittpartybus.git
   cd pittpartybus
   ```

5. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

6. **Install PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start "npm run start" --name pittpartybus
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx:**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/pittpartybus
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name pittpartybus.com www.pittpartybus.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/pittpartybus /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set up SSL with Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d pittpartybus.com -d www.pittpartybus.com
   ```

---

## Option 2: Alternative Node.js Hosting

If Hostinger VPS is not available, use these alternatives:

| Provider | Ease of Use | Cost |
|----------|-------------|------|
| Railway | Very Easy | Free tier + paid |
| Render | Easy | Free tier + paid |
| Fly.io | Medium | Free tier + paid |
| DigitalOcean App Platform | Easy | $5/month+ |

### Railway Deployment

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render Deployment

1. Connect your GitHub repo to Render
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Deploy

---

## Option 3: Static Prerendering (Limited SSR)

If you must use Hostinger shared hosting, you can use optional prerendering:

```bash
npm run build
npm run prerender
# Upload dist/client/ to Hostinger public_html/
```

**Limitations:**
- ❌ Content is static, not rendered per-request
- ❌ Requires rebuilding for content changes
- ❌ No dynamic server-side features

**The canonical deployment is Node.js SSR.** Use a VPS or Node.js-compatible hosting for full functionality.

---

## Verification

After deployment, verify SSR is working:

```bash
curl -s https://pittpartybus.com | grep "<h1"
```

You should see H1 tags in the response, proving the server is rendering HTML.

---

## Summary

| Hosting Type | SSR Support | Recommendation |
|--------------|-------------|----------------|
| Hostinger VPS | ✅ Full per-request SSR | **Recommended** |
| Railway/Render | ✅ Full per-request SSR | Great alternative |
| Hostinger Shared + Prerender | ⚠️ Static only | Limited |

---

## Explicit Confirmation

> **Every HTTP request in production is served by the Node SSR server, which runs the SSR render function for that URL before sending HTML to the browser.**

The application functions correctly with only the Node.js server. Prerendering is optional.
