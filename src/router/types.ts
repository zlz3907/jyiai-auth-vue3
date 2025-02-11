import type { RouteRecordRaw } from 'vue-router'

export interface AuthRoute extends Omit<RouteRecordRaw, 'meta'> {
  meta?: {
    title?: string
    requiresAuth?: boolean
    layout?: string
  }
}

export type AuthRouteConfig = AuthRoute[] 