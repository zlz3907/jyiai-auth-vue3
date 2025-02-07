declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/stores/auth' {
  export const useAuthStore: any
}

declare module '@/stores/user' {
  export const useUserStore: any
}

declare module '@/api/user' {
  export const userApi: any
}

declare module 'bootstrap' {
  export const Modal: any
} 