import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";
import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet';
import { renderRoutes } from "./router";

const queryClient = new QueryClient();

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SkipToContent />
          {isClient && (
            <>
              <Toaster />
              <Sonner />
            </>
          )}
          <ScrollToTop />
          <Routes>
            {renderRoutes()}
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
