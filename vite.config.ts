import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import type { UserConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/domestic': {
        // target: 'https://ai.zhycit.com',
        target: 'http://127.0.0.1:7508/api',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/domestic/, '')
      },
      '/gnas': {
        // target: 'https://ai.zhycit.com',
        target: 'http://127.0.0.1:7501',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`,
        includePaths: ['src/assets/styles']
      }
    }
  }
} as UserConfig) 