import type { App } from 'vue'
// import { createPinia } from 'pinia'
//import { setupI18n } from './locales'
import i18n from './locales'
import AuthLayout from './layouts/AuthLayout.vue'
import routes from './router/routes'
// 导入样式

// 默认样式由宿主应用决定导入；如需从插件控制，请通过 options.stylesUrl 注入

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
  stylesUrl?: string    // 可选：通过 URL 注入自定义样式
  injectStyles?: boolean // 可选：是否由插件注入样式，默认 true
  thirdAuth?: string[]  // 第三方认证方式列表
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

    // 样式注入策略：
    // - 若提供 options.stylesUrl，则通过 <link> 注入该样式
    // - 若未提供，则默认不注入，交由宿主应用控制（避免重复导入）
    const shouldInject = options.injectStyles !== false
    if (shouldInject) {
      if (options.stylesUrl) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = options.stylesUrl
        document.head.appendChild(link)
      } else {
        // 回退：未提供 stylesUrl 时动态导入默认样式
        // 通过条件动态导入，避免在未使用插件样式时重复加载
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        import('./assets/styles/index.css')
      }
    }
  }
}