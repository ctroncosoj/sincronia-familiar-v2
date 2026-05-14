import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'node:fs';
import path from 'node:path';

// Plugin to copy public/ while skipping broken/inaccessible files (e.g. " copy.png" leftovers)
function safeCopyPublic(): import('vite').Plugin {
  return {
    name: 'safe-copy-public',
    apply: 'build',
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const outDir = path.resolve(__dirname, 'dist');
      function copyDir(src: string, dest: string) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          try {
            if (entry.isDirectory()) {
              fs.mkdirSync(destPath, { recursive: true });
              copyDir(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          } catch {
            // skip inaccessible files silently
          }
        }
      }
      copyDir(publicDir, outDir);
    },
  };
}

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    safeCopyPublic(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Use the manifest.json we already have in /public
      manifest: false,
      workbox: {
        // Pre-cache all build assets
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
        // Runtime caching strategies
        runtimeCaching: [
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // App shell — serve stale while revalidating
            urlPattern: /^https?:\/\/.+\/(api|supabase)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 10,
            },
          },
        ],
        // Skip waiting so the new SW activates immediately after install
        skipWaiting: true,
        clientsClaim: true,
        // Prevent caching the Supabase auth callback
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/auth\//],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['i18next', 'react-i18next'],
          suncalc: ['suncalc'],
        },
      },
    },
  },
});
