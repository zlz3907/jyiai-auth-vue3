import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import type { UserConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      rollupTypes: true
    })
  ],
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
        additionalData: `@use "@/assets/styles/variables" as *;`,
        includePaths: ['src/assets/styles']
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@zhycit/jyiai-auth-vue3',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    cssCodeSplit: false,
    cssMinify: true,
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        '@vuelidate/core',
        '@vuelidate/validators',
        'bootstrap',
        'bootstrap-vue-next'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'vue-i18n': 'VueI18n',
          bootstrap: 'Bootstrap',
          '@vuelidate/core': 'VuelidateCore',
          '@vuelidate/validators': 'VuelidateValidators',
          'bootstrap-vue-next': 'BootstrapVueNext'
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.type === 'asset' && assetInfo.name?.endsWith('.css')) {
            return 'assets/style.css'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
} as UserConfig) 