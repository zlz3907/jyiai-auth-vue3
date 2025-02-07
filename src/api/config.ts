import type { RequestConfig } from './types'

// API 请求配置
export const requestConfig: RequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// 加密相关配置
export const cryptoConfig = {
  key: import.meta.env.VITE_CRYPTO_KEY || 'your-default-key',
  iv: import.meta.env.VITE_CRYPTO_IV || 'your-default-iv'
}

// 其他全局配置
export const config = {
  // 登录相关配置
  auth: {
    tokenKey: 'token',
    refreshTokenKey: 'refreshToken',
    tokenPrefix: 'Bearer'
  },
  // 路由相关配置
  router: {
    loginPath: '/auth/login',
    homePath: '/'
  }
}

export default {
  request: requestConfig,
  crypto: cryptoConfig,
  ...config
} 