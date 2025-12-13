import { createContext, useContext, ReactNode } from 'react';

// Type for SSR data context
export interface SSRDataContextType {
  data: unknown;
  url?: string;
}

// Create context with default value
const SSRDataContext = createContext<SSRDataContextType>({ data: null });

// Provider component
interface SSRDataProviderProps {
  children: ReactNode;
  value: SSRDataContextType;
}

export function SSRDataProvider({ children, value }: SSRDataProviderProps) {
  return (
    <SSRDataContext.Provider value={value}>
      {children}
    </SSRDataContext.Provider>
  );
}

// Hook to consume SSR data with type safety
export function useSSRData<T = unknown>(): T | null {
  const context = useContext(SSRDataContext);
  return context.data as T | null;
}

// Hook to get the current SSR URL
export function useSSRUrl(): string | undefined {
  const context = useContext(SSRDataContext);
  return context.url;
}

// Type declaration for window.__INITIAL_DATA__
declare global {
  interface Window {
    __INITIAL_DATA__?: unknown;
  }
}
