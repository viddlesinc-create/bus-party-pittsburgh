import { lazy, ComponentType } from 'react';
import { Route } from 'react-router-dom';

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

// Route configuration interface
export interface RouteConfig {
  path: string;
  component: ComponentType;
  // Future: add loader for SSR data fetching
  // loader?: () => Promise<unknown>;
}

// Single source of truth for all routes
export const routes: RouteConfig[] = [
  { path: "/", component: Index },
  { path: "/fleet", component: Fleet },
  { path: "/events", component: Events },
  { path: "/locations", component: Locations },
  { path: "/pricing", component: Pricing },
  { path: "/contact", component: Contact },
  { path: "/faqs", component: FAQs },
  { path: "/blog", component: Blog },
  { path: "/blog/party-bus-pricing-guide", component: PartyBusPricingGuide },
  { path: "/blog/top-events-pittsburgh", component: TopEventsPittsburgh },
  { path: "/blog/party-bus-vs-limo", component: PartyBusVsLimo },
  { path: "/blog/bachelor-bachelorette-ideas", component: BachelorBacheloretteIdeas },
  { path: "/blog/wedding-transportation", component: WeddingTransportation },
  { path: "/blog/corporate-event-transportation", component: CorporateEventTransportation },
  { path: "/blog/concert-party-bus", component: ConcertPartyBus },
  { path: "/blog/prom-transportation-safety", component: PromTransportationSafety },
  { path: "/blog/party-bus-safety-tips", component: PartyBusSafetyTips },
  { path: "/blog/accurate-party-bus-estimate", component: AccuratePartyBusEstimate },
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

// Export all route paths for sitemap generation
export const allRoutePaths = routes.map(r => r.path);
