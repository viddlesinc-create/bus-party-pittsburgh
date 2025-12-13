#!/usr/bin/env node
/**
 * Complete SSR Build Pipeline
 * 
 * Runs: sitemap -> build -> prerender -> verify
 * Usage: node scripts/build-ssr.js
 */
import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function runCommand(command, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔧 ${description}`);
  console.log('='.repeat(60) + '\n');
  
  try {
    execSync(command, { cwd: root, stdio: 'inherit' });
  } catch (error) {
    throw new Error(`Command failed: ${command}`);
  }
}

async function buildSSR() {
  const startTime = Date.now();
  
  console.log('🚀 Starting Complete SSR Build Pipeline for pittpartybus.com\n');
  console.log('This will:');
  console.log('  1. Generate sitemap.xml');
  console.log('  2. Build client and server bundles');
  console.log('  3. Prerender all SEO-critical pages');
  console.log('  4. Copy static assets');
  console.log('  5. Verify SSR output\n');
  
  try {
    // Step 1: Generate sitemap
    if (fs.existsSync(path.join(root, 'scripts/generate-sitemap.js'))) {
      runCommand('node scripts/generate-sitemap.js', 'Step 1/5: Generating Sitemap');
    } else {
      console.log('\n⚠️  Skipping sitemap generation (script not found)');
    }
    
    // Step 2: Build client and server
    runCommand('node scripts/build-all.js', 'Step 2/5: Building Client & Server');
    
    // Step 3: Prerender pages
    runCommand('node scripts/prerender.js', 'Step 3/5: Prerendering Pages');
    
    // Step 4: Copy static assets
    console.log(`\n${'='.repeat(60)}`);
    console.log('🔧 Step 4/5: Copying Static Assets');
    console.log('='.repeat(60) + '\n');
    
    const publicDir = path.join(root, 'public');
    const distDir = path.join(root, 'dist/client');
    
    const staticFiles = ['robots.txt', 'sitemap.xml', '.htaccess', 'favicon.ico'];
    staticFiles.forEach(file => {
      const src = path.join(publicDir, file);
      const dest = path.join(distDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`  ✅ Copied ${file}`);
      }
    });
    
    // Step 5: Verify SSR output
    runCommand('node scripts/verify-ssr.js', 'Step 5/5: Verifying SSR Output');
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log('🎉 SSR Build Pipeline Complete!');
    console.log('='.repeat(60));
    console.log(`\n⏱️  Total time: ${duration}s`);
    console.log('\n📋 Next steps:');
    console.log('   • Start production server: NODE_ENV=production npx tsx server.ts');
    console.log('   • Or deploy dist/client to your CDN/hosting');
    console.log('\n🌐 Site configured for: https://pittpartybus.com');
    
  } catch (err) {
    console.error('\n❌ SSR Build Pipeline Failed:', err.message);
    process.exit(1);
  }
}

buildSSR();
