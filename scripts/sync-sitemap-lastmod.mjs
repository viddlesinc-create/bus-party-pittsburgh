#!/usr/bin/env node
/**
 * Rewrites <lastmod> in the published sitemaps so it agrees with each page's
 * own dateModified and its visible "Last updated" line.
 *
 * Before this, every URL carried a hard-coded 2026-03-27 while /fleet displayed
 * "Last updated: May 19, 2026" and declared dateModified 2026-05-19. A lastmod
 * that contradicts the page it points at is one of the things Search Console
 * flags, and it teaches crawlers to ignore the field.
 *
 * Operates on dist/ only — public/sitemap.xml stays the source of the prerender
 * route list and is left untouched.
 *
 * Usage: node scripts/sync-sitemap-lastmod.mjs [--dist <dir>]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distArg = process.argv.indexOf('--dist');
const dist = resolve(root, distArg !== -1 ? process.argv[distArg + 1] : 'dist');

if (!existsSync(dist)) {
  console.error('sync-sitemap-lastmod: dist does not exist — run the build first.');
  process.exit(1);
}

// Read the generated map as data rather than importing TypeScript.
const generated = readFileSync(resolve(root, 'src/lib/last-updated.generated.ts'), 'utf8');
const jsonStart = generated.indexOf('{', generated.indexOf('LAST_UPDATED'));
const jsonEnd = generated.indexOf('};', jsonStart);
const LAST_UPDATED = JSON.parse(generated.slice(jsonStart, jsonEnd + 1));

const HOST = 'https://pittpartybus.com';
let changed = 0, missing = 0;

for (const name of readdirSync(dist).filter((f) => /^sitemap.*\.xml$/.test(f))) {
  const path = join(dist, name);
  const updated = readFileSync(path, 'utf8').replace(
    /<url>([\s\S]*?)<\/url>/g,
    (block) => {
      const loc = (block.match(/<loc>([^<]*)<\/loc>/) || [])[1];
      if (!loc) return block;
      const route = loc.replace(HOST, '') || '/';
      const date = LAST_UPDATED[route === '/' ? '/' : route.replace(/\/+$/, '')];
      if (!date) { missing++; return block; }
      return block.replace(/<lastmod>[^<]*<\/lastmod>/, () => { changed++; return `<lastmod>${date}</lastmod>`; });
    }
  );
  writeFileSync(path, updated);
}

console.log(`sync-sitemap-lastmod: ${changed} lastmod values synced to page dateModified` +
            (missing ? `, ${missing} URL(s) had no generated date (left as-is)` : ''));
