#!/usr/bin/env node
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function buildClient() {
  console.log('🔨 Building client bundle...');
  
  await build({
    root,
    mode: 'production',
    build: {
      outDir: 'dist/client',
      ssrManifest: true,
      emptyOutDir: true,
    },
  });
  
  console.log('✅ Client bundle built successfully!');
}

buildClient().catch((err) => {
  console.error('❌ Client build failed:', err);
  process.exit(1);
});
