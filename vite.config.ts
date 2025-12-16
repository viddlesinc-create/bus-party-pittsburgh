import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { prerenderPlugin } from './vite-plugin-prerender';

// https://vitejs.dev/config/
export default defineConfig({
  // ...existing config...
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && prerenderPlugin(),
    mode === 'production' && viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    mode === 'production' && viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-dialog'],
        }
      }
    }
  },
  ssr: {
    // Dependencies to bundle for SSR
    noExternal: ['react-helmet'],
    // Dependencies to externalize (not bundle)
    external: ['express', 'compression', 'sirv'],
  },
}));
