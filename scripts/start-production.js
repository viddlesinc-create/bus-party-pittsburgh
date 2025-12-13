#!/usr/bin/env node
/**
 * ============================================
 * Production SSR Server Starter
 * ============================================
 * 
 * This script starts the Node.js SSR server in production mode.
 * Every HTTP request is rendered server-side before being sent to the browser.
 * 
 * Prerequisites:
 *   Run `npm run build` first to create the client and server bundles.
 * 
 * Usage:
 *   node scripts/start-production.js
 *   OR
 *   npm run start
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function startProduction() {
  // Verify build exists
  const clientDir = resolve(root, 'dist/client');
  const serverDir = resolve(root, 'dist/server');
  const serverBundle = resolve(serverDir, 'entry-server.js');
  
  if (!existsSync(clientDir)) {
    console.error('❌ Client build not found at dist/client/');
    console.error('   Run: npm run build');
    process.exit(1);
  }
  
  if (!existsSync(serverBundle)) {
    console.error('❌ Server bundle not found at dist/server/entry-server.js');
    console.error('   Run: npm run build');
    process.exit(1);
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 Starting SSR Production Server');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('   Every HTTP request will be server-side rendered.');
  console.log('   No prerendered static files are required.');
  console.log('');
  
  const server = spawn('npx', ['tsx', 'server.ts'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
    shell: true,
  });
  
  server.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    process.exit(code || 0);
  });
}

startProduction();
