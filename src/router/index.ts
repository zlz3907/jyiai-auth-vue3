import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import routes from './routes'
import { RouteRecordRaw } from 'vue-router'
import storage from '@/utils/storage'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE || '认证系统'}`
  }

  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = storage.getItem('token')
    if (!token) {
      // 使用与应用程序一致的参数名称
      const queryParams = to.query.backUrl ? 
        { backUrl: to.fullPath } : 
        { redirect: to.fullPath }
        
      next({
        path: '/auth/login',
        query: queryParams
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router 