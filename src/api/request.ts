import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse, RequestConfig } from './types'
import router from '@/router'
import i18n from '@/locales'
import { useToast } from 'vue-toastification'

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

  const toast = useToast()

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')
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
    (response: AxiosResponse<ApiResponse>) => {
      const res = response.data
      
      // 处理 401 未授权
      if (res?.code === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        
        toast.warning(i18n.global.t('common.system.sessionExpired'))
        
        router.push('/auth/login')
        return Promise.reject(new Error('Unauthorized'))
      }

      if (res.code !== 0 && res.code !== 200) {
        // 处理业务错误
        return Promise.reject(new Error(res.message || 'Error'))
      }
      
      return res.data
    },
    (error) => {
      // 错误处理
      if (error.response) {
        switch (error.response.status) {
          case 401:
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            toast.warning(i18n.global.t('common.system.sessionExpired'))
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
            toast.error("文件过大，上传失败")
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