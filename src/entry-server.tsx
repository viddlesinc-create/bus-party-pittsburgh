import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import App from './App';

export function render(url: string) {
  const helmetContext = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
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
    }
  };
}
