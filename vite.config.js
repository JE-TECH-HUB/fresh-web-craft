
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        gadgets: path.resolve(__dirname, 'gadgets.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
        admin: path.resolve(__dirname, 'admin.html')
      }
    },
    minify: 'terser',
    cssMinify: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
