import helmetAsyncPkg from "react-helmet-async";
const { Helmet } = helmetAsyncPkg;
import { useSSRData } from "@/lib/ssr-data-context";

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
  ogImage = "/hero-party-bus.jpg",
  type = "website",
  article,
}: MetaTagsProps) {
  // Try to get SSR meta data
  const ssrData = useSSRData<{ meta?: SSRMeta }>();
  const ssrMeta = ssrData?.meta;

  // Use SSR data if available, otherwise fall back to props
  const title = ssrMeta?.title || propTitle;
  const description = ssrMeta?.description || propDescription;
  const canonical = ssrMeta?.canonical || propCanonical;

  const fullTitle = title.includes("|") ? title : `${title} | Pitt Party Bus`;
  const baseUrl = "https://pittpartybus.com";
  const fullCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : `${baseUrl}${typeof window !== "undefined" ? window.location.pathname : ""}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

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
