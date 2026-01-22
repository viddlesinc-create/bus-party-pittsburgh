import { ComponentType, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { LoaderFunction, LoaderContext, createLoaderContext, executeLoader } from "./lib/loader";

// Critical page imports (loaded immediately)
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";

// Lazy-loaded pages (code splitting for better performance)
const Events = lazy(() => import("./pages/Events"));
const Locations = lazy(() => import("./pages/Locations"));
const NorthHills = lazy(() => import("./pages/locations/NorthHills"));
const SouthHills = lazy(() => import("./pages/locations/SouthHills"));
const Downtown = lazy(() => import("./pages/locations/Downtown"));
const SouthSide = lazy(() => import("./pages/locations/SouthSide"));
const Oakland = lazy(() => import("./pages/locations/Oakland"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Blog = lazy(() => import("./pages/Blog"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

// Lazy-loaded blog posts
const PartyBusPricingGuide = lazy(() => import("./pages/blog/PartyBusPricingGuide"));
const TopEventsPittsburgh = lazy(() => import("./pages/blog/TopEventsPittsburgh"));
const PartyBusVsLimo = lazy(() => import("./pages/blog/PartyBusVsLimo"));
const BachelorBacheloretteIdeas = lazy(() => import("./pages/blog/BachelorBacheloretteIdeas"));
const WeddingTransportation = lazy(() => import("./pages/blog/WeddingTransportation"));
const CorporateEventTransportation = lazy(() => import("./pages/blog/CorporateEventTransportation"));
const ConcertPartyBus = lazy(() => import("./pages/blog/ConcertPartyBus"));
const PromTransportationSafety = lazy(() => import("./pages/blog/PromTransportationSafety"));
const PartyBusSafetyTips = lazy(() => import("./pages/blog/PartyBusSafetyTips"));
const AccuratePartyBusEstimate = lazy(() => import("./pages/blog/AccuratePartyBusEstimate"));
const PartyBusesNearMe = lazy(() => import("./pages/blog/PartyBusesNearMe"));

// Loader imports
import { homepageLoader } from "./loaders/homepage";
import { fleetLoader } from "./loaders/fleet";
import { blogListLoader, blogPostLoader } from "./loaders/blog";
import {
  eventsLoader,
  locationsLoader,
  pricingLoader,
  contactLoader,
  faqsLoader,
  testimonialsLoader,
  privacyLoader,
  termsLoader,
} from "./loaders/pages";

// Route configuration interface
export interface RouteConfig {
  path: string;
  component: ComponentType;
  loader?: LoaderFunction;
  isLazy?: boolean;
}

// Single source of truth for all routes
// Critical routes (homepage, fleet, contact) loaded eagerly, others lazy-loaded
export const routes: RouteConfig[] = [
  { path: "/", component: Index, loader: homepageLoader, isLazy: false },
  { path: "/fleet", component: Fleet, loader: fleetLoader, isLazy: false },
  { path: "/contact", component: Contact, loader: contactLoader, isLazy: false },
  { path: "/events", component: Events, loader: eventsLoader, isLazy: true },
  { path: "/locations", component: Locations, loader: locationsLoader, isLazy: true },
  { path: "/locations/north-hills", component: NorthHills, isLazy: true },
  { path: "/locations/south-hills", component: SouthHills, isLazy: true },
  { path: "/locations/downtown", component: Downtown, isLazy: true },
  { path: "/locations/south-side", component: SouthSide, isLazy: true },
  { path: "/locations/oakland", component: Oakland, isLazy: true },
  { path: "/pricing", component: Pricing, loader: pricingLoader, isLazy: true },
  { path: "/faqs", component: FAQs, loader: faqsLoader, isLazy: true },
  { path: "/blog", component: Blog, loader: blogListLoader, isLazy: true },
  { path: "/blog/party-bus-pricing-guide", component: PartyBusPricingGuide, loader: blogPostLoader, isLazy: true },
  { path: "/blog/top-events-pittsburgh", component: TopEventsPittsburgh, loader: blogPostLoader, isLazy: true },
  { path: "/blog/party-bus-vs-limo", component: PartyBusVsLimo, loader: blogPostLoader, isLazy: true },
  { path: "/blog/bachelor-bachelorette-ideas", component: BachelorBacheloretteIdeas, loader: blogPostLoader, isLazy: true },
  { path: "/blog/wedding-transportation", component: WeddingTransportation, loader: blogPostLoader, isLazy: true },
  { path: "/blog/corporate-event-transportation", component: CorporateEventTransportation, loader: blogPostLoader, isLazy: true },
  { path: "/blog/concert-party-bus", component: ConcertPartyBus, loader: blogPostLoader, isLazy: true },
  { path: "/blog/prom-transportation-safety", component: PromTransportationSafety, loader: blogPostLoader, isLazy: true },
  { path: "/blog/party-bus-safety-tips", component: PartyBusSafetyTips, loader: blogPostLoader, isLazy: true },
  { path: "/blog/accurate-party-bus-estimate", component: AccuratePartyBusEstimate, loader: blogPostLoader, isLazy: true },
  { path: "/blog/party-buses-near-me", component: PartyBusesNearMe, loader: blogPostLoader, isLazy: true },
  { path: "/testimonials", component: Testimonials, loader: testimonialsLoader, isLazy: true },
  { path: "/privacy", component: Privacy, loader: privacyLoader, isLazy: true },
  { path: "/terms", component: Terms, loader: termsLoader, isLazy: true },
];

// 404 route - kept separate for special handling
export const notFoundRoute: RouteConfig = {
  path: "*",
  component: NotFound,
  isLazy: true,
};

// Loading fallback for lazy components
const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

// Helper to render all routes as Route elements with Suspense for lazy components
export function renderRoutes() {
  return (
    <>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isLazy ? (
              <Suspense fallback={<LazyFallback />}>
                <route.component />
              </Suspense>
            ) : (
              <route.component />
            )
          }
        />
      ))}
      <Route
        path={notFoundRoute.path}
        element={
          <Suspense fallback={<LazyFallback />}>
            <notFoundRoute.component />
          </Suspense>
        }
      />
    </>
  );
}

// Helper to match a URL to a route config (for SSR)
export function matchRoute(url: string): RouteConfig | null {
  const pathname = url.split("?")[0].split("#")[0];
  const exactMatch = routes.find((route) => route.path === pathname);
  return exactMatch || null;
}

// Execute loader for a matched route
export async function loadRouteData(url: string): Promise<unknown> {
  const route = matchRoute(url);
  if (!route?.loader) return null;

  const context: LoaderContext = createLoaderContext(url);
  return executeLoader(route.loader, context);
}

// Export all route paths for sitemap generation
export const allRoutePaths = routes.map((r) => r.path);

// Re-export loader utilities
export { createLoaderContext, executeLoader };
