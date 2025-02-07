import request from './request'
import type { UserInfo, ApiResponse } from './types'

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request.get<ApiResponse<UserInfo>>('/user/info')
}

/**
 * 更新用户信息
 */
export const updateUserInfo = (data: Partial<UserInfo>) => {
  return request.put<ApiResponse<UserInfo>>('/user/info', data)
}

/**
 * 更新用户密码
 */
export const updatePassword = (data: {
  oldPassword: string
  newPassword: string
}) => {
  return request.put<ApiResponse<void>>('/user/password', data)
}

/**
 * 更新用户头像
 */
export const updateAvatar = (data: FormData) => {
  return request.post<ApiResponse<{ url: string }>>('/user/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const userApi = {
  // 示例：登录方法
  login(credentials: { username: string; password: string }) {
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json());
  },
  // 示例：注册方法
  register(data: any) {
    return fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json());
  }
  // 可以添加其他 API 方法...
}; 