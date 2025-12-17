// scripts/prerender.cjs
const fs = require("fs");
const path = require("path");
const { createServer } = require("vite");

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

  const vite = await createServer({
    root,
    server: { middlewareMode: "ssr" },
    appType: "custom"
  });

  try {
    const entryServer = await vite.ssrLoadModule("/src/entry-server.tsx");

    if (!entryServer || typeof entryServer.render !== "function") {
      throw new Error("`render` function not found in /src/entry-server.tsx");
    }

    for (const route of routes) {
      console.log(`  Prerendering: ${route}`);

      // Our entry-server.tsx returns { html, headTags, initialData }
      const { html, headTags, initialData } = await entryServer.render(route, {});

      // Inject HTML into the SSR outlet
      let finalHtml = template.replace("<!--ssr-outlet-->", html);

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
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});