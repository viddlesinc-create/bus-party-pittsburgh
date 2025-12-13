#!/usr/bin/env node
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function buildAll() {
  const startTime = Date.now();
  
  console.log('🚀 Starting SSR production build...\n');
  
  // Build client
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
  
  // Build server
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
  
  // Copy server.ts for production (will be transpiled at runtime or pre-compiled)
  console.log('📦 Step 3/3: Preparing production server...');
  
  // Ensure dist directory exists
  if (!existsSync(resolve(root, 'dist'))) {
    mkdirSync(resolve(root, 'dist'), { recursive: true });
  }
  
  console.log('✅ Production server ready!\n');
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`🎉 SSR build completed in ${duration}s`);
  console.log('\n📋 To start production server:');
  console.log('   NODE_ENV=production npx tsx server.ts');
}

buildAll().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
