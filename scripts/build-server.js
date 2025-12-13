#!/usr/bin/env node
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function buildServer() {
  console.log('🔨 Building server bundle...');
  
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
  
  console.log('✅ Server bundle built successfully!');
}

buildServer().catch((err) => {
  console.error('❌ Server build failed:', err);
  process.exit(1);
});
