import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Routes } from "react-router-dom";
import { renderRoutes } from "./router";
import { eagerComponents } from "./ssr-routes";
import { SSRDataProvider } from "./lib/ssr-data-context";

export interface RenderResult {
  html: string;
  headTags: string;
  initialData: string;
}

// This tree mirrors entry-client.tsx so hydration markup matches. Two SSR-only
// differences: the HelmetProvider gets a context object (the ONLY provider in
// the tree — a nested context-less provider would shadow it and every page's
// head tags would collect into the void), and renderRoutes receives eager
// components because renderToString cannot resolve React.lazy.
export async function render(url: string, initialData: unknown = {}): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();

  const ssrDataValue = {
    data: initialData,
    url,
  };

  const app = (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SSRDataProvider value={ssrDataValue}>
            <StaticRouter location={url}>
              <ScrollToTop />
              <Routes>{renderRoutes(eagerComponents)}</Routes>
            </StaticRouter>
          </SSRDataProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const html = ReactDOMServer.renderToString(app);

  const headTags = helmetContext.helmet
    ? [
        helmetContext.helmet.title.toString(),
        helmetContext.helmet.priority.toString(),
        helmetContext.helmet.meta.toString(),
        helmetContext.helmet.link.toString(),
        helmetContext.helmet.script.toString(),
      ].join("\n")
    : "";

  const initialDataJson = JSON.stringify(initialData ?? {});

  return {
    html,
    headTags,
    initialData: initialDataJson,
  };
}
