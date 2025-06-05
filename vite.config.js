
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        contact: './contact.html'
      }
    },
    minify: 'terser',
    cssMinify: true
  },
  server: {
    port: 3000
  }
})
