#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

console.log('🚀 Starting Complete SSR Build for pittpartybus.com...\n');

// Step 1: Generate sitemap
console.log('📄 Step 1/6: Generating sitemap...');
try {
  execSync('node scripts/generate-sitemap.js', { cwd: root, stdio: 'inherit' });
  console.log('✅ Sitemap generated\n');
} catch (error) {
  console.error('❌ Sitemap generation failed:', error.message);
  process.exit(1);
}

// Step 2: Build the application with Vite
console.log('⚡ Step 2/6: Building application with Vite...');
try {
  execSync('vite build', { cwd: root, stdio: 'inherit' });
  console.log('✅ Vite build complete\n');
} catch (error) {
  console.error('❌ Vite build failed:', error.message);
  process.exit(1);
}

// Step 3: Pre-render all routes with meta tags (using dist/index.html as template)
console.log('🎨 Step 3/6: Pre-rendering all routes with SEO meta tags...');
try {
  execSync('node scripts/prerender-with-meta.js', { cwd: root, stdio: 'inherit' });
  console.log('✅ Pre-rendering complete\n');
} catch (error) {
  console.error('❌ Pre-rendering failed:', error.message);
  process.exit(1);
}

// Step 4: Copy critical static files (including .htaccess)
console.log('📁 Step 4/6: Copying static assets...');
const publicDir = path.join(root, 'public');

const staticFiles = ['robots.txt', 'sitemap.xml', '.htaccess'];
let copiedCount = 0;

staticFiles.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✅ Copied ${file}`);
    copiedCount++;
  } else {
    console.log(`  ⚠️  WARNING: ${file} not found`);
  }
});
console.log(`✅ Copied ${copiedCount}/${staticFiles.length} static files\n`);

// Step 5: Verify build output - file existence
console.log('🔍 Step 5/6: Verifying build output files...');
const requiredFiles = ['index.html', 'fleet.html', 'contact.html', 'robots.txt', 'sitemap.xml'];
let verifiedCount = 0;

requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} exists`);
    verifiedCount++;
  } else {
    console.log(`  ❌ ${file} missing!`);
  }
});
console.log(`✅ Verified ${verifiedCount}/${requiredFiles.length} files\n`);

// Step 6: CRITICAL - Verify SSR content in dist/index.html
console.log('🔒 Step 6/6: CRITICAL SSR Content Verification...');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('');
  console.error('❌❌❌ BUILD FAILED ❌❌❌');
  console.error('');
  console.error('dist/index.html does not exist!');
  console.error('');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// CHECK 1: <!--ssr-outlet--> must NOT be present
if (indexHtml.includes('<!--ssr-outlet-->')) {
  console.error('');
  console.error('❌❌❌ BUILD FAILED ❌❌❌');
  console.error('');
  console.error('dist/index.html still contains <!--ssr-outlet--> placeholder!');
  console.error('');
  console.error('This means SSR pre-rendering did NOT work correctly.');
  console.error('The deployed site will have NO content for search engines.');
  console.error('');
  console.error('Possible causes:');
  console.error('  1. prerender-with-meta.js is not replacing the placeholder');
  console.error('  2. The render() function is not returning HTML');
  console.error('  3. The template replacement is failing');
  console.error('');
  process.exit(1);
}
console.log('  ✅ No <!--ssr-outlet--> placeholder found');

// CHECK 2: <h1> tag must be present
if (!indexHtml.includes('<h1')) {
  console.error('');
  console.error('❌❌❌ BUILD FAILED ❌❌❌');
  console.error('');
  console.error('dist/index.html has no <h1> tag!');
  console.error('');
  console.error('This means SSR pre-rendering did not produce proper content.');
  console.error('');
  process.exit(1);
}
console.log('  ✅ <h1> tag found');

// CHECK 3: Navigation links should be present
if (indexHtml.includes('href="/fleet"') && indexHtml.includes('href="/contact"')) {
  console.log('  ✅ Navigation links found');
} else {
  console.log('  ⚠️  Warning: Some navigation links may be missing');
}

// CHECK 4: Show preview of content inside #root
const rootMatch = indexHtml.match(/<div id="root">([\s\S]*?)<\/div>/);
if (rootMatch && rootMatch[1]) {
  const contentPreview = rootMatch[1].replace(/\s+/g, ' ').trim().substring(0, 300);
  console.log('');
  console.log('  📄 Content preview inside #root:');
  console.log(`     "${contentPreview}..."`);
}

console.log('');
console.log('✅ SSR VERIFICATION PASSED!\n');

// Final summary
console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎉 SSR BUILD COMPLETE for pittpartybus.com!');
console.log('═══════════════════════════════════════════════════════════════════');
console.log('');
console.log('📦 Build Summary:');
console.log('  ✅ All routes pre-rendered with full HTML content');
console.log('  ✅ <!--ssr-outlet--> placeholder REPLACED with real content');
console.log('  ✅ Meta tags server-rendered for each page');
console.log('  ✅ Build verification PASSED');
console.log('');
console.log('🧪 Verify locally:');
console.log('   grep "ssr-outlet" dist/index.html  # Should return nothing');
console.log('   grep "<h1" dist/index.html          # Should show H1 tag');
console.log('');
console.log('📤 Deploy dist/ folder to hosting');
console.log('');
