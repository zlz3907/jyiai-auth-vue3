import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse, RequestConfig } from './types'

// 创建 axios 实例
const createRequest = (config: RequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL || import.meta.env.VITE_API_BASE_URL,
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 从 localStorage 获取 token
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const res = response.data
      if (res.code !== 0) {
        // 处理业务错误
        return Promise.reject(new Error(res.message || 'Error'))
      }
      return res.data // 直接返回数据部分
    },
    (error) => {
      if (error.response?.status === 401) {
        // 处理未授权错误
        localStorage.removeItem('token')
        window.location.href = '/auth/login'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const request = createRequest()

export default request 