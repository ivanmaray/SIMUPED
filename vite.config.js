import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // ← asegúrate de que el proyecto empieza desde la raíz
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})