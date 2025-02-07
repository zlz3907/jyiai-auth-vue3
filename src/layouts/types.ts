import type { DefineComponent } from 'vue'

export interface AuthLayoutProps {
  showHeader?: boolean
  showFooter?: boolean
}

export interface AuthLayoutEmits {
  (e: 'update:showHeader', value: boolean): void
  (e: 'update:showFooter', value: boolean): void
}

export type AuthLayoutInstance = DefineComponent<AuthLayoutProps, {}, any> 