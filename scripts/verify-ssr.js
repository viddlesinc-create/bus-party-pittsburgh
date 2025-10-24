#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const testRoutes = [
  '/',
  '/fleet',
  '/events',
  '/pricing',
  '/contact',
  '/blog/party-bus-pricing-guide',
  '/privacy',
  '/terms'
];

console.log('\n🔍 SSR VERIFICATION REPORT\n');
console.log('Checking that all SEO-critical elements are in server-rendered HTML...\n');

const distDir = path.join(__dirname, '../dist');
let allPassed = true;

testRoutes.forEach(route => {
  const fileName = route === '/' ? 'index' : route;
  const filePath = path.join(distDir, `${fileName}.html`);
  
  console.log(`\n📄 Route: ${route}`);
  console.log(`   File: ${path.relative(process.cwd(), filePath)}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('   ❌ FILE NOT FOUND');
    allPassed = false;
    return;
  }
  
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Critical SSR checks
  const checks = {
    '✓ Primary Content (H1)': html.includes('<h1'),
    '✓ Meta Description': html.includes('meta name="description"'),
    '✓ Canonical URL': html.includes('rel="canonical"'),
    '✓ Open Graph Tags': html.includes('property="og:title"') && html.includes('property="og:description"') && html.includes('property="og:image"'),
    '✓ Twitter Cards': html.includes('name="twitter:card"') && html.includes('name="twitter:title"'),
    '✓ Structured Data (JSON-LD)': html.includes('application/ld+json'),
    '✓ Navigation Links': html.includes('href="/fleet"') && html.includes('href="/contact"'),
    '✓ Index/Follow': html.includes('index, follow') && !html.includes('noindex'),
    '✓ No SSR Outlet': !html.includes('<!--ssr-outlet-->'),
  };
  
  let routePassed = true;
  Object.entries(checks).forEach(([check, passed]) => {
    if (passed) {
      console.log(`   ✅ ${check}`);
    } else {
      console.log(`   ❌ ${check}`);
      routePassed = false;
      allPassed = false;
    }
  });
  
  // Additional validation
  const h1Count = (html.match(/<h1/g) || []).length;
  const structuredDataCount = (html.match(/application\/ld\+json/g) || []).length;
  
  console.log(`   📊 H1 tags: ${h1Count} (should be 1 per page)`);
  console.log(`   📊 JSON-LD scripts: ${structuredDataCount}`);
  
  if (h1Count === 0) {
    console.log('   ⚠️  WARNING: No H1 tag found');
    allPassed = false;
  }
  
  if (structuredDataCount === 0) {
    console.log('   ⚠️  WARNING: No structured data found');
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(60));
if (allPassed) {
  console.log('✅ SSR VERIFICATION PASSED - All SEO elements present in server HTML');
  console.log('🎉 Site is ready for search engine crawling!');
  process.exit(0);
} else {
  console.log('❌ SSR VERIFICATION FAILED - Some elements missing');
  console.log('⚠️  Please review the issues above before deploying');
  process.exit(1);
}
