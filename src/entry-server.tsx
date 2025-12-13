import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Routes } from "react-router-dom";
import { renderRoutes, matchRoute } from "./router";
import { ScrollToTop } from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";

export function render(url: string) {
  const helmetContext = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Match route for future data loading
  const matchedRoute = matchRoute(url);
  
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <SkipToContent />
            <ScrollToTop />
            <Routes>
              {renderRoutes()}
            </Routes>
          </StaticRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
  
  const helmet = Helmet.renderStatic();
  
  return { 
    html, 
    helmet: {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    },
    matchedRoute: matchedRoute?.path || null,
  };
}
