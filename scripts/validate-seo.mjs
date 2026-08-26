#!/usr/bin/env node
/**
 * SEO acceptance gate. Runs against dist/ — the artifact Netlify actually
 * publishes — and exits non-zero on any failure, so a regression cannot deploy.
 *
 * This exists because every problem it checks for was live in production at
 * some point: titles drifting past 60 characters, a 404 page declaring itself
 * indexable, schema pointing at images that 404, FAQ markup for questions that
 * appeared nowhere on the page, and review markup nobody could substantiate.
 *
 * Usage: node scripts/validate-seo.mjs [--dist <dir>]
 */
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distArg = process.argv.indexOf('--dist');
const dist = resolve(root, distArg !== -1 ? process.argv[distArg + 1] : 'dist');

const TITLE_MIN = 50, TITLE_MAX = 60;
const DESC_MIN = 140, DESC_MAX = 160;
const FAQ_MIN = 100, FAQ_MAX = 200;

/**
 * Every hourly figure the site is allowed to state.
 *
 * The site once told six different price stories at the same time — $150-$250 in
 * schema, $100-$175 in business-info, $100-$200 in the pricing loader, "$115" in
 * the /pricing H1, "$" on /testimonials, and a $100/$125-150/$175 rate table on
 * a blog post. This gate is what stops a seventh appearing.
 *
 * 150/175/200/250 are the per-vehicle rates on /pricing. 50 is the waiting-time
 * fee, which is also quoted per hour and is not a vehicle rate.
 */
const ALLOWED_HOURLY = new Set([150, 175, 200, 250, 50]);

/**
 * Largest vehicle we actually operate.
 *
 * /pricing sold a "Luxury Party Bus (35-40)" tier and eight other places quoted
 * capacities up to 40, but the biggest bus on /fleet seats 30 — and the operator
 * behind this brand publishes the same 30-passenger ceiling. Same defect class as
 * the price drift: a plausible number, contradicting the fleet, unnoticed for
 * months. This bounds it.
 */
const MAX_CAPACITY = 30;

const failures = [];
const warnings = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

/** Decode the entities Helmet emits, so lengths are counted in real characters. */
const decode = (s) =>
  s.replace(/&amp;/g, '&')
   .replace(/&#x27;/gi, "'").replace(/&#39;/g, "'")
   .replace(/&quot;/g, '"').replace(/&#x2F;/gi, '/')
   .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&rsquo;/g, '’').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
   .replace(/&nbsp;/g, ' ');

const words = (s) => (s.trim().match(/\S+/g) || []).length;

if (!existsSync(dist)) {
  console.error(`validate-seo: ${dist} does not exist — run the build first.`);
  process.exit(1);
}

const files = execSync(`find "${dist}" -name '*.html'`).toString().trim().split('\n').filter(Boolean);
if (!files.length) {
  console.error('validate-seo: no HTML files found in dist.');
  process.exit(1);
}

const seenTitles = new Map();
const seenDescs = new Map();

for (const abs of files) {
  const file = abs.replace(dist, '') || '/index.html';
  const html = readFileSync(abs, 'utf8');
  const is404 = file === '/404.html';

  // --- title ---
  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/g)].map((m) => decode(m[1].trim()));
  if (titles.length !== 1) fail(file, `expected exactly 1 <title>, found ${titles.length}`);
  if (titles[0]) {
    const n = titles[0].length;
    if (n < TITLE_MIN || n > TITLE_MAX) fail(file, `title is ${n} chars, want ${TITLE_MIN}-${TITLE_MAX}: "${titles[0]}"`);
    if (seenTitles.has(titles[0])) fail(file, `duplicate title, also on ${seenTitles.get(titles[0])}`);
    else seenTitles.set(titles[0], file);
  }

  // --- description ---
  const descs = [...html.matchAll(/<meta[^>]+name="description"[^>]*content="([^"]*)"/g)].map((m) => decode(m[1]));
  if (descs.length !== 1) fail(file, `expected exactly 1 meta description, found ${descs.length}`);
  if (descs[0]) {
    const n = descs[0].length;
    if (n < DESC_MIN || n > DESC_MAX) fail(file, `description is ${n} chars, want ${DESC_MIN}-${DESC_MAX}`);
    if (seenDescs.has(descs[0])) fail(file, `duplicate description, also on ${seenDescs.get(descs[0])}`);
    else seenDescs.set(descs[0], file);
  }

  // --- robots: exactly one tag, and the 404 must not invite indexing ---
  const robots = [...html.matchAll(/<meta[^>]+name="robots"[^>]*content="([^"]*)"/g)].map((m) => m[1]);
  if (robots.length !== 1) fail(file, `expected exactly 1 robots meta, found ${robots.length}`);
  if (is404 && robots[0] && !/noindex/.test(robots[0])) {
    fail(file, `404 page must be noindex, got "${robots[0]}" (retired URLs land here)`);
  }
  if (!is404 && robots[0] && /noindex/.test(robots[0])) {
    fail(file, `page is noindex but is not the 404 page: "${robots[0]}"`);
  }

  // --- canonical ---
  const canon = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/g)].map((m) => m[1]);
  if (canon.length !== 1) fail(file, `expected exactly 1 canonical, found ${canon.length}`);
  if (canon[0] && !canon[0].startsWith('https://pittpartybus.com')) {
    fail(file, `canonical is not an absolute pittpartybus.com URL: ${canon[0]}`);
  }
  if (canon[0] && canon[0] !== 'https://pittpartybus.com/' && canon[0].endsWith('/')) {
    fail(file, `canonical has a trailing slash: ${canon[0]}`);
  }

  // --- exactly one H1 ---
  const h1 = [...html.matchAll(/<h1[^>]*>/g)];
  if (h1.length !== 1) fail(file, `expected exactly 1 <h1>, found ${h1.length}`);

  // --- structured data ---
  const visible = decode(
    html.replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
  );

  const nodes = [];
  for (const m of html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (e) {
      fail(file, `invalid JSON-LD: ${e.message}`);
      continue;
    }
    nodes.push(...(parsed['@graph'] ? parsed['@graph'] : [parsed]));
  }

  const walk = (o, visit) => {
    if (Array.isArray(o)) return o.forEach((x) => walk(x, visit));
    if (o && typeof o === 'object') { visit(o); Object.values(o).forEach((v) => walk(v, visit)); }
  };

  for (const node of nodes) {
    walk(node, (o) => {
      // Review markup the business cannot substantiate — see StructuredData.tsx.
      if (o.aggregateRating) fail(file, 'aggregateRating found in JSON-LD; reviews must come from a verifiable source');
      if (o['@type'] === 'Review') fail(file, 'self-authored Review found in JSON-LD');

      // Image and logo URLs that 404 are worse than absent ones.
      for (const key of ['url', 'contentUrl']) {
        const v = o[key];
        if (typeof v !== 'string') continue;
        if (!/\.(png|jpe?g|webp|svg|gif)$/i.test(v)) continue;
        const path = v.replace('https://pittpartybus.com', '');
        if (!existsSync(join(dist, path))) fail(file, `JSON-LD image does not exist in dist: ${v}`);
      }
    });

    // FAQ answers must be substantial AND actually appear on the page.
    if (node['@type'] === 'FAQPage') {
      for (const q of node.mainEntity || []) {
        const text = q.acceptedAnswer?.text || '';
        const n = words(text);
        if (n < FAQ_MIN || n > FAQ_MAX) fail(file, `FAQ answer is ${n} words, want ${FAQ_MIN}-${FAQ_MAX}: "${q.name}"`);
        if (!visible.includes(q.name.slice(0, 45))) {
          fail(file, `FAQ question is in the markup but not visible on the page: "${q.name}"`);
        }
      }
    }
  }

  const types = new Set(nodes.map((n) => (Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type'])));

  // Breadcrumbs on every route except the homepage (which is position 1) and 404.
  if (file !== '/index.html' && !is404 && !types.has('BreadcrumbList')) {
    fail(file, 'missing BreadcrumbList');
  }
  // Blog posts carry BlogPosting with the fields Google's article guidance wants.
  if (file.startsWith('/blog/')) {
    const post = nodes.find((n) => n['@type'] === 'BlogPosting');
    if (!post) fail(file, 'blog post missing BlogPosting schema');
    else {
      for (const k of ['headline', 'description', 'image', 'datePublished', 'dateModified', 'mainEntityOfPage', 'author', 'publisher']) {
        if (!post[k]) fail(file, `BlogPosting missing ${k}`);
      }
      const id = post.mainEntityOfPage?.['@id'];
      const expected = `https://pittpartybus.com${file.replace(/\.html$/, '')}`;
      if (id && id !== expected) fail(file, `BlogPosting mainEntityOfPage is ${id}, expected ${expected}`);
    }
    if (!/Last updated:/.test(visible)) fail(file, 'blog post missing a visible "Last updated:" line');
  }

  // "Last updated" on the page types where freshness is a ranking input.
  const needsFreshness = /^\/(fleet|pricing|events|about|faqs|locations|contact|testimonials)\.html$/.test(file)
    || file.startsWith('/locations/');
  if (needsFreshness && !/Last updated:/.test(visible)) {
    fail(file, 'missing a visible "Last updated:" line');
  }

  // Real tables on the pages where tabular facts get extracted.
  if (/^\/(fleet|pricing|events)\.html$/.test(file)) {
    if (!/<table/.test(html)) fail(file, 'expected a real <table> for extractability');
    else if (!/<caption/.test(html)) fail(file, '<table> is missing a <caption>');
  }

  // Any dollar figure quoted per hour must be one we actually charge.
  for (const m of visible.matchAll(/\$\s?([\d,]+)(?:\s*(?:-|–|—|to)\s*\$?\s?([\d,]+))?\s*(?:\/|\s+per\s+|\s+an\s+|\s+a\s+)hour/gi)) {
    for (const raw of [m[1], m[2]]) {
      if (!raw) continue;
      const n = Number(raw.replace(/,/g, ''));
      if (!ALLOWED_HOURLY.has(n)) {
        fail(file, `states ${n}/hour, which is not a rate we charge (allowed: ${[...ALLOWED_HOURLY].sort((a, b) => a - b).join(', ')}) — context: "${m[0]}"`);
      }
    }
  }

  // No page may advertise a vehicle larger than the one we operate.
  for (const m of visible.matchAll(/(\d{1,3})\s*(?:-|–|—|to)\s*(\d{1,3})\s*(?:passenger|people|guests)/gi)) {
    const top = Number(m[2]);
    if (top > MAX_CAPACITY) {
      fail(file, `advertises up to ${top} passengers; the largest vehicle seats ${MAX_CAPACITY} — context: "${m[0]}"`);
    }
  }

  // "$150+" style rate floors are the other way a price story gets told. They
  // carry no "/hour", so the hourly check above cannot see them — the homepage
  // ran a whole $100+/$125+/$150+/$175+ ladder against /pricing's $150-$250.
  // The negative lookahead skips costs that are plainly not ours — parking,
  // tickets, gratuity, tax, per-person splits — so only our own rate floors
  // are checked.
  const NOT_OUR_COST = /^\s*(parking|fee|fees|ticket|tickets|cover|tip|tips|gratuity|tax|taxes|per person|per head|deposit|damage)/i;
  for (const m of visible.matchAll(/\$\s?([\d,]+)\s?\+/g)) {
    const trailing = visible.slice(m.index + m[0].length, m.index + m[0].length + 24);
    if (NOT_OUR_COST.test(trailing)) continue;
    const n = Number(m[1].replace(/,/g, ''));
    if (!ALLOWED_HOURLY.has(n)) {
      fail(file, `states a "${m[0]}" rate floor, which is not a rate we charge — followed by: "${trailing.trim().slice(0, 30)}"`);
    }
  }

  // A placeholder must never reach a customer-facing page. Outstanding owner
  // facts are tracked from the source instead (see the TODO(owner) sweep below).
  if (/\{TODO[:\s]/.test(visible)) fail(file, 'a TODO placeholder is rendered in visible page content');
}

// Outstanding owner-supplied facts. These are warnings, not failures: the pages
// render correctly without them, but they should not be quietly forgotten.
for (const src of ['src/data/experience.ts', 'src/pages/About.tsx', 'src/lib/business-info.ts']) {
  const abs = resolve(root, src);
  if (!existsSync(abs)) continue;
  const text = readFileSync(abs, 'utf8');
  for (const m of text.matchAll(/TODO\(owner\):\s*([^\n]*(?:\n\s*\*\s+[^\n]*)*)/g)) {
    warn(src, 'owner input outstanding — ' + m[1].replace(/\n\s*\*\s*/g, ' ').trim());
  }
}
if (!/confirmed:\s*true/.test(readFileSync(resolve(root, 'src/lib/business-info.ts'), 'utf8'))) {
  warn('src/lib/business-info.ts', 'no named blog author confirmed; BlogPosting.author stays an Organization');
}

if (warnings.length) {
  console.log('\nvalidate-seo warnings:');
  for (const w of warnings) console.log('  ! ' + w);
}

if (failures.length) {
  console.error(`\nvalidate-seo: ${failures.length} failure(s) across ${files.length} pages\n`);
  for (const f of failures) console.error('  x ' + f);
  console.error('');
  process.exit(1);
}

console.log(`\nvalidate-seo: ${files.length} pages OK (titles, descriptions, robots, canonicals, H1, schema, FAQ, tables)`);
