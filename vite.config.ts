import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'out/renderer',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: 'debug',
    }),
    tsconfigPaths({
      ignoreConfigErrors: true,
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
  base: '/',
});
