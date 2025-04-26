
import { defineConfig } from 'vite'

export default defineConfig({
  // Base configuration for Vite
  server: {
    port: 3000,
    open: true
  },
  // Configure asset handling
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})
