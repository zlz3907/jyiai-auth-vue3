import type { AuthRouteConfig } from './types'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes: AuthRouteConfig = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'auth',
        redirect: '/auth/login',
        meta: {
          title: '登录'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'wx-auth',
        name: 'wx-auth',
        component: () => import('@/views/auth/WxAuth.vue'),
        meta: {
          title: '微信登录'
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          title: '注册'
        }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        meta: {
          title: '忘记密码'
        }
      }
    ]
  }
]

export default routes 