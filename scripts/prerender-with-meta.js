#!/usr/bin/env node
/**
 * Complete SSR Build with Meta Tag Injection
 * 
 * Enhanced prerender that properly injects all meta tags from react-helmet-async
 * and SSR data for hydration.
 * 
 * IMPORTANT: This script must run AFTER "vite build" because it reads
 * the template from dist/index.html (which has proper asset hashes).
 */
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

// Complete list of all routes that need to be pre-rendered
const routes = [
  "/",
  "/fleet",
  "/events",
  "/locations",
  "/pricing",
  "/contact",
  "/faqs",
  "/blog",
  "/testimonials",
  "/privacy",
  "/terms",
  "/blog/party-bus-pricing-guide",
  "/blog/top-events-pittsburgh",
  "/blog/party-bus-vs-limo",
  "/blog/bachelor-bachelorette-ideas",
  "/blog/wedding-transportation",
  "/blog/corporate-event-transportation",
  "/blog/concert-party-bus",
  "/blog/prom-transportation-safety",
  "/blog/party-bus-safety-tips",
  "/blog/accurate-party-bus-estimate"
];

console.log(`📋 Pre-rendering ${routes.length} routes for pittpartybus.com...`);

async function prerender() {
  const startTime = Date.now();
  
  // CRITICAL: Ensure Vite build has completed first
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found!');
    console.error('   Run "vite build" first before prerendering.');
    process.exit(1);
  }
  
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found!');
    console.error('   Run "vite build" first before prerendering.');
    process.exit(1);
  }
  
  // Read the BUILT template (has proper Vite asset hashes)
  const template = fs.readFileSync(templatePath, 'utf-8');
  console.log('📄 Using built template from dist/index.html');
  
  // Verify the template has the placeholder
  if (!template.includes('<!--ssr-outlet-->')) {
    console.error('❌ Template does not contain <!--ssr-outlet--> placeholder!');
    process.exit(1);
  }
  
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const rendered = await render(route);
      
      // Handle both string and object render results
      const html = typeof rendered === 'string' ? rendered : rendered.html;
      const helmet = typeof rendered === 'object' ? rendered.helmet : null;
      const initialData = typeof rendered === 'object' ? rendered.initialData : null;
      
      // Replace the SSR placeholder with actual content
      let finalHtml = template.replace('<!--ssr-outlet-->', html);
      
      // CRITICAL: Verify placeholder was replaced
      if (finalHtml.includes('<!--ssr-outlet-->')) {
        console.error(`❌ CRITICAL: Failed to replace <!--ssr-outlet--> for ${route}`);
        errorCount++;
        continue;
      }
      
      // Insert helmet meta tags
      if (helmet) {
        const helmetInsert = [
          helmet.title?.toString() || '',
          helmet.meta?.toString() || '',
          helmet.link?.toString() || '',
          helmet.script?.toString() || '',
        ].filter(Boolean).join('\n');
        
        finalHtml = finalHtml.replace('</head>', `${helmetInsert}\n</head>`);
      }
      
      // Insert SSR data for hydration
      if (initialData) {
        const dataScript = `<script>window.__INITIAL_DATA__=${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`;
        finalHtml = finalHtml.replace('</head>', `${dataScript}\n</head>`);
      }

      // Determine output path - homepage overwrites dist/index.html
      let filePath;
      if (route === '/') {
        filePath = path.join(distDir, 'index.html');
      } else {
        filePath = path.join(distDir, `${route}.html`);
      }
      
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, finalHtml);
      
      // Comprehensive verification of SSR content
      const checks = {
        'H1': finalHtml.includes('<h1'),
        'Meta': /meta\s+name="description"/i.test(finalHtml),
        'Canonical': finalHtml.includes('rel="canonical"'),
        'OpenGraph': /property="og:title"/i.test(finalHtml) && /property="og:description"/i.test(finalHtml),
        'Twitter': /name="twitter:card"/i.test(finalHtml),
        'Schema': finalHtml.includes('application/ld+json'),
        'NavLinks': finalHtml.includes('href="/fleet"') && finalHtml.includes('href="/contact"'),
        'SSR Data': !initialData || finalHtml.includes('__INITIAL_DATA__'),
        'No Placeholder': !finalHtml.includes('<!--ssr-outlet-->'),
      };
      
      const failedChecks = Object.entries(checks).filter(([_, passed]) => !passed).map(([name]) => name);
      const statusIcon = failedChecks.length === 0 ? '✅' : '⚠️';
      const status = failedChecks.length === 0 ? 'PASS' : `MISSING: ${failedChecks.join(', ')}`;
      
      console.log(`${statusIcon} ${route.padEnd(45)} ${status}`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
      errorCount++;
    }
  }

  await vite.close();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n📊 Pre-rendering Summary:`);
  console.log(`   ✅ Success: ${successCount}/${routes.length}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
  console.log(`   ⏱️  Duration: ${duration}s`);
  console.log('\n🎉 Prerendering with meta tags complete!');
  
  return errorCount;
}

prerender().then((errorCount) => {
  if (errorCount > 0) {
    console.error(`\n❌ Prerendering completed with ${errorCount} errors.`);
    process.exit(1);
  }
}).catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
