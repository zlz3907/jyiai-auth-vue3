import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import type { App } from 'vue'
import type { ToastPlugin, ToastConfig } from './types'
import 'vue-toastification/dist/index.css'

// 默认配置
const defaultOptions: ToastConfig = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

export function setupToast(app: App, options: PluginOptions = {}) {
  app.use(Toast, {
    ...defaultOptions,
    ...options
  })
}

const toast: ToastPlugin = {
  install(app: App) {
    setupToast(app)
  },
  success(message: string, options = {}) {
    Toast.success(message, options)
  },
  error(message: string, options = {}) {
    Toast.error(message, options)
  },
  info(message: string, options = {}) {
    Toast.info(message, options)
  },
  warning(message: string, options = {}) {
    Toast.warning(message, options)
  }
}

export default toast 