// Loader context - provides request info to loaders
export interface LoaderContext {
  url: string;
  params: Record<string, string>;
  query: Record<string, string>;
}

// Loader function type
export type LoaderFunction<T = unknown> = (context: LoaderContext) => Promise<T>;

// Parse URL into context
export function createLoaderContext(url: string): LoaderContext {
  const urlObj = new URL(url, 'http://localhost');
  const query: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return {
    url: urlObj.pathname,
    params: {}, // Will be populated by route matching
    query,
  };
}

// Execute a loader with error handling
export async function executeLoader<T>(
  loader: LoaderFunction<T> | undefined,
  context: LoaderContext
): Promise<T | null> {
  if (!loader) return null;
  
  try {
    return await loader(context);
  } catch (error) {
    console.error('Loader error:', error);
    // In production, you might want to throw or return error state
    return null;
  }
}
