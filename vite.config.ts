import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/styles/variables.css";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
