import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          const normalizedId = id.split('\\').join('/')

          if (normalizedId.includes('react-icons')) {
            return 'icons-vendor'
          }

          if (
            normalizedId.includes('framer-motion') ||
            normalizedId.includes('swiper') ||
            normalizedId.includes('react-hot-toast')
          ) {
            return 'ui-vendor'
          }

          if (
            normalizedId.includes('@reduxjs/toolkit') ||
            normalizedId.includes('react-redux') ||
            normalizedId.includes('redux')
          ) {
            return 'state-vendor'
          }

          if (
            normalizedId.includes('/react/') ||
            normalizedId.includes('/react-dom/') ||
            normalizedId.includes('react-router') ||
            normalizedId.includes('scheduler')
          ) {
            return 'react-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
})
