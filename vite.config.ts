import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const layerAliases = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'].map(
  (layer) => [`@${layer}`, fileURLToPath(new URL(`./src/${layer}`, import.meta.url))] as const,
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(layerAliases),
  },
  server: {
    port: 5173,
  },
});
