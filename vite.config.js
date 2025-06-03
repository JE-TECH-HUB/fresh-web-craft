
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        contact: './contact.html',
        about: './about.html',
        programs: './programs.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
