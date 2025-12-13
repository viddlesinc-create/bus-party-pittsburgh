/**
 * SSR Meta Utilities
 * 
 * Helper functions for working with SSR meta data
 */

export interface SSRMeta {
  title: string;
  description: string;
  canonical: string;
}

/**
 * Creates default meta configuration for a page
 */
export function createMeta(
  title: string,
  description: string,
  canonical: string
): SSRMeta {
  return { title, description, canonical };
}

/**
 * Merges SSR meta with fallback values
 * SSR meta takes precedence if available
 */
export function mergeMeta(
  ssrMeta: SSRMeta | undefined | null,
  fallback: SSRMeta
): SSRMeta {
  if (!ssrMeta) return fallback;
  
  return {
    title: ssrMeta.title || fallback.title,
    description: ssrMeta.description || fallback.description,
    canonical: ssrMeta.canonical || fallback.canonical,
  };
}
