import type { RouteRecordRaw } from 'vue-router'

export interface AuthRoute extends RouteRecordRaw {
  meta?: {
    title?: string
    requiresAuth?: boolean
    layout?: string
  }
}

export type AuthRouteConfig = AuthRoute[] 