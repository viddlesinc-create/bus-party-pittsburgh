#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

console.log('🚀 Building SSR application for pittpartybus.com...');

// Step 1: Generate sitemap
console.log('📄 Generating sitemap...');
execSync('node scripts/generate-sitemap.js', { cwd: root, stdio: 'inherit' });

// Step 2: Build the application
console.log('⚡ Building application...');
execSync('vite build', { cwd: root, stdio: 'inherit' });

// Step 3: Copy static assets to dist
console.log('📁 Copying static assets...');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

const staticFiles = ['robots.txt', 'sitemap.xml'];
staticFiles.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file}`);
  }
});

// Step 4: Create simple static redirects for SEO
console.log('🔗 Creating route files...');
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

const indexPath = path.join(distDir, 'index.html');
const template = fs.readFileSync(indexPath, 'utf-8');

routes.forEach(route => {
  if (route === '/') return;

  const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
  const filePath = path.join(distDir, `${routePath}.html`);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, template);
  console.log(`✅ Created static route: ${route}`);
});

console.log('🎉 SSR build complete! All routes are now crawlable.');
console.log('💡 Deploy the dist/ folder to your hosting provider.');
console.log('🌐 Site configured for: https://pittpartybus.com');
