#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function startProduction() {
  // Check if build exists
  const clientDir = resolve(root, 'dist/client');
  const serverDir = resolve(root, 'dist/server');
  
  if (!existsSync(clientDir) || !existsSync(serverDir)) {
    console.error('❌ Production build not found!');
    console.error('   Run: node scripts/build-all.js');
    process.exit(1);
  }
  
  console.log('🚀 Starting SSR production server...\n');
  
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
