# True Runtime SSR Implementation Plan

## Executive Summary

Convert the current SSG (Static Site Generation) architecture to true runtime SSR with a Node/Express server, enabling dynamic server-side rendering on every request.

---

## Current State Analysis

| Component | Current Status | Target State |
|-----------|---------------|--------------|
| Rendering | SSG at build time | Runtime SSR per request |
| Server | None (static files) | Node/Express server |
| Router | Duplicated in 3 files | Single shared router |
| Data Fetching | Client-only | Server-first with hydration |
| State Serialization | None | `window.__INITIAL_DATA__` |
| Dev Mode | Client-only Vite | Vite SSR middleware |
| Production | Static file serving | Node SSR server |

---

## Phase 1: Centralized Router

### Files to Create

```
src/router.tsx          # Single source of truth for all routes
```

### Files to Modify

```
src/App.tsx             # Import routes from router.tsx
src/entry-client.tsx    # Import routes from router.tsx
```

### Files to Delete

```
scripts/prerender-with-meta.js  # No longer needed for runtime SSR
```

### Implementation Details

**src/router.tsx:**
```tsx
import { lazy } from 'react';

// Route configuration with SEO metadata and data loaders
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  loader?: () => Promise<unknown>;  // Server-side data fetcher
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
    meta: { title: '...', description: '...', canonical: '/' },
    loader: async () => ({ /* homepage data */ })
  },
  // ... all 21 routes defined once
];
```

---

## Phase 2: Node/Express Server

### Files to Create

```
server.ts               # Main Express server
server.dev.ts           # Development server with Vite middleware
server.prod.ts          # Production server using built bundles
```

### Implementation Details

**server.ts (Main Server):**
```ts
import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  let vite: ViteDevServer | null = null;

  if (!isProd) {
    // Development: Use Vite middleware
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static assets
    app.use('/assets', express.static('dist/client/assets'));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // 1. Load template
      let template = isProd
        ? fs.readFileSync('dist/client/index.html', 'utf-8')
        : fs.readFileSync('index.html', 'utf-8');

      if (!isProd) {
        template = await vite!.transformIndexHtml(url, template);
      }

      // 2. Load server entry
      const { render } = isProd
        ? await import('./dist/server/entry-server.js')
        : await vite!.ssrLoadModule('/src/entry-server.tsx');

      // 3. Render the app
      const { html, headTags, initialData } = await render(url);

      // 4. Inject into template
      const finalHtml = template
        .replace('<!--ssr-outlet-->', html)
        .replace('</head>', `${headTags}</head>`)
        .replace(
          '</body>',
          `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script></body>`
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      if (!isProd) vite?.ssrFixStacktrace(e as Error);
      console.error(e);
      res.status(500).end((e as Error).message);
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

createServer();
```

---

## Phase 3: Updated Entry Points

### src/entry-server.tsx (Enhanced)

```tsx
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { routes, matchRoute } from './router';
import App from './App';

export async function render(url: string) {
  // 1. Match route and get loader
  const matchedRoute = matchRoute(url);
  
  // 2. Execute server-side data loader
  const initialData = matchedRoute?.loader 
    ? await matchedRoute.loader() 
    : null;

  // 3. Create fresh state container per request
  const helmetContext = {};
  const dataContext = { data: initialData };

  // 4. Render to string
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <DataContext.Provider value={dataContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );

  // 5. Extract helmet data
  const { helmet } = helmetContext;

  return {
    html,
    headTags: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `,
    initialData
  };
}
```

### src/entry-client.tsx (Enhanced)

```tsx
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Retrieve server-injected data
const initialData = window.__INITIAL_DATA__ || null;

hydrateRoot(
  document.getElementById('root')!,
  <HelmetProvider>
    <DataContext.Provider value={{ data: initialData }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  </HelmetProvider>
);
```

---

## Phase 4: Data Fetching Layer

### Files to Create

```
src/lib/data-context.tsx    # Context for SSR data
src/lib/use-ssr-data.ts     # Hook to consume SSR data
src/loaders/index.ts        # Route data loaders
src/loaders/fleet.ts        # Fleet page loader example
```

### Implementation Details

**src/lib/data-context.tsx:**
```tsx
import { createContext, useContext } from 'react';

interface DataContextType {
  data: unknown;
}

export const DataContext = createContext<DataContextType>({ data: null });

export const useSSRData = <T,>(): T | null => {
  const context = useContext(DataContext);
  return context.data as T | null;
};
```

**src/loaders/fleet.ts:**
```tsx
export interface FleetData {
  vehicles: Vehicle[];
  featuredVehicle: Vehicle | null;
}

export async function loadFleetData(): Promise<FleetData> {
  // This runs on the server first, then hydrates on client
  // Can fetch from API, database, CMS, etc.
  return {
    vehicles: await fetchVehicles(),
    featuredVehicle: await fetchFeaturedVehicle()
  };
}
```

---

## Phase 5: Build & Scripts Configuration

### Package.json Scripts (Conceptual)

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr src/entry-server.tsx --outDir dist/server",
    "preview": "NODE_ENV=production node dist/server/server.js",
    "start": "NODE_ENV=production node dist/server/server.js"
  }
}
```

### Vite Config Updates

```ts
// vite.config.ts additions
export default defineConfig({
  // ... existing config
  
  ssr: {
    noExternal: ['react-helmet-async'],
    external: ['express']
  },
  
  build: {
    rollupOptions: {
      input: {
        client: 'src/entry-client.tsx',
        server: 'src/entry-server.tsx'
      }
    }
  }
});
```

---

## Phase 6: TypeScript Types

### Files to Create

```
src/types/ssr.d.ts          # SSR-specific type declarations
```

**src/types/ssr.d.ts:**
```ts
declare global {
  interface Window {
    __INITIAL_DATA__: unknown;
  }
}

export interface SSRContext {
  url: string;
  statusCode?: number;
  redirectUrl?: string;
}

export interface RenderResult {
  html: string;
  headTags: string;
  initialData: unknown;
  statusCode?: number;
}
```

---

## Phase 7: Dependencies Required

```bash
# New dependencies needed
npm install express compression serve-static
npm install -D @types/express tsx

# Replace react-helmet with async version
npm uninstall react-helmet
npm install react-helmet-async
```

---

## File Structure After Implementation

```
├── server.ts                    # Main SSR server
├── src/
│   ├── entry-client.tsx         # Client hydration entry
│   ├── entry-server.tsx         # Server render entry
│   ├── router.tsx               # Centralized route definitions
│   ├── App.tsx                  # Root component (simplified)
│   ├── lib/
│   │   ├── data-context.tsx     # SSR data context
│   │   └── use-ssr-data.ts      # Data consumption hook
│   ├── loaders/
│   │   ├── index.ts             # Loader exports
│   │   ├── fleet.ts             # Fleet page loader
│   │   └── blog.ts              # Blog loaders
│   └── types/
│       └── ssr.d.ts             # SSR type declarations
├── dist/
│   ├── client/                  # Built client assets
│   └── server/                  # Built server bundle
```

---

## Migration Checklist

### Phase 1: Router Centralization
- [ ] Create `src/router.tsx` with all route definitions
- [ ] Update `src/App.tsx` to use centralized routes
- [ ] Update `src/entry-client.tsx` to use centralized routes
- [ ] Remove route duplication

### Phase 2: Server Setup
- [ ] Install Express and dependencies
- [ ] Create `server.ts` with Vite middleware
- [ ] Configure development SSR mode
- [ ] Configure production SSR mode

### Phase 3: Entry Point Updates
- [ ] Replace `react-helmet` with `react-helmet-async`
- [ ] Update `entry-server.tsx` with data loading
- [ ] Update `entry-client.tsx` with hydration + data
- [ ] Add `window.__INITIAL_DATA__` serialization

### Phase 4: Data Layer
- [ ] Create DataContext for SSR data
- [ ] Create route loaders
- [ ] Wire loaders to router config
- [ ] Test hydration without mismatches

### Phase 5: Build Configuration
- [ ] Update `vite.config.ts` for dual builds
- [ ] Update NPM scripts
- [ ] Test development mode
- [ ] Test production build and serve

### Phase 6: Verification
- [ ] Verify `view-source:` shows full HTML
- [ ] Verify meta tags in initial HTML
- [ ] Verify no hydration mismatches
- [ ] Verify 404 pages are SSR'd
- [ ] Performance audit (FCP, TTI)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Hydration mismatches | Strict data serialization, avoid Date objects |
| Browser API usage | Audit all components for window/document refs |
| Memory leaks | Fresh state per request, no singletons |
| Build complexity | Clear separation of client/server bundles |
| Deployment changes | Document new hosting requirements |

---

## Hosting Considerations

**Current (SSG):** Can deploy to any static host (Netlify, Vercel static, S3, etc.)

**After (SSR):** Requires Node.js runtime:
- Vercel (with serverless functions)
- Railway
- Render
- DigitalOcean App Platform
- AWS ECS/Fargate
- Self-hosted VPS

---

## Estimated Implementation Time

| Phase | Estimated Time |
|-------|---------------|
| Phase 1: Router | 2-3 hours |
| Phase 2: Server | 3-4 hours |
| Phase 3: Entry Points | 2-3 hours |
| Phase 4: Data Layer | 3-4 hours |
| Phase 5: Build Config | 1-2 hours |
| Phase 6: Types | 1 hour |
| Phase 7: Testing | 2-3 hours |
| **Total** | **14-20 hours** |

---

## Next Steps

1. **Confirm hosting platform** - Determines build output requirements
2. **Prioritize phases** - Can implement incrementally
3. **Begin Phase 1** - Router centralization (lowest risk, immediate benefit)

Would you like me to begin implementation starting with Phase 1 (Router Centralization)?
