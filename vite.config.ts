import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import type { UserConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
      // 生成类型声明文件
      include: ['src/**/*.ts', 'src/**/*.vue'],
      // 排除测试文件
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
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
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      // 添加全局 CSS 作用域
      additionalData: `
        /* 创建一个完全隔离的样式作用域 */
        .jyiai-auth {
          all: initial;
          display: block;
          font-family: inherit;
          line-height: 1.5;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }
        
        /* 重置所有内部元素的样式 */
        .jyiai-auth * {
          all: revert;
          font-family: inherit;
          box-sizing: border-box;
        }
      `
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
        'tailwindcss',
        'daisyui'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'vue-i18n': 'VueI18n',
          '@vuelidate/core': 'VuelidateCore',
          '@vuelidate/validators': 'VuelidateValidators',
          tailwindcss: 'TailwindCSS',
          daisyui: 'DaisyUI'
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