#!/usr/bin/env node
/**
 * SSR Verification Script
 * 
 * Tests that server-rendered HTML contains proper meta tags and content.
 * Run after prerender: node scripts/verify-ssr.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Check both possible dist locations
const distDirs = [
  path.join(root, 'dist/client'),
  path.join(root, 'dist'),
];

let distDir = distDirs.find(d => fs.existsSync(d));

const testRoutes = [
  { route: '/', file: 'index.html' },
  { route: '/fleet', file: 'fleet.html' },
  { route: '/events', file: 'events.html' },
  { route: '/pricing', file: 'pricing.html' },
  { route: '/contact', file: 'contact.html' },
  { route: '/blog', file: 'blog.html' },
  { route: '/blog/party-bus-pricing-guide', file: 'blog/party-bus-pricing-guide.html' },
  { route: '/privacy', file: 'privacy.html' },
  { route: '/terms', file: 'terms.html' },
];

console.log('\n🔍 SSR VERIFICATION REPORT\n');
console.log('Checking that all SEO-critical elements are in server-rendered HTML...\n');

if (!distDir) {
  console.log('❌ No dist directory found. Run build first:');
  console.log('   node scripts/build-all.js');
  console.log('   node scripts/prerender.js');
  process.exit(1);
}

console.log(`📁 Using dist directory: ${path.relative(root, distDir)}\n`);

let allPassed = true;
let totalChecks = 0;
let passedChecks = 0;

testRoutes.forEach(({ route, file }) => {
  const filePath = path.join(distDir, file);

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
    'Title Tag': /<title[^>]*>[^<]+<\/title>/i.test(html),
    'Meta Description': /meta\s+name="description"/i.test(html),
    'Canonical URL': /rel="canonical"/i.test(html),
    'Open Graph Title': /property="og:title"/i.test(html),
    'Open Graph Description': /property="og:description"/i.test(html),
    'Open Graph Image': /property="og:image"/i.test(html),
    'Twitter Card': /name="twitter:card"/i.test(html),
    'No SSR Outlet Marker': !html.includes('<!--ssr-outlet-->'),
    'Has Content': html.length > 5000,
    'Robots Index': /content="index,\s*follow"|name="robots".*content="[^"]*index/i.test(html),
  };

  let routePassed = true;
  Object.entries(checks).forEach(([check, passed]) => {
    totalChecks++;
    if (passed) {
      passedChecks++;
      console.log(`   ✅ ${check}`);
    } else {
      console.log(`   ❌ ${check}`);
      routePassed = false;
      allPassed = false;
    }
  });

  // Additional metrics
  const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi);
  const h1Count = h1Match ? h1Match.length : 0;
  const structuredDataCount = (html.match(/application\/ld\+json/g) || []).length;
  const internalLinks = (html.match(/href="\/[^"]*"/g) || []).length;

  console.log(`   📊 H1 tags: ${h1Count} (should be 1)`);
  console.log(`   📊 JSON-LD scripts: ${structuredDataCount}`);
  console.log(`   📊 Internal links: ${internalLinks}`);

  if (h1Count === 0) {
    console.log('   ⚠️  WARNING: No H1 tag found in rendered HTML');
  }
  if (h1Count > 1) {
    console.log('   ⚠️  WARNING: Multiple H1 tags (should have exactly 1)');
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Summary: ${passedChecks}/${totalChecks} checks passed\n`);

if (allPassed) {
  console.log('✅ SSR VERIFICATION PASSED - All SEO elements present in server HTML');
  console.log('🎉 Site is ready for search engine crawling!');
  process.exit(0);
} else {
  console.log('❌ SSR VERIFICATION FAILED - Some elements missing');
  console.log('⚠️  Please review the issues above before deploying');
  process.exit(1);
}
