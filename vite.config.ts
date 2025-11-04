import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: { 
    port: 3000, 
    open: true, 
    proxy: { 
      '/yll': { 
        target: 'https://api.zhycit.com/yll/',	//接口地址 
        changeOrigin: true,		//跨域 
        rewrite: (path) => path.replace(/^\/yll/, '') 
      }, 
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
        charset: false
      }
    }
  },
  build: {
    cssCodeSplit: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JYIAIAuth',
      fileName: 'jyiai-auth'
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'vue-i18n'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'vue-i18n': 'VueI18n'
        }
      }
    }
  }
})