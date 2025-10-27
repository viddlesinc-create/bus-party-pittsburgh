#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// All routes to audit
const routes = [
  { path: '/', file: 'index.html', name: 'Homepage' },
  { path: '/fleet', file: 'fleet.html', name: 'Fleet' },
  { path: '/events', file: 'events.html', name: 'Events' },
  { path: '/pricing', file: 'pricing.html', name: 'Pricing' },
  { path: '/contact', file: 'contact.html', name: 'Contact' },
  { path: '/blog', file: 'blog.html', name: 'Blog Index' },
  { path: '/locations', file: 'locations.html', name: 'Locations' },
  { path: '/testimonials', file: 'testimonials.html', name: 'Testimonials' },
  { path: '/faqs', file: 'faqs.html', name: 'FAQs' },
  { path: '/privacy', file: 'privacy.html', name: 'Privacy Policy' },
  { path: '/terms', file: 'terms.html', name: 'Terms of Service' },
  { path: '/blog/party-bus-pricing-guide', file: 'blog/party-bus-pricing-guide.html', name: 'Blog: Pricing Guide' },
  { path: '/blog/party-bus-vs-limo', file: 'blog/party-bus-vs-limo.html', name: 'Blog: Party Bus vs Limo' },
  { path: '/blog/party-bus-safety-tips', file: 'blog/party-bus-safety-tips.html', name: 'Blog: Safety Tips' },
  { path: '/blog/bachelor-bachelorette-ideas', file: 'blog/bachelor-bachelorette-ideas.html', name: 'Blog: Bachelor/Bachelorette' },
  { path: '/blog/wedding-transportation', file: 'blog/wedding-transportation.html', name: 'Blog: Wedding Transport' },
  { path: '/blog/prom-transportation-safety', file: 'blog/prom-transportation-safety.html', name: 'Blog: Prom Safety' },
  { path: '/blog/concert-party-bus', file: 'blog/concert-party-bus.html', name: 'Blog: Concert Transport' },
  { path: '/blog/corporate-event-transportation', file: 'blog/corporate-event-transportation.html', name: 'Blog: Corporate Events' },
  { path: '/blog/top-events-pittsburgh', file: 'blog/top-events-pittsburgh.html', name: 'Blog: Pittsburgh Events' },
  { path: '/blog/accurate-party-bus-estimate', file: 'blog/accurate-party-bus-estimate.html', name: 'Blog: Accurate Estimates' },
];

// Audit results storage
const auditResults = {
  summary: {
    totalRoutes: routes.length,
    passed: 0,
    warnings: 0,
    failed: 0,
    criticalIssues: [],
    warnings: [],
  },
  routes: [],
  performance: {
    totalSize: 0,
    avgSize: 0,
    largestPage: { name: '', size: 0 },
    smallestPage: { name: '', size: 0 },
  },
  schemas: {
    organization: 0,
    website: 0,
    breadcrumb: 0,
    article: 0,
    service: 0,
  },
  crossPageConsistency: {
    phoneNumbers: new Set(),
    organizationNames: new Set(),
    navLinks: new Map(),
  }
};

// Helper: Extract text content from HTML
function extractTextContent(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Count words
function countWords(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Helper: Extract all structured data
function extractStructuredData(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema);
    } catch (e) {
      schemas.push({ error: 'Invalid JSON', raw: match[1].substring(0, 100) });
    }
  }
  
  return schemas;
}

// Helper: Extract meta tag content
function extractMeta(html, name) {
  const nameMatch = new RegExp(`<meta name="${name}" content="([^"]*)"`, 'i').exec(html);
  const propertyMatch = new RegExp(`<meta property="${name}" content="([^"]*)"`, 'i').exec(html);
  return nameMatch?.[1] || propertyMatch?.[1] || null;
}

// Helper: Extract title
function extractTitle(html) {
  const match = /<title>([^<]*)<\/title>/i.exec(html);
  return match?.[1] || null;
}

// Helper: Extract canonical
function extractCanonical(html) {
  const match = /<link rel="canonical" href="([^"]*)"/.exec(html);
  return match?.[1] || null;
}

// Helper: Count H1 tags
function countH1Tags(html) {
  const matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
  return matches ? matches.length : 0;
}

// Helper: Extract H1 text
function extractH1Text(html) {
  const match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : null;
}

// Helper: Count images and check alt attributes
function analyzeImages(html) {
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const withAlt = imgTags.filter(img => /alt="[^"]*"/.test(img) && !/alt=""/.test(img));
  return {
    total: imgTags.length,
    withAlt: withAlt.length,
    withoutAlt: imgTags.length - withAlt.length,
  };
}

// Helper: Count internal links
function countInternalLinks(html) {
  const links = html.match(/<a[^>]*href="[^"]*"[^>]*>/gi) || [];
  return links.length;
}

// Helper: Check for navigation links
function checkNavigationLinks(html) {
  const requiredLinks = ['/fleet', '/events', '/pricing', '/contact', '/blog'];
  const found = requiredLinks.filter(link => 
    new RegExp(`href="${link}"`, 'i').test(html)
  );
  return {
    required: requiredLinks,
    found: found,
    missing: requiredLinks.filter(l => !found.includes(l)),
  };
}

// Audit a single route
function auditRoute(route) {
  const filePath = path.join(distDir, route.file);
  const result = {
    name: route.name,
    path: route.path,
    file: route.file,
    status: 'passed',
    checks: {},
    issues: [],
    warnings: [],
  };

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    result.status = 'failed';
    result.issues.push('HTML file does not exist');
    return result;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const fileSize = fs.statSync(filePath).size;
  const fileSizeKB = (fileSize / 1024).toFixed(2);

  // Update performance metrics
  auditResults.performance.totalSize += fileSize;
  if (fileSize > auditResults.performance.largestPage.size) {
    auditResults.performance.largestPage = { name: route.name, size: fileSize };
  }
  if (!auditResults.performance.smallestPage.size || fileSize < auditResults.performance.smallestPage.size) {
    auditResults.performance.smallestPage = { name: route.name, size: fileSize };
  }

  // Check for SSR placeholder
  if (html.includes('<!--ssr-outlet-->')) {
    result.issues.push('SSR placeholder not replaced');
    result.status = 'failed';
  }

  // Extract and analyze content
  const textContent = extractTextContent(html);
  const wordCount = countWords(textContent);

  // Check H1
  const h1Count = countH1Tags(html);
  const h1Text = extractH1Text(html);
  result.checks.h1 = {
    count: h1Count,
    text: h1Text,
    status: h1Count === 1 ? 'pass' : 'fail',
  };
  if (h1Count === 0) {
    result.issues.push('No H1 tag found');
    result.status = 'failed';
  } else if (h1Count > 1) {
    result.warnings.push(`Multiple H1 tags found (${h1Count})`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check title
  const title = extractTitle(html);
  result.checks.title = {
    content: title,
    length: title ? title.length : 0,
    status: title && title.length >= 30 && title.length <= 60 ? 'pass' : 'warn',
  };
  if (!title) {
    result.issues.push('No title tag found');
    result.status = 'failed';
  } else if (title.length < 30) {
    result.warnings.push(`Title too short (${title.length} chars, recommended 50-60)`);
    if (result.status === 'passed') result.status = 'warning';
  } else if (title.length > 60) {
    result.warnings.push(`Title too long (${title.length} chars, recommended 50-60)`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check meta description
  const description = extractMeta(html, 'description');
  result.checks.description = {
    content: description,
    length: description ? description.length : 0,
    status: description && description.length >= 120 && description.length <= 160 ? 'pass' : 'warn',
  };
  if (!description) {
    result.issues.push('No meta description found');
    result.status = 'failed';
  } else if (description.length < 120) {
    result.warnings.push(`Description too short (${description.length} chars, recommended 120-160)`);
    if (result.status === 'passed') result.status = 'warning';
  } else if (description.length > 160) {
    result.warnings.push(`Description too long (${description.length} chars, recommended 120-160)`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check canonical
  const canonical = extractCanonical(html);
  result.checks.canonical = {
    url: canonical,
    status: canonical && canonical.startsWith('https://pittpartybus.com') ? 'pass' : 'fail',
  };
  if (!canonical) {
    result.issues.push('No canonical URL found');
    result.status = 'failed';
  } else if (!canonical.startsWith('https://pittpartybus.com')) {
    result.issues.push(`Canonical URL has wrong domain: ${canonical}`);
    result.status = 'failed';
  }

  // Check robots
  const robots = extractMeta(html, 'robots');
  result.checks.robots = {
    content: robots,
    status: !robots || robots.includes('noindex') ? 'warn' : 'pass',
  };
  if (robots && robots.includes('noindex') && !route.path.includes('/privacy') && !route.path.includes('/terms')) {
    result.warnings.push('Page is set to noindex');
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check Open Graph tags
  const ogTitle = extractMeta(html, 'og:title');
  const ogDescription = extractMeta(html, 'og:description');
  const ogImage = extractMeta(html, 'og:image');
  const ogUrl = extractMeta(html, 'og:url');
  const ogType = extractMeta(html, 'og:type');
  const ogTagsPresent = [ogTitle, ogDescription, ogImage, ogUrl, ogType].filter(Boolean).length;
  result.checks.openGraph = {
    present: ogTagsPresent,
    total: 5,
    status: ogTagsPresent === 5 ? 'pass' : 'warn',
  };
  if (ogTagsPresent < 5) {
    result.warnings.push(`Missing ${5 - ogTagsPresent} Open Graph tags`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check Twitter Cards
  const twitterCard = extractMeta(html, 'twitter:card');
  const twitterTitle = extractMeta(html, 'twitter:title');
  const twitterDescription = extractMeta(html, 'twitter:description');
  const twitterImage = extractMeta(html, 'twitter:image');
  const twitterTagsPresent = [twitterCard, twitterTitle, twitterDescription, twitterImage].filter(Boolean).length;
  result.checks.twitterCards = {
    present: twitterTagsPresent,
    total: 4,
    status: twitterTagsPresent === 4 ? 'pass' : 'warn',
  };
  if (twitterTagsPresent < 4) {
    result.warnings.push(`Missing ${4 - twitterTagsPresent} Twitter Card tags`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Analyze structured data
  const schemas = extractStructuredData(html);
  result.checks.structuredData = {
    count: schemas.length,
    types: schemas.map(s => s['@type']).filter(Boolean),
    schemas: schemas,
    status: schemas.length > 0 ? 'pass' : 'fail',
  };
  if (schemas.length === 0) {
    result.issues.push('No structured data found');
    result.status = 'failed';
  }

  // Count schema types for summary
  schemas.forEach(schema => {
    const type = schema['@type'];
    if (type === 'Organization') auditResults.schemas.organization++;
    if (type === 'WebSite') auditResults.schemas.website++;
    if (type === 'BreadcrumbList') auditResults.schemas.breadcrumb++;
    if (type === 'Article' || type === 'BlogPosting') auditResults.schemas.article++;
    if (type === 'Service') auditResults.schemas.service++;
  });

  // Collect cross-page data
  schemas.forEach(schema => {
    if (schema['@type'] === 'Organization') {
      if (schema.name) auditResults.crossPageConsistency.organizationNames.add(schema.name);
      if (schema.telephone) auditResults.crossPageConsistency.phoneNumbers.add(schema.telephone);
    }
  });

  // Check word count
  result.checks.content = {
    wordCount: wordCount,
    status: wordCount >= 300 ? 'pass' : 'warn',
  };
  if (wordCount < 300) {
    result.warnings.push(`Low word count (${wordCount} words, recommended >300)`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check images
  const imageAnalysis = analyzeImages(html);
  result.checks.images = {
    ...imageAnalysis,
    status: imageAnalysis.withoutAlt === 0 ? 'pass' : 'warn',
  };
  if (imageAnalysis.withoutAlt > 0) {
    result.warnings.push(`${imageAnalysis.withoutAlt} images missing alt text`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check internal links
  const internalLinkCount = countInternalLinks(html);
  result.checks.internalLinks = {
    count: internalLinkCount,
    status: internalLinkCount > 5 ? 'pass' : 'warn',
  };
  if (internalLinkCount < 5) {
    result.warnings.push(`Low internal link count (${internalLinkCount} links)`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check navigation links
  const navAnalysis = checkNavigationLinks(html);
  result.checks.navigation = {
    ...navAnalysis,
    status: navAnalysis.missing.length === 0 ? 'pass' : 'warn',
  };
  if (navAnalysis.missing.length > 0) {
    result.warnings.push(`Missing navigation links: ${navAnalysis.missing.join(', ')}`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check file size
  result.checks.fileSize = {
    bytes: fileSize,
    kb: fileSizeKB,
    status: fileSize < 500 * 1024 ? 'pass' : 'warn',
  };
  if (fileSize > 500 * 1024) {
    result.warnings.push(`Large file size (${fileSizeKB}KB, recommended <500KB)`);
    if (result.status === 'passed') result.status = 'warning';
  }

  // Check for compression files
  const gzPath = filePath + '.gz';
  const brPath = filePath + '.br';
  result.checks.compression = {
    gzip: fs.existsSync(gzPath),
    brotli: fs.existsSync(brPath),
    status: fs.existsSync(gzPath) || fs.existsSync(brPath) ? 'pass' : 'warn',
  };

  return result;
}

// Run complete audit
function runCompleteAudit() {
  console.log('🔍 COMPLETE SSR AUDIT REPORT');
  console.log('=' .repeat(80));
  console.log('');

  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist/ directory not found!');
    console.error('   Run "npm run build" first to generate the static site.\n');
    process.exit(1);
  }

  // Audit each route
  console.log('🔎 Auditing all routes...\n');
  routes.forEach((route, index) => {
    process.stdout.write(`   [${index + 1}/${routes.length}] ${route.name}...`);
    const result = auditRoute(route);
    auditResults.routes.push(result);
    
    // Update summary
    if (result.status === 'passed') {
      auditResults.summary.passed++;
      process.stdout.write(' ✅\n');
    } else if (result.status === 'warning') {
      auditResults.summary.warnings++;
      process.stdout.write(' ⚠️\n');
    } else {
      auditResults.summary.failed++;
      process.stdout.write(' ❌\n');
    }

    // Collect critical issues
    result.issues.forEach(issue => {
      auditResults.summary.criticalIssues.push(`${route.name}: ${issue}`);
    });
  });

  // Calculate performance metrics
  auditResults.performance.avgSize = auditResults.performance.totalSize / routes.length;

  // Print summary
  console.log('');
  console.log('📊 SUMMARY');
  console.log(`   Total Routes: ${auditResults.summary.totalRoutes}`);
  console.log(`   ✅ Passed: ${auditResults.summary.passed}`);
  console.log(`   ⚠️  Warnings: ${auditResults.summary.warnings}`);
  console.log(`   ❌ Failed: ${auditResults.summary.failed}`);
  console.log('');

  // Print critical checks
  const allH1Checks = auditResults.routes.filter(r => r.checks.h1?.status === 'pass').length;
  const allDescriptionChecks = auditResults.routes.filter(r => r.checks.description?.content).length;
  const allCanonicalChecks = auditResults.routes.filter(r => r.checks.canonical?.status === 'pass').length;
  const allStructuredDataChecks = auditResults.routes.filter(r => r.checks.structuredData?.count > 0).length;
  const allOGChecks = auditResults.routes.filter(r => r.checks.openGraph?.present === 5).length;
  const allTwitterChecks = auditResults.routes.filter(r => r.checks.twitterCards?.present === 4).length;
  const allNavigationChecks = auditResults.routes.filter(r => r.checks.navigation?.missing.length === 0).length;

  console.log(`🎯 CRITICAL CHECKS`);
  console.log(`   ${allH1Checks === routes.length ? '✅' : '❌'} H1 Tags: ${allH1Checks}/${routes.length} pages`);
  console.log(`   ${allDescriptionChecks === routes.length ? '✅' : '❌'} Meta Descriptions: ${allDescriptionChecks}/${routes.length} pages`);
  console.log(`   ${allCanonicalChecks === routes.length ? '✅' : '❌'} Canonical URLs: ${allCanonicalChecks}/${routes.length} pages`);
  console.log(`   ${allStructuredDataChecks === routes.length ? '✅' : '❌'} Structured Data: ${allStructuredDataChecks}/${routes.length} pages`);
  console.log(`   ${allOGChecks === routes.length ? '✅' : '⚠️'} Open Graph Tags: ${allOGChecks}/${routes.length} pages`);
  console.log(`   ${allTwitterChecks === routes.length ? '✅' : '⚠️'} Twitter Cards: ${allTwitterChecks}/${routes.length} pages`);
  console.log(`   ${allNavigationChecks === routes.length ? '✅' : '⚠️'} Navigation Links: ${allNavigationChecks}/${routes.length} pages`);
  console.log('');

  // Print critical issues
  if (auditResults.summary.criticalIssues.length > 0) {
    console.log('❌ CRITICAL ISSUES');
    auditResults.summary.criticalIssues.forEach(issue => {
      console.log(`   • ${issue}`);
    });
    console.log('');
  }

  // Print warnings (top 10)
  const allWarnings = auditResults.routes.flatMap(r => 
    r.warnings.map(w => `${r.name}: ${w}`)
  );
  if (allWarnings.length > 0) {
    console.log(`⚠️  WARNINGS (${allWarnings.length} total)`);
    allWarnings.slice(0, 10).forEach(warning => {
      console.log(`   • ${warning}`);
    });
    if (allWarnings.length > 10) {
      console.log(`   ... and ${allWarnings.length - 10} more warnings`);
    }
    console.log('');
  }

  // Print performance metrics
  console.log('📈 PERFORMANCE METRICS');
  console.log(`   Total HTML Size: ${(auditResults.performance.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Average File Size: ${(auditResults.performance.avgSize / 1024).toFixed(2)} KB`);
  console.log(`   Largest Page: ${auditResults.performance.largestPage.name} (${(auditResults.performance.largestPage.size / 1024).toFixed(2)} KB)`);
  console.log(`   Smallest Page: ${auditResults.performance.smallestPage.name} (${(auditResults.performance.smallestPage.size / 1024).toFixed(2)} KB)`);
  console.log('');

  // Print schema coverage
  console.log('🔗 SCHEMA COVERAGE');
  console.log(`   Organization: ${auditResults.schemas.organization}/${routes.length} pages`);
  console.log(`   WebSite: ${auditResults.schemas.website}/${routes.length} pages`);
  console.log(`   Breadcrumb: ${auditResults.schemas.breadcrumb}/${routes.length} pages`);
  console.log(`   Article/BlogPosting: ${auditResults.schemas.article} pages`);
  console.log(`   Service: ${auditResults.schemas.service} pages`);
  console.log('');

  // Check cross-page consistency
  console.log('🔄 CROSS-PAGE CONSISTENCY');
  if (auditResults.crossPageConsistency.organizationNames.size > 1) {
    console.log(`   ⚠️  Multiple organization names found: ${Array.from(auditResults.crossPageConsistency.organizationNames).join(', ')}`);
  } else {
    console.log(`   ✅ Organization name consistent across all pages`);
  }
  if (auditResults.crossPageConsistency.phoneNumbers.size > 1) {
    console.log(`   ⚠️  Multiple phone numbers found: ${Array.from(auditResults.crossPageConsistency.phoneNumbers).join(', ')}`);
  } else {
    console.log(`   ✅ Phone number consistent across all pages`);
  }
  console.log('');

  // Save detailed JSON report
  const reportPath = path.join(distDir, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
  console.log(`📄 Detailed JSON report saved to: ${reportPath}`);
  console.log('');

  // Final verdict
  if (auditResults.summary.failed > 0) {
    console.log('❌ AUDIT FAILED');
    console.log(`   ${auditResults.summary.failed} page(s) have critical issues that must be fixed.`);
    console.log('');
    process.exit(1);
  } else if (auditResults.summary.warnings > 0) {
    console.log('⚠️  AUDIT PASSED WITH WARNINGS');
    console.log(`   ${auditResults.summary.warnings} page(s) have warnings to review.`);
    console.log('   Site is functional but could be improved.');
    console.log('');
    process.exit(0);
  } else {
    console.log('✅ AUDIT COMPLETE - ALL CHECKS PASSED!');
    console.log('   Site is production-ready for SEO!');
    console.log('   All critical elements are server-rendered.');
    console.log('');
    process.exit(0);
  }
}

// Run the audit
runCompleteAudit();
