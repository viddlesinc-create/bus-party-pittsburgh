// scripts/prerender.cjs
//
// Renders every sitemap route to static HTML using the PRODUCTION SSR bundle
// (dist-server/entry-server.js, built by `vite build --ssr`). Do NOT render
// through a Vite dev server here: dev-mode asset imports resolve to
// /src/assets/... URLs which do not exist in a deployed build — that shipped
// broken images on every page that imports one.
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

// Routes are derived from public/sitemap.xml so the prerender list can never
// drift from what we tell crawlers exists. Every <loc> must render to a real
// HTML file — a missing route here means a 404 in production.
function routesFromSitemap() {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const xml = fs.readFileSync(sitemapPath, "utf-8");
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    throw new Error("No <loc> entries found in public/sitemap.xml");
  }
  const routes = locs.map((loc) => {
    const u = new URL(loc);
    return u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
  });
  return [...new Set(routes)];
}

// "/404" hits the router's catch-all (NotFound) and is written to dist/404.html,
// which Netlify serves automatically for unknown paths with a real 404 status.
const routes = [...routesFromSitemap(), "/404"];

async function prerender() {
  const root = process.cwd();
  const distDir = path.join(root, "dist");
  const templatePath = path.join(distDir, "index.html");

  console.log("\n🚀 Starting SSR prerendering (standalone script)...\n");

  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html not found. Run `vite build` first.");
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  if (!template.includes("<!--ssr-outlet-->")) {
    throw new Error("Template does not contain <!--ssr-outlet--> placeholder.");
  }

  const ssrEntryPath = path.join(root, "dist-server", "entry-server.js");
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(
      "dist-server/entry-server.js not found. Run `vite build --ssr src/entry-server.tsx --outDir dist-server` first (npm run prerender does both)."
    );
  }

  {
    const entryServer = await import(pathToFileURL(ssrEntryPath).href);

    if (!entryServer || typeof entryServer.render !== "function") {
      throw new Error("`render` function not found in dist-server/entry-server.js");
    }

    for (const route of routes) {
      console.log(`  Prerendering: ${route}`);

      // Our entry-server.tsx returns { html, headTags, initialData }
      const { html, headTags, initialData } = await entryServer.render(route, {});

      // Inject HTML into the SSR outlet
      let finalHtml = template.replace("<!--ssr-outlet-->", html);

      // When the page's Helmet emitted a real <title>, strip the template's
      // static title/description/OG/Twitter tags so every page ships exactly
      // one of each (duplicate titles were getting flagged by crawlers).
      // Verification tags (google-site-verification, msvalidate) are untouched.
      if (headTags && /<title[^>]*>[^<]+<\/title>/.test(headTags)) {
        finalHtml = finalHtml
          .replace(/^\s*<title>.*<\/title>\s*$/m, "")
          .replace(/^\s*<meta name="description"[^>]*>\s*$/m, "")
          .replace(/^\s*<meta name="robots"[^>]*>\s*$/m, "")
          .replace(/^\s*<meta property="og:(title|description|type)"[^>]*>\s*$/gm, "")
          .replace(/^\s*<meta name="twitter:(title|description|card)"[^>]*>\s*$/gm, "");
      }

      // Inject HEAD_TAGS
      if (headTags && headTags.length > 0) {
        if (finalHtml.includes("<!--HEAD_TAGS-->")) {
          finalHtml = finalHtml.replace("<!--HEAD_TAGS-->", headTags);
        } else {
          finalHtml = finalHtml.replace("</head>", `${headTags}\n</head>`);
        }
      }

      // Inject INITIAL_DATA
      if (initialData) {
        const dataScript = `<script>window.__SSR_DATA__=${initialData}</script>`;
        if (finalHtml.includes("<!--INITIAL_DATA-->")) {
          finalHtml = finalHtml.replace("<!--INITIAL_DATA-->", dataScript);
        } else {
          finalHtml = finalHtml.replace("</body>", `${dataScript}\n</body>`);
        }
      }

      // Sanity check
      if (finalHtml.includes("<!--ssr-outlet-->")) {
        throw new Error(`Failed to replace <!--ssr-outlet--> for route "${route}"`);
      }

      // Determine output path
      let filePath;
      if (route === "/") {
        filePath = path.join(distDir, "index.html");
      } else {
        const routePath = route.slice(1); // remove leading slash
        filePath = path.join(distDir, `${routePath}.html`);
      }

      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, finalHtml, "utf-8");
      console.log(`  ✅ Written: ${filePath}`);
    }

    console.log("\n✅ SSR prerendering complete!\n");
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});