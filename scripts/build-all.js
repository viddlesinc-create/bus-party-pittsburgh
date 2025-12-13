#!/usr/bin/env node
/**
 * ============================================
 * SSR Production Build Script
 * ============================================
 * 
 * This script builds the client and server bundles for true per-request SSR.
 * After running this script, use `npm run start` to run the Node SSR server.
 * 
 * Prerendering is NOT required - the Node server renders each request on-demand.
 * 
 * Build output:
 *   dist/client/  - Static assets (JS, CSS, images) + HTML template
 *   dist/server/  - SSR bundle used by server.ts
 */

import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function buildAll() {
  const startTime = Date.now();
  
  console.log('🚀 Building SSR application for per-request rendering...\n');
  console.log('   This build produces bundles for the Node SSR server.');
  console.log('   Prerendering is NOT required - each request is rendered on-demand.\n');
  
  // Step 1: Build client bundle
  console.log('📦 Step 1/3: Building client bundle...');
  await build({
    root,
    mode: 'production',
    build: {
      outDir: 'dist/client',
      ssrManifest: true,
      emptyOutDir: true,
    },
  });
  console.log('✅ Client bundle complete!\n');
  
  // Step 2: Build server bundle
  console.log('📦 Step 2/3: Building server bundle...');
  await build({
    root,
    mode: 'production',
    build: {
      outDir: 'dist/server',
      ssr: 'src/entry-server.tsx',
      emptyOutDir: true,
      rollupOptions: {
        input: 'src/entry-server.tsx',
      },
    },
    ssr: {
      noExternal: ['react-helmet-async'],
    },
  });
  console.log('✅ Server bundle complete!\n');
  
  // Step 3: Copy static files
  console.log('📦 Step 3/3: Copying static files...');
  
  // Ensure dist/client directory exists
  const clientDir = resolve(root, 'dist/client');
  if (!existsSync(clientDir)) {
    mkdirSync(clientDir, { recursive: true });
  }
  
  // Copy robots.txt and sitemap.xml
  const publicDir = resolve(root, 'public');
  if (existsSync(resolve(publicDir, 'robots.txt'))) {
    copyFileSync(resolve(publicDir, 'robots.txt'), resolve(clientDir, 'robots.txt'));
  }
  if (existsSync(resolve(publicDir, 'sitemap.xml'))) {
    copyFileSync(resolve(publicDir, 'sitemap.xml'), resolve(clientDir, 'sitemap.xml'));
  }
  
  console.log('✅ Static files copied!\n');
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`🎉 SSR build completed in ${duration}s`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n📋 Next steps:');
  console.log('');
  console.log('   Start production SSR server:');
  console.log('   $ npm run start');
  console.log('');
  console.log('   Every HTTP request will be server-side rendered by Node.');
  console.log('');
  console.log('   Optional - Generate static HTML files:');
  console.log('   $ npm run prerender');
  console.log('');
}

buildAll().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
