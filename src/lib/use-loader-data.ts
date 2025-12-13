import { useSSRData } from './ssr-data-context';
import { useState, useEffect } from 'react';

/**
 * Hook for consuming SSR-loaded data with client-side fallback
 * 
 * Usage:
 * const { data, isLoading, error } = useLoaderData<FleetData>(async () => {
 *   const response = await fetch('/api/fleet');
 *   return response.json();
 * });
 */
export function useLoaderData<T>(
  clientFetcher?: () => Promise<T>
): { data: T | null; isLoading: boolean; error: Error | null } {
  // Try to get SSR data first
  const ssrData = useSSRData<T>();
  
  const [data, setData] = useState<T | null>(ssrData);
  const [isLoading, setIsLoading] = useState(!ssrData && !!clientFetcher);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If we have SSR data, no need to fetch on client
    if (ssrData) {
      setData(ssrData);
      setIsLoading(false);
      return;
    }

    // If no SSR data and we have a client fetcher, fetch on client
    if (clientFetcher && !ssrData) {
      setIsLoading(true);
      clientFetcher()
        .then((result) => {
          setData(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);

  return { data, isLoading, error };
}

/**
 * Type-safe hook for specific loader data
 * Use when you know the exact type of data for a route
 */
export function useTypedLoaderData<T>(): T | null {
  return useSSRData<T>();
}
