import type { Plugin } from 'vue'
import type { ToastOptions, ToastPluginOptions } from 'vue-toastification'

export interface ToastPlugin extends Plugin {
  success(message: string, options?: ToastOptions): void
  error(message: string, options?: ToastOptions): void
  info(message: string, options?: ToastOptions): void
  warning(message: string, options?: ToastOptions): void
}

export interface ToastConfig extends ToastPluginOptions {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  timeout?: number
  closeOnClick?: boolean
  pauseOnFocusLoss?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  draggablePercent?: number
  showCloseButtonOnHover?: boolean
  hideProgressBar?: boolean
  closeButton?: string | false
  icon?: boolean | string
  rtl?: boolean
} 