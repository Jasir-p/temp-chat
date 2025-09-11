import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  test:{
    globals: true,           // so you can use describe/test/expect without import
    environment: 'jsdom',    // <<--- this gives you document/window
    setupFiles: './src/setupTests.js',
  }
})
