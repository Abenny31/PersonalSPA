import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const productionBase = '/PersonalSPA/';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? productionBase : '/',
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}));
