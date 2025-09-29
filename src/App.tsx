import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/events" element={<Events />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/party-bus-pricing-guide" element={<PartyBusPricingGuide />} />
          <Route path="/blog/top-events-pittsburgh" element={<TopEventsPittsburgh />} />
          <Route path="/blog/party-bus-vs-limo" element={<PartyBusVsLimo />} />
          <Route path="/blog/bachelor-bachelorette-ideas" element={<BachelorBacheloretteIdeas />} />
          <Route path="/blog/wedding-transportation" element={<WeddingTransportation />} />
          <Route path="/blog/corporate-event-transportation" element={<CorporateEventTransportation />} />
          <Route path="/blog/concert-party-bus" element={<ConcertPartyBus />} />
          <Route path="/blog/prom-transportation-safety" element={<PromTransportationSafety />} />
          <Route path="/blog/party-bus-safety-tips" element={<PartyBusSafetyTips />} />
          <Route path="/blog/accurate-party-bus-estimate" element={<AccuratePartyBusEstimate />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
