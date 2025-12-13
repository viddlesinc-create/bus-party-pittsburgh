import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Routes } from "react-router-dom";
import { renderRoutes, matchRoute, loadRouteData } from "./router";
import { ScrollToTop } from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";
import { SSRDataProvider } from "./lib/ssr-data-context";

export interface RenderResult {
  html: string;
  helmet: {
    title: string;
    meta: string;
    link: string;
    script: string;
  };
  initialData: unknown;
  matchedRoute: string | null;
  statusCode: number;
}

export async function render(url: string): Promise<RenderResult> {
  // Create fresh instances per request (prevents memory leaks)
  const helmetContext = {} as { helmet: HelmetServerState };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Match route for data loading
  const matchedRoute = matchRoute(url);
  
  // Execute loader if route has one
  const initialData = await loadRouteData(url);

  // SSR data context value
  const ssrDataValue = {
    data: initialData,
    url: url,
  };

  // Render the app to string
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SSRDataProvider value={ssrDataValue}>
            <StaticRouter location={url}>
              <SkipToContent />
              <ScrollToTop />
              <Routes>
                {renderRoutes()}
              </Routes>
            </StaticRouter>
          </SSRDataProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
  
  // Extract helmet data from context
  const { helmet } = helmetContext;
  
  // Determine status code
  const statusCode = matchedRoute === null ? 404 : 200;

  return { 
    html, 
    helmet: {
      title: helmet?.title?.toString() || '',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
      script: helmet?.script?.toString() || '',
    },
    initialData,
    matchedRoute: matchedRoute?.path || null,
    statusCode,
  };
}
