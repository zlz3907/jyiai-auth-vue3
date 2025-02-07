import request from './request'
import type { 
  LoginParams, 
  PhoneLoginParams, 
  RegisterParams, 
  ResetPasswordParams,
  UserInfo,
  ApiResponse 
} from './types'

/**
 * 用户名密码登录
 */
export const loginByPassword = (data: LoginParams) => {
  return request.post<ApiResponse<UserInfo>>('/auth/login', data)
}

/**
 * 手机号登录
 */
export const loginByPhone = (data: PhoneLoginParams) => {
  return request.post<ApiResponse<UserInfo>>('/auth/login/phone', data)
}

/**
 * 注册
 */
export const register = (data: RegisterParams) => {
  return request.post<ApiResponse<void>>('/auth/register', data)
}

/**
 * 发送验证码
 */
export const sendVerifyCode = (phone: string) => {
  return request.post<ApiResponse<void>>('/auth/code', { phone })
}

/**
 * 重置密码
 */
export const resetPassword = (data: ResetPasswordParams) => {
  return request.post<ApiResponse<void>>('/auth/reset-password', data)
}

/**
 * 退出登录
 */
export const logout = () => {
  return request.post<ApiResponse<void>>('/auth/logout')
} 