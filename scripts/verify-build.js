#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🔍 PITTPARTYBUS.COM - BUILD VERIFICATION REPORT\n');
console.log('=' .repeat(70));
console.log('This script verifies that your SSR build is ready for deployment.');
console.log('=' .repeat(70) + '\n');

const distDir = path.join(__dirname, '../dist');
let totalChecks = 0;
let passedChecks = 0;
let criticalFailures = [];
let warnings = [];

// Test routes with expected content
const testRoutes = [
  { 
    path: '/', 
    file: 'index.html', 
    expectedH1: 'Pittsburgh Party Bus',
    expectedCanonical: 'https://pittpartybus.com',
    minLinks: 20
  },
  { 
    path: '/fleet', 
    file: 'fleet.html', 
    expectedH1: 'Premium Party Bus',
    expectedCanonical: 'https://pittpartybus.com/fleet',
    minLinks: 20
  },
  { 
    path: '/events', 
    file: 'events.html', 
    expectedH1: 'Party Bus Events',
    expectedCanonical: 'https://pittpartybus.com/events',
    minLinks: 20
  },
  { 
    path: '/pricing', 
    file: 'pricing.html', 
    expectedH1: 'Party Bus Pricing',
    expectedCanonical: 'https://pittpartybus.com/pricing',
    minLinks: 20
  },
  { 
    path: '/contact', 
    file: 'contact.html', 
    expectedH1: 'Contact',
    expectedCanonical: 'https://pittpartybus.com/contact',
    minLinks: 20
  },
  { 
    path: '/privacy', 
    file: 'privacy.html', 
    expectedH1: 'Privacy Policy',
    expectedCanonical: 'https://pittpartybus.com/privacy',
    minLinks: 6
  },
  { 
    path: '/terms', 
    file: 'terms.html', 
    expectedH1: 'Terms of Service',
    expectedCanonical: 'https://pittpartybus.com/terms',
    minLinks: 6
  },
  { 
    path: '/blog/party-bus-pricing-guide', 
    file: 'blog/party-bus-pricing-guide.html', 
    expectedH1: 'Party Bus Pricing Guide',
    expectedCanonical: 'https://pittpartybus.com/blog/party-bus-pricing-guide',
    minLinks: 15
  },
];

// STEP 1: Check if dist folder exists
console.log('📁 STEP 1: Checking Build Directory\n');
totalChecks++;
if (!fs.existsSync(distDir)) {
  console.log('   ❌ CRITICAL: dist/ folder not found');
  console.log('   → Run: npm run build\n');
  criticalFailures.push('dist/ folder does not exist - build has not been run');
  console.log('\n' + '='.repeat(70));
  console.log('❌ BUILD VERIFICATION FAILED');
  console.log('='.repeat(70));
  console.log('\n🚨 CRITICAL: You must run "npm run build" first!\n');
  process.exit(1);
}
console.log('   ✅ dist/ folder exists\n');
passedChecks++;

// STEP 2: Check critical static files
console.log('📄 STEP 2: Checking Critical Static Files\n');

const criticalFiles = [
  { path: '.htaccess', description: 'Apache configuration for routing' },
  { path: 'sitemap.xml', description: 'XML sitemap for search engines' },
  { path: 'robots.txt', description: 'Search engine crawling rules' },
  { path: 'index.html', description: 'Homepage HTML' },
];

criticalFiles.forEach(({ path: filePath, description }) => {
  totalChecks++;
  const fullPath = path.join(distDir, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ ${filePath} - ${description}`);
    passedChecks++;
  } else {
    console.log(`   ❌ ${filePath} - MISSING`);
    criticalFailures.push(`${filePath} is missing`);
  }
});

console.log('\n');

// STEP 3: Verify .htaccess configuration
console.log('⚙️  STEP 3: Verifying .htaccess Configuration\n');

const htaccessPath = path.join(distDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  const htaccess = fs.readFileSync(htaccessPath, 'utf-8');
  
  const htaccessChecks = [
    { pattern: 'RewriteEngine On', description: 'Rewrite engine enabled' },
    { pattern: 'RewriteCond %{HTTPS} off', description: 'HTTPS redirect configured' },
    { pattern: 'RewriteRule', description: 'URL rewrite rules present' },
  ];
  
  htaccessChecks.forEach(({ pattern, description }) => {
    totalChecks++;
    if (htaccess.includes(pattern)) {
      console.log(`   ✅ ${description}`);
      passedChecks++;
    } else {
      console.log(`   ❌ ${description} - MISSING`);
      criticalFailures.push(`.htaccess missing: ${description}`);
    }
  });
} else {
  console.log('   ⚠️  Skipped - .htaccess file not found');
}

console.log('\n');

// STEP 4: Verify pre-rendered HTML pages
console.log('🌐 STEP 4: Verifying Pre-Rendered HTML Pages\n');

testRoutes.forEach(({ path: routePath, file, expectedH1, expectedCanonical, minLinks }) => {
  console.log(`   📄 Route: ${routePath}`);
  
  const filePath = path.join(distDir, file);
  totalChecks++;
  
  if (!fs.existsSync(filePath)) {
    console.log(`      ❌ File not found: ${file}`);
    criticalFailures.push(`${routePath} - HTML file not generated`);
    console.log('');
    return;
  }
  
  console.log(`      ✅ File exists: ${file}`);
  passedChecks++;
  
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Check 1: No SSR placeholder
  totalChecks++;
  if (!html.includes('<!--ssr-outlet-->')) {
    console.log('      ✅ SSR placeholder replaced (content rendered)');
    passedChecks++;
  } else {
    console.log('      ❌ SSR placeholder still present (content NOT rendered)');
    criticalFailures.push(`${routePath} - SSR content not injected`);
  }
  
  // Check 2: H1 tag present
  totalChecks++;
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match && h1Match[1].includes(expectedH1)) {
    console.log(`      ✅ H1 tag found: "${h1Match[1].substring(0, 60)}..."`);
    passedChecks++;
  } else if (h1Match) {
    console.log(`      ⚠️  H1 tag found but doesn't match expected text`);
    console.log(`         Expected: "${expectedH1}"`);
    console.log(`         Found: "${h1Match[1].substring(0, 60)}..."`);
    warnings.push(`${routePath} - H1 tag text mismatch`);
    passedChecks++;
  } else {
    console.log('      ❌ H1 tag NOT found');
    criticalFailures.push(`${routePath} - Missing H1 tag`);
  }
  
  // Check 3: Canonical URL
  totalChecks++;
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (canonicalMatch && canonicalMatch[1] === expectedCanonical) {
    console.log(`      ✅ Canonical URL: ${canonicalMatch[1]}`);
    passedChecks++;
  } else if (canonicalMatch) {
    console.log(`      ⚠️  Canonical URL found but doesn't match expected`);
    console.log(`         Expected: ${expectedCanonical}`);
    console.log(`         Found: ${canonicalMatch[1]}`);
    warnings.push(`${routePath} - Canonical URL mismatch`);
    passedChecks++;
  } else {
    console.log('      ❌ Canonical URL NOT found');
    criticalFailures.push(`${routePath} - Missing canonical URL`);
  }
  
  // Check 4: Meta description
  totalChecks++;
  const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (metaDesc && metaDesc[1].length > 50) {
    console.log(`      ✅ Meta description: ${metaDesc[1].substring(0, 60)}...`);
    passedChecks++;
  } else if (metaDesc) {
    console.log(`      ⚠️  Meta description too short (${metaDesc[1].length} chars)`);
    warnings.push(`${routePath} - Short meta description`);
    passedChecks++;
  } else {
    console.log('      ❌ Meta description NOT found');
    criticalFailures.push(`${routePath} - Missing meta description`);
  }
  
  // Check 5: Open Graph tags
  totalChecks++;
  const ogTitle = html.includes('property="og:title"');
  const ogDesc = html.includes('property="og:description"');
  const ogImage = html.includes('property="og:image"');
  const ogUrl = html.includes('property="og:url"');
  
  if (ogTitle && ogDesc && ogImage && ogUrl) {
    console.log('      ✅ Open Graph tags complete (title, description, image, url)');
    passedChecks++;
  } else {
    const missing = [];
    if (!ogTitle) missing.push('og:title');
    if (!ogDesc) missing.push('og:description');
    if (!ogImage) missing.push('og:image');
    if (!ogUrl) missing.push('og:url');
    console.log(`      ❌ Open Graph tags incomplete - missing: ${missing.join(', ')}`);
    criticalFailures.push(`${routePath} - Incomplete Open Graph tags`);
  }
  
  // Check 6: Twitter Card tags
  totalChecks++;
  const twitterCard = html.includes('name="twitter:card"');
  const twitterTitle = html.includes('name="twitter:title"');
  
  if (twitterCard && twitterTitle) {
    console.log('      ✅ Twitter Card tags present');
    passedChecks++;
  } else {
    console.log('      ⚠️  Twitter Card tags incomplete');
    warnings.push(`${routePath} - Incomplete Twitter Card tags`);
  }
  
  // Check 7: Structured data (JSON-LD)
  totalChecks++;
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi);
  if (jsonLdMatches && jsonLdMatches.length > 0) {
    console.log(`      ✅ Structured data found (${jsonLdMatches.length} JSON-LD script(s))`);
    passedChecks++;
  } else {
    console.log('      ⚠️  No structured data (JSON-LD) found');
    warnings.push(`${routePath} - Missing structured data`);
  }
  
  // Check 8: Internal links
  totalChecks++;
  const linkMatches = html.match(/href=["'][\/][^"']*["']/gi);
  const linkCount = linkMatches ? linkMatches.length : 0;
  
  if (linkCount >= minLinks) {
    console.log(`      ✅ Internal links: ${linkCount} found (minimum: ${minLinks})`);
    passedChecks++;
  } else {
    console.log(`      ⚠️  Internal links: ${linkCount} found (expected: ${minLinks}+)`);
    warnings.push(`${routePath} - Low internal link count`);
  }
  
  // Check 9: Robots meta tag
  totalChecks++;
  const robotsIndex = html.includes('index, follow');
  const robotsNoIndex = html.includes('noindex');
  
  if (robotsIndex && !robotsNoIndex) {
    console.log('      ✅ Robots meta: index, follow');
    passedChecks++;
  } else if (robotsNoIndex) {
    console.log('      ❌ Robots meta: noindex detected (page will not be indexed)');
    criticalFailures.push(`${routePath} - Page set to noindex`);
  } else {
    console.log('      ⚠️  Robots meta tag not found');
    warnings.push(`${routePath} - Missing robots meta tag`);
  }
  
  // Check 10: Word count
  const textContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                          .replace(/<[^>]+>/g, ' ')
                          .replace(/\s+/g, ' ')
                          .trim();
  const wordCount = textContent.split(/\s+/).length;
  
  if (wordCount >= 300) {
    console.log(`      ✅ Word count: ${wordCount} words`);
  } else {
    console.log(`      ⚠️  Word count: ${wordCount} words (consider adding more content)`);
    warnings.push(`${routePath} - Low word count (${wordCount} words)`);
  }
  
  console.log('');
});

// STEP 5: Final Summary
console.log('=' .repeat(70));
console.log('📊 VERIFICATION SUMMARY');
console.log('=' .repeat(70) + '\n');

console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks} ✅`);
console.log(`Failed: ${totalChecks - passedChecks} ❌`);
console.log(`Warnings: ${warnings.length} ⚠️\n`);

const passRate = ((passedChecks / totalChecks) * 100).toFixed(1);
console.log(`Pass Rate: ${passRate}%\n`);

if (criticalFailures.length > 0) {
  console.log('🚨 CRITICAL FAILURES:\n');
  criticalFailures.forEach((failure, index) => {
    console.log(`   ${index + 1}. ${failure}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS (Non-Critical):\n');
  warnings.forEach((warning, index) => {
    console.log(`   ${index + 1}. ${warning}`);
  });
  console.log('');
}

console.log('=' .repeat(70));

if (criticalFailures.length === 0) {
  console.log('✅ BUILD VERIFICATION PASSED');
  console.log('=' .repeat(70));
  console.log('\n🎉 Your site is ready for deployment to Hostinger!');
  console.log('\n📋 NEXT STEPS:\n');
  console.log('   1. Upload ALL files from dist/ folder to Hostinger');
  console.log('   2. Ensure .htaccess is in the root directory');
  console.log('   3. Clear all caches (Hostinger, Cloudflare, browser)');
  console.log('   4. Test live site: view page source and look for <h1> tags');
  console.log('   5. Wait 24-48 hours for Ahrefs to re-crawl your site\n');
  
  if (warnings.length > 0) {
    console.log(`⚠️  Note: ${warnings.length} warnings found - these are not critical but may improve SEO\n`);
  }
  
  process.exit(0);
} else {
  console.log('❌ BUILD VERIFICATION FAILED');
  console.log('=' .repeat(70));
  console.log(`\n🚨 ${criticalFailures.length} critical issue(s) found - FIX BEFORE DEPLOYING\n`);
  console.log('💡 TROUBLESHOOTING:\n');
  console.log('   • If HTML files are missing: Run "npm run build" again');
  console.log('   • If SSR placeholder present: Check prerender-with-meta.js script');
  console.log('   • If H1/meta tags missing: Check entry-server.tsx is working');
  console.log('   • If .htaccess missing: Check public/.htaccess exists\n');
  process.exit(1);
}
