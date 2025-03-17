import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from './types'
import router from '@/router'
import Cookies from 'js-cookie'
import storage from '@/utils/storage'

// 创建 axios 实例
const createRequest = (config: RequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL || '/',
    timeout: config.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get('JYIAIToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      const res = response.data
      
      // 处理 401 未授权
      if (res?.code === 401) {
        Cookies.remove('JYIAIToken')
        storage.removeItem('userInfo')
        router.push('/auth/login')
        return Promise.reject(new Error('Unauthorized'))
      }

      if (res.code !== 0 && res.code !== 200) {
        // 处理业务错误
        return Promise.reject(new Error(res.message || 'Error'))
      }
      
      // 修改响应数据而不是直接返回 res
      // response.data = res
      return response
    },
    (error) => {
      // 错误处理
      if (error.response) {
        switch (error.response.status) {
          case 401:
            Cookies.remove('JYIAIToken')
            storage.removeItem('userInfo')
            router.push('/auth/login')
            break
          case 403:
            console.error('Permission denied')
            break
          case 404:
            console.error('Resource not found')
            break
          case 413:
            console.error('Request entity too large')
            break
          case 500:
            console.error('Server error')
            break
          default:
            console.error('Network error:', error.response.status)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const request = createRequest()

export default request 