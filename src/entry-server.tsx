import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";
import { SSRDataProvider } from "./lib/ssr-data-context";

export interface RenderResult {
  html: string;
  headTags: string;
  initialData: string;
}

export async function render(url: string, initialData: unknown = {}): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const ssrDataValue = {
    data: initialData,
    url,
  };

  const app = (
    <React.StrictMode>
      <SSRDataProvider value={ssrDataValue}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </SSRDataProvider>
    </React.StrictMode>
  );

  // Server-render the app to a string
  const html = ReactDOMServer.renderToString(app);

  // Collect <Helmet> tags from the HelmetProvider context
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
