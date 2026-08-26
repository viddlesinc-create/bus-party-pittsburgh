import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useSSRData } from "@/lib/ssr-data-context";
import { getPageSeo } from "@/lib/seo";

interface SSRMeta {
  title?: string;
  description?: string;
  canonical?: string;
}

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  /** Set on pages that must never be indexed (the 404 page). Defaults to indexable. */
  noindex?: boolean;
  /** Override the PAGE_SEO lookup key when it cannot be read from the URL (404). */
  seoKey?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

/**
 * MetaTags component with SSR data integration
 * Uses SSR loader data if available, falls back to props
 */
export function MetaTags({
  title: propTitle,
  description: propDescription,
  canonical: propCanonical,
  // Default lives in public/og-image.jpg (1200x630, matching the
  // og:image:width/height tags below). The old default "/hero-party-bus.jpg"
  // never existed at the site root — every page's og:image was a 404.
  ogImage = "/og-image.jpg",
  type = "website",
  noindex = false,
  seoKey,
  article,
}: MetaTagsProps) {
  // Try to get SSR meta data
  const ssrData = useSSRData<{ meta?: SSRMeta }>();
  const ssrMeta = ssrData?.meta;
  // Router location works during SSR too (window does not) — pages that don't
  // pass a canonical prop were prerendering with the bare domain as canonical.
  const { pathname } = useLocation();

  // src/lib/seo.ts is authoritative for every route it knows about, so titles and
  // descriptions cannot drift between the page component, the route loader and
  // what actually ships. The title/description props remain the fallback for any
  // route not in that map (and for the 404 page, which reaches this component
  // under whatever unknown path the visitor typed — hence seoKey).
  const seo = getPageSeo(seoKey ?? pathname);
  const title = seo?.title ?? ssrMeta?.title ?? propTitle;
  const description = seo?.description ?? ssrMeta?.description ?? propDescription;
  const canonical = ssrMeta?.canonical || propCanonical;

  // Titles from PAGE_SEO are already final and length-checked, so the brand
  // suffix must not be appended to them — doing so silently pushed
  // /blog/top-events-pittsburgh to 72 characters. Only prop-supplied titles
  // (routes not in PAGE_SEO) still get the suffix.
  const fullTitle = seo || title.includes("|") ? title : `${title} | Pitt Party Bus`;
  const baseUrl = "https://pittpartybus.com";
  const fullCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : `${baseUrl}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* SEO: Global robots directive - all pages using MetaTags are indexable by default.
          Main nav pages (/, /fleet, /events, /pricing, /contact, /faqs, /blog) are prioritized
          through strong internal linking rather than noindex on other pages.
          The 404 page opts out via noindex: it was previously declaring itself
          indexable, which matters here because ~38 retired URLs still land on it. */}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Pitt Party Bus" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Article Specific */}
      {type === "article" && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.tags && article.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        </>
      )}
    </Helmet>
  );
}
