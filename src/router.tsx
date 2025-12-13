import { ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { LoaderFunction, LoaderContext, createLoaderContext, executeLoader } from './lib/loader';

// Page imports
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import PartyBusPricingGuide from "./pages/blog/PartyBusPricingGuide";
import TopEventsPittsburgh from "./pages/blog/TopEventsPittsburgh";
import PartyBusVsLimo from "./pages/blog/PartyBusVsLimo";
import BachelorBacheloretteIdeas from "./pages/blog/BachelorBacheloretteIdeas";
import WeddingTransportation from "./pages/blog/WeddingTransportation";
import CorporateEventTransportation from "./pages/blog/CorporateEventTransportation";
import ConcertPartyBus from "./pages/blog/ConcertPartyBus";
import PromTransportationSafety from "./pages/blog/PromTransportationSafety";
import PartyBusSafetyTips from "./pages/blog/PartyBusSafetyTips";
import AccuratePartyBusEstimate from "./pages/blog/AccuratePartyBusEstimate";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Loader imports
import { homepageLoader } from "./loaders/homepage";
import { fleetLoader } from "./loaders/fleet";
import { blogListLoader, blogPostLoader } from "./loaders/blog";

// Route configuration interface
export interface RouteConfig {
  path: string;
  component: ComponentType;
  loader?: LoaderFunction;
}

// Single source of truth for all routes
export const routes: RouteConfig[] = [
  { path: "/", component: Index, loader: homepageLoader },
  { path: "/fleet", component: Fleet, loader: fleetLoader },
  { path: "/events", component: Events },
  { path: "/locations", component: Locations },
  { path: "/pricing", component: Pricing },
  { path: "/contact", component: Contact },
  { path: "/faqs", component: FAQs },
  { path: "/blog", component: Blog, loader: blogListLoader },
  { path: "/blog/party-bus-pricing-guide", component: PartyBusPricingGuide, loader: blogPostLoader },
  { path: "/blog/top-events-pittsburgh", component: TopEventsPittsburgh, loader: blogPostLoader },
  { path: "/blog/party-bus-vs-limo", component: PartyBusVsLimo, loader: blogPostLoader },
  { path: "/blog/bachelor-bachelorette-ideas", component: BachelorBacheloretteIdeas, loader: blogPostLoader },
  { path: "/blog/wedding-transportation", component: WeddingTransportation, loader: blogPostLoader },
  { path: "/blog/corporate-event-transportation", component: CorporateEventTransportation, loader: blogPostLoader },
  { path: "/blog/concert-party-bus", component: ConcertPartyBus, loader: blogPostLoader },
  { path: "/blog/prom-transportation-safety", component: PromTransportationSafety, loader: blogPostLoader },
  { path: "/blog/party-bus-safety-tips", component: PartyBusSafetyTips, loader: blogPostLoader },
  { path: "/blog/accurate-party-bus-estimate", component: AccuratePartyBusEstimate, loader: blogPostLoader },
  { path: "/testimonials", component: Testimonials },
  { path: "/privacy", component: Privacy },
  { path: "/terms", component: Terms },
];

// 404 route - kept separate for special handling
export const notFoundRoute: RouteConfig = {
  path: "*",
  component: NotFound,
};

// Helper to render all routes as Route elements
export function renderRoutes() {
  return (
    <>
      {routes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={<route.component />} 
        />
      ))}
      <Route path={notFoundRoute.path} element={<notFoundRoute.component />} />
    </>
  );
}

// Helper to match a URL to a route config (for SSR)
export function matchRoute(url: string): RouteConfig | null {
  // Normalize URL
  const pathname = url.split('?')[0].split('#')[0];
  
  // Find exact match first
  const exactMatch = routes.find(route => route.path === pathname);
  if (exactMatch) return exactMatch;
  
  // No match found
  return null;
}

// Execute loader for a matched route
export async function loadRouteData(url: string): Promise<unknown> {
  const route = matchRoute(url);
  if (!route?.loader) return null;
  
  const context = createLoaderContext(url);
  return executeLoader(route.loader, context);
}

// Export all route paths for sitemap generation
export const allRoutePaths = routes.map(r => r.path);

// Re-export loader utilities
export { createLoaderContext, executeLoader };
