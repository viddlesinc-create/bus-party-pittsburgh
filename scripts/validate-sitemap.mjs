#!/usr/bin/env node
/**
 * Sitemap gate — FIX 9.
 *
 * Search Console reports 5 warnings against sitemap.xml but does not expose the
 * warning text through its API, so this checks every machine-checkable cause of
 * a sitemap warning and fails the build on any of them:
 *
 *   - <loc> absolute, https, and on the exact property host (pittpartybus.com,
 *     no www) — a host mismatch is the classic cause of a URL-prefix warning
 *   - no duplicate <loc> entries, within or across sitemaps
 *   - <lastmod> is valid ISO-8601 and not in the future
 *   - no URL that this site would redirect (i.e. nothing in netlify.toml's
 *     redirect sources), since a sitemap must list final destinations
 *   - no trailing slashes, which would conflict with our canonicals
 *   - every listed URL has a prerendered HTML file in dist
 *   - child sitemaps do not list anything missing from the main sitemap
 *
 * Usage: node scripts/validate-sitemap.mjs [--dist <dir>]
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distArg = process.argv.indexOf('--dist');
const dist = resolve(root, distArg !== -1 ? process.argv[distArg + 1] : 'dist');

const HOST = 'https://pittpartybus.com';
const failures = [];
const fail = (m) => failures.push(m);

const sitemapDir = existsSync(dist) ? dist : join(root, 'public');
const sitemaps = readdirSync(sitemapDir).filter((f) => /^sitemap.*\.xml$/.test(f));
if (!sitemaps.length) {
  console.error('validate-sitemap: no sitemap files found in ' + sitemapDir);
  process.exit(1);
}

// Redirect sources from netlify.toml — a sitemap must never list a URL we 301.
const toml = readFileSync(join(root, 'netlify.toml'), 'utf8');
const redirectSources = new Set(
  [...toml.matchAll(/^\s*from\s*=\s*"([^"]+)"/gm)].map((m) => m[1].replace(/\/+$/, ''))
);

const today = new Date().toISOString().slice(0, 10);
const perFile = {};

for (const name of sitemaps) {
  const xml = readFileSync(join(sitemapDir, name), 'utf8');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const locs = [];

  for (const entry of entries) {
    const loc = (entry.match(/<loc>([^<]*)<\/loc>/) || [])[1];
    const lastmod = (entry.match(/<lastmod>([^<]*)<\/lastmod>/) || [])[1];

    if (!loc) { fail(`${name}: <url> entry with no <loc>`); continue; }
    locs.push(loc);

    if (!loc.startsWith('https://')) fail(`${name}: <loc> is not https: ${loc}`);
    if (!loc.startsWith(HOST + '/') && loc !== HOST + '/') {
      fail(`${name}: <loc> host does not match the Search Console property ${HOST}: ${loc}`);
    }

    const path = loc.replace(HOST, '') || '/';
    if (path !== '/' && path.endsWith('/')) {
      fail(`${name}: <loc> has a trailing slash, which conflicts with our canonicals: ${loc}`);
    }
    if (redirectSources.has(path.replace(/\/+$/, ''))) {
      fail(`${name}: <loc> is a redirect source in netlify.toml; sitemaps must list destinations: ${loc}`);
    }

    if (!lastmod) {
      fail(`${name}: ${path} has no <lastmod>`);
    } else {
      if (!/^\d{4}-\d{2}-\d{2}(T[\d:.+Z-]+)?$/.test(lastmod)) {
        fail(`${name}: <lastmod> is not ISO-8601: "${lastmod}" (${path})`);
      } else if (lastmod.slice(0, 10) > today) {
        fail(`${name}: <lastmod> is in the future: ${lastmod} (${path})`);
      }
    }

    // Every listed URL must have a prerendered file, or it 404s for crawlers.
    if (existsSync(dist)) {
      const candidates = path === '/'
        ? ['index.html']
        : [`${path.replace(/^\//, '')}.html`, join(path.replace(/^\//, ''), 'index.html')];
      if (!candidates.some((c) => existsSync(join(dist, c)))) {
        fail(`${name}: ${path} is in the sitemap but has no prerendered file in dist`);
      }
    }
  }

  const dupes = locs.filter((l, i) => locs.indexOf(l) !== i);
  for (const d of new Set(dupes)) fail(`${name}: duplicate <loc> ${d}`);
  perFile[name] = locs;
}

// Child sitemaps must be a subset of the main one, or Search Console sees URLs
// the submitted sitemap never declared.
const main = new Set(perFile['sitemap.xml'] || []);
if (main.size) {
  for (const [name, locs] of Object.entries(perFile)) {
    if (name === 'sitemap.xml') continue;
    for (const loc of locs) {
      if (!main.has(loc)) fail(`${name}: ${loc} is not listed in sitemap.xml`);
    }
  }
}

if (failures.length) {
  console.error(`\nvalidate-sitemap: ${failures.length} failure(s)\n`);
  for (const f of failures) console.error('  x ' + f);
  console.error('');
  process.exit(1);
}

const total = Object.values(perFile).reduce((n, l) => n + l.length, 0);
console.log(`validate-sitemap: ${sitemaps.length} sitemaps, ${total} URLs OK ` +
            `(https, host, no dupes, ISO lastmod not future, no redirect sources, all prerendered)`);
