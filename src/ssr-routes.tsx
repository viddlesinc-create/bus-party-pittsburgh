// Server-only route component map. Imported exclusively by entry-server.tsx,
// so none of these static imports reach the client bundle (code splitting on
// the client is untouched). renderToString cannot wait for React.lazy — lazy
// routes prerender as their Suspense fallback — so prerendering must use
// eagerly-imported components for every route.
import { ComponentType } from "react";

import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import NorthHills from "./pages/locations/NorthHills";
import SouthHills from "./pages/locations/SouthHills";
import Downtown from "./pages/locations/Downtown";
import SouthSide from "./pages/locations/SouthSide";
import Oakland from "./pages/locations/Oakland";
import Pricing from "./pages/Pricing";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
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
import PartyBusesNearMe from "./pages/blog/PartyBusesNearMe";

export const eagerComponents: Record<string, ComponentType> = {
  "/": Index,
  "/fleet": Fleet,
  "/contact": Contact,
  "/events": Events,
  "/locations": Locations,
  "/locations/north-hills": NorthHills,
  "/locations/south-hills": SouthHills,
  "/locations/downtown": Downtown,
  "/locations/south-side": SouthSide,
  "/locations/oakland": Oakland,
  "/pricing": Pricing,
  "/faqs": FAQs,
  "/blog": Blog,
  "/blog/party-bus-pricing-guide": PartyBusPricingGuide,
  "/blog/top-events-pittsburgh": TopEventsPittsburgh,
  "/blog/party-bus-vs-limo": PartyBusVsLimo,
  "/blog/bachelor-bachelorette-ideas": BachelorBacheloretteIdeas,
  "/blog/wedding-transportation": WeddingTransportation,
  "/blog/corporate-event-transportation": CorporateEventTransportation,
  "/blog/concert-party-bus": ConcertPartyBus,
  "/blog/prom-transportation-safety": PromTransportationSafety,
  "/blog/party-bus-safety-tips": PartyBusSafetyTips,
  "/blog/accurate-party-bus-estimate": AccuratePartyBusEstimate,
  "/blog/party-buses-near-me": PartyBusesNearMe,
  "/testimonials": Testimonials,
  "/privacy": Privacy,
  "/terms": Terms,
  "*": NotFound,
};
