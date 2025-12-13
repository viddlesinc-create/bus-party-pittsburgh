import React, { useEffect, useState } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Routes } from "react-router-dom";
import { renderRoutes } from "./router";
import { SSRDataProvider } from "./lib/ssr-data-context";
import './index.css';

// Client-only toasters to prevent hydration mismatch
const ClientOnlyToasters = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
};

// Get initial data from server (if SSR'd)
const initialData = typeof window !== 'undefined' ? window.__INITIAL_DATA__ : null;

const queryClient = new QueryClient();

const container = document.getElementById('root')!;

// SSR data context value for hydration
const ssrDataValue = {
  data: initialData,
  url: typeof window !== 'undefined' ? window.location.pathname : undefined,
};

const app = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SSRDataProvider value={ssrDataValue}>
          <BrowserRouter>
            <ClientOnlyToasters />
            <ScrollToTop />
            <Routes>
              {renderRoutes()}
            </Routes>
          </BrowserRouter>
        </SSRDataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

// Check if server-rendered content exists
const html = container.innerHTML.trim();
const hasSSR = html !== "" && !html.includes('ssr-outlet');

if (hasSSR) {
  // Hydrate existing SSR content
  hydrateRoot(container, app);
} else {
  // Full client-side render (fallback)
  createRoot(container).render(app);
}
