// 通用响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 认证相关类型
export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

export interface PhoneLoginParams {
  phone: string
  code: string
  remember?: boolean
}

export interface RegisterParams {
  username: string
  password: string
  phone: string
  code: string
}

export interface ResetPasswordParams {
  phone: string
  code: string
  newPassword: string
}

export interface UserInfo {
  id: string | number
  username: string
  phone?: string
  avatar?: string
  email?: string
  roles?: string[]
  _id?: string
  [key: string]: any
}

// 请求配置类型
export interface RequestConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

// 加密配置类型
export interface CryptoConfig {
  key: string
  iv: string
}

// Bridge 消息类型
export interface BridgeMessage {
  type: string
  data?: any
}

// Bridge 回调函数类型
export interface BridgeCallback {
  (data: any): void
}

// API 配置类型
export interface ApiConfig {
  source: string
  path: string
  method: string
  payload?: any
  uid?: string | null
} 