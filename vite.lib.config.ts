import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'miro-react-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});