import type { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { createServer } from "vite";

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
  "/blog/accurate-party-bus-estimate",
];

export function prerenderPlugin(): Plugin {
  return {
    name: "pittpartybus-prerender",
    apply: "build",
    enforce: "post",

    async closeBundle() {
      console.log("\n🚀 Starting SSR prerendering...\n");

      const root = process.cwd();
      const distDir = path.join(root, "dist");
      const templatePath = path.join(distDir, "index.html");

      // 1) Ensure dist/index.html exists
      if (!fs.existsSync(templatePath)) {
        throw new Error("dist/index.html not found. Vite build must complete first.");
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      // 2) Ensure template has the SSR placeholder
      if (!template.includes("<!--ssr-outlet-->")) {
        throw new Error("Template does not contain <!--ssr-outlet--> placeholder.");
      }

      // 3) Use Vite in SSR mode to load entry-server.tsx
      const vite = await createServer({
        root,
        server: { middlewareMode: "ssr" },
        appType: "custom",
      });

      try {
        const entryServer: any = await vite.ssrLoadModule("/src/entry-server.tsx");

        if (!entryServer || typeof entryServer.render !== "function") {
          throw new Error("pittpartybus-prerender: `render` function not found in /src/entry-server.tsx");
        }

        for (const route of routes) {
          console.log(`  Prerendering: ${route}`);

          // Our entry-server.tsx returns { html, headTags, initialData }
          const { html, headTags, initialData } = await entryServer.render(route, {});

          // Replace SSR placeholder with rendered HTML
          let finalHtml = template.replace("<!--ssr-outlet-->", html);

          // Inject Helmet tags
          if (headTags && headTags.length > 0) {
            if (finalHtml.includes("<!--HEAD_TAGS-->")) {
              finalHtml = finalHtml.replace("<!--HEAD_TAGS-->", headTags);
            } else {
              finalHtml = finalHtml.replace("</head>", `${headTags}\n</head>`);
            }
          }

          // Inject initial data for hydration
          if (initialData) {
            const dataScript = `<script>window.__SSR_DATA__=${initialData}</script>`;

            if (finalHtml.includes("<!--INITIAL_DATA-->")) {
              finalHtml = finalHtml.replace("<!--INITIAL_DATA-->", dataScript);
            } else {
              finalHtml = finalHtml.replace("</body>", `${dataScript}\n</body>`);
            }
          }

          // CRITICAL: Verify placeholder was replaced
          if (finalHtml.includes("<!--ssr-outlet-->")) {
            throw new Error(`Failed to replace <!--ssr-outlet--> for route "${route}"`);
          }

          // Determine output path
          let filePath: string;
          if (route === "/") {
            filePath = path.join(distDir, "index.html");
          } else {
            // dist/fleet.html, dist/blog/party-bus-pricing-guide.html, etc.
            const routePath = route.slice(1); // Remove leading slash
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
    },
  };
}
