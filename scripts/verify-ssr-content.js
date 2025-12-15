#!/usr/bin/env node
/**
 * SSR Content Verification Script
 * 
 * This script verifies that the production SSR server renders full HTML content
 * inside <div id="root">, not just the placeholder <!--ssr-outlet-->.
 * 
 * Usage: npm run verify-ssr-content
 * 
 * Prerequisites: Run `npm run build` first to create the production bundles.
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const PORT = 3001; // Use different port to avoid conflicts
const STARTUP_DELAY = 3000; // Wait for server to start
const ROUTES_TO_TEST = ['/', '/fleet', '/blog', '/contact'];

// ANSI colors
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;

async function fetchHTML(url) {
  const response = await fetch(url);
  return response.text();
}

function checkSSRContent(html, route) {
  const results = {
    route,
    passed: true,
    checks: [],
  };

  // Check 1: No <!--ssr-outlet--> placeholder
  if (html.includes('<!--ssr-outlet-->')) {
    results.checks.push({ name: 'No SSR placeholder', passed: false, detail: 'Found <!--ssr-outlet--> - SSR not running' });
    results.passed = false;
  } else {
    results.checks.push({ name: 'No SSR placeholder', passed: true });
  }

  // Check 2: Has content inside #root
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
  if (rootMatch) {
    const rootContent = rootMatch[1].trim();
    if (rootContent.length > 100) {
      results.checks.push({ name: 'Root has content', passed: true, detail: `${rootContent.length} chars` });
    } else {
      results.checks.push({ name: 'Root has content', passed: false, detail: `Only ${rootContent.length} chars` });
      results.passed = false;
    }
  } else {
    results.checks.push({ name: 'Root has content', passed: false, detail: 'Could not find #root content' });
    results.passed = false;
  }

  // Check 3: Has <h1> tag (main heading)
  if (html.includes('<h1')) {
    results.checks.push({ name: 'Has H1 tag', passed: true });
  } else {
    results.checks.push({ name: 'Has H1 tag', passed: false });
    results.passed = false;
  }

  // Check 4: Has navigation
  if (html.includes('<nav') || html.includes('class="nav')) {
    results.checks.push({ name: 'Has navigation', passed: true });
  } else {
    results.checks.push({ name: 'Has navigation', passed: false });
    results.passed = false;
  }

  // Check 5: Has __INITIAL_DATA__
  if (html.includes('window.__INITIAL_DATA__')) {
    results.checks.push({ name: 'Has initial data', passed: true });
  } else {
    results.checks.push({ name: 'Has initial data', passed: false, detail: 'Hydration may re-fetch' });
  }

  return results;
}

async function runVerification() {
  console.log('\n' + '═'.repeat(60));
  console.log(cyan('  SSR Content Verification'));
  console.log('═'.repeat(60) + '\n');

  // Check build exists
  const serverBundle = resolve(root, 'dist/server/entry-server.js');
  const clientDir = resolve(root, 'dist/client');
  
  if (!existsSync(serverBundle) || !existsSync(clientDir)) {
    console.log(red('✗ Build not found. Run `npm run build` first.\n'));
    process.exit(1);
  }

  console.log(yellow('Starting production server on port ' + PORT + '...\n'));

  // Start the server
  const server = spawn('node', ['--import', 'tsx', 'server.ts'], {
    cwd: root,
    env: { ...process.env, NODE_ENV: 'production', PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  server.stdout.on('data', (data) => {
    serverOutput += data.toString();
  });
  server.stderr.on('data', (data) => {
    serverOutput += data.toString();
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, STARTUP_DELAY));

  let allPassed = true;

  try {
    for (const route of ROUTES_TO_TEST) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(cyan(`Testing ${route}...`));
      
      try {
        const html = await fetchHTML(url);
        const results = checkSSRContent(html, route);
        
        if (results.passed) {
          console.log(green(`  ✓ ${route} - All checks passed`));
        } else {
          console.log(red(`  ✗ ${route} - Some checks failed`));
          allPassed = false;
        }
        
        for (const check of results.checks) {
          const icon = check.passed ? green('✓') : red('✗');
          const detail = check.detail ? ` (${check.detail})` : '';
          console.log(`    ${icon} ${check.name}${detail}`);
        }
        console.log('');
      } catch (error) {
        console.log(red(`  ✗ ${route} - Failed to fetch: ${error.message}`));
        allPassed = false;
      }
    }
  } finally {
    // Kill the server
    server.kill('SIGTERM');
  }

  console.log('═'.repeat(60));
  if (allPassed) {
    console.log(green('\n✓ SSR verification passed! All routes render full HTML.\n'));
    process.exit(0);
  } else {
    console.log(red('\n✗ SSR verification failed. Check the results above.\n'));
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error(red('Verification error:'), err);
  process.exit(1);
});
