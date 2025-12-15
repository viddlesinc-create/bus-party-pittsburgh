#!/usr/bin/env node
/**
 * ============================================
 * SSR Production Build Script
 * ============================================
 * 
 * Builds client + server bundles for per-request SSR.
 * After building, run: npm run start
 */

import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function buildAll() {
  const startTime = Date.now();
  
  console.log('🚀 Building SSR application...\n');
  
  // Step 1: Build client bundle
  console.log('📦 Step 1/2: Building client bundle...');
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
  console.log('📦 Step 2/2: Building server bundle...');
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
  
  // Copy static files
  const clientDir = resolve(root, 'dist/client');
  if (!existsSync(clientDir)) {
    mkdirSync(clientDir, { recursive: true });
  }
  
  const publicDir = resolve(root, 'public');
  if (existsSync(resolve(publicDir, 'robots.txt'))) {
    copyFileSync(resolve(publicDir, 'robots.txt'), resolve(clientDir, 'robots.txt'));
  }
  if (existsSync(resolve(publicDir, 'sitemap.xml'))) {
    copyFileSync(resolve(publicDir, 'sitemap.xml'), resolve(clientDir, 'sitemap.xml'));
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`🎉 SSR build completed in ${duration}s`);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n📋 To start the SSR server:');
  console.log('   npm run start');
  console.log('');
}

buildAll().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
