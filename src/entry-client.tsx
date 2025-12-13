import React, { useEffect, useState } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Routes } from "react-router-dom";
import { renderRoutes } from "./router";
import './index.css';

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

const queryClient = new QueryClient();

const container = document.getElementById('root')!;
const app = (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClientOnlyToasters />
        <ScrollToTop />
        <Routes>
          {renderRoutes()}
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

const html = container.innerHTML.trim();
const hasSSR = html !== "" && !html.includes('ssr-outlet');

if (hasSSR) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
