import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// User GitHub Pages site (masterkpg.github.io) → served from root
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 8192,
    rollupOptions: {
      // Two pages: the portfolio and the CV at /cv/
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        cv: fileURLToPath(new URL('./cv/index.html', import.meta.url)),
      },
    },
  },
})
