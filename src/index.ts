import type { App } from 'vue'
import { createPinia } from 'pinia'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import ForgotPassword from './views/auth/ForgotPassword.vue'
import { setupRouter } from './router'
import { setupI18n } from './locales'

export { Login, Register, ForgotPassword }

export interface AuthOptions {
  apiBaseUrl?: string
  i18n?: {
    locale?: string
    messages?: Record<string, any>
  }
}

export default {
  install: (app: App, options: AuthOptions = {}) => {
    // 初始化 Pinia
    const pinia = createPinia()
    app.use(pinia)

    // 设置路由
    setupRouter(app)

    // 设置国际化
    if (options.i18n) {
      setupI18n(app, options.i18n)
    }
  }
} 