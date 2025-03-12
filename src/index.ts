import type { App } from 'vue'
// import { createPinia } from 'pinia'
//import { setupI18n } from './locales'
import i18n from './locales'
import AuthLayout from './layouts/AuthLayout.vue'
import routes from './router/routes'
// 导入样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/index.scss'

// 导出路由配置和组件
export { routes, AuthLayout }

// 默认语言包
// const defaultI18nMessages = {
//   'zh-CN': zhCN,
//   'en-US': enUS
// }

export interface AuthOptions {
  apiBaseUrl?: string
  i18n?: {
    locale?: string
    messages?: Record<string, any>
  }
  wxLoginUrl?: string  // 添加微信登录URL配置
  authKey?: string  // 添加 authKey 配置
  showHeader?: boolean
  showFooter?: boolean
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $JAC: AuthOptions
  }
}

export default {
  install: (app: App, options: AuthOptions = {}) => {
    // 初始化 Pinia
    // const pinia = createPinia()
    // app.use(pinia)

    // 设置国际化
    // const i18nOptions = options.i18n || {}
    // setupI18n(app, {
    //   locale: i18nOptions.locale || 'zh-CN',
    //   messages: {
    //     ...defaultI18nMessages,  // 先加载默认语言包
    //     ...(i18nOptions.messages || {})  // 如果有自定义语言包，覆盖默认的
    //   }
    // })
    app.use(i18n)

    // 注入全局配置
    app.config.globalProperties.$JAC = options // 将配置注入到全局 JYIAIAuthConfig(JAC)
  }
} 