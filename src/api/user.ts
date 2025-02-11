import request from './request'
import { encryptPassword } from './crypto'

const baseURL = '/gnas'

// 接口类型定义
interface LoginParams {
  phone: string
  password: string
  remember?: boolean
}

interface VerifyCodeParams {
  phone: string
  type: string
  code?: string
}

interface RegisterParams {
  username: string
  phone: string
  password: string
  code: string
}

interface DiskConfigParams {
  type: string
  name: string
  serverUrl: string
  username: string
  password: string
  basePath?: string
  autoSync?: boolean
  syncInterval?: number
}

// 用户 API 封装
export const userApi = {
  // 认证相关
  auth: {
    /**
     * 登录
     */
    login(data: LoginParams) {
      return request.post(`${baseURL}/user/login`, {
        ...data,
        password: encryptPassword(data.password)
      })
    },

    /**
     * 发送验证码
     */
    sendVerificationCode(data: Omit<VerifyCodeParams, 'code'>) {
      return request.post(`${baseURL}/user/sendCode`, {
        phone: data.phone,
        type: data.type || 'register'
      })
    },

    /**
     * 验证验证码
     */
    verifyCode(data: VerifyCodeParams) {
      return request.post(`${baseURL}/user/verifyCode`, {
        phone: data.phone,
        code: data.code,
        type: data.type || 'register'
      })
    },

    /**
     * 注册
     */
    register(data: RegisterParams) {
      return request.post(`${baseURL}/user/register`, {
        ...data,
        password: encryptPassword(data.password)
      })
    },

    /**
     * 退出登录
     */
    logout() {
      return request.post(`${baseURL}/user/logout`)
    },

    /**
     * 重置密码
     */
    resetPassword(data: { phone: string; code: string; newPassword: string }) {
      return request.post(`${baseURL}/user/resetPassword`, data)
    }
  },

  // 配置相关
  config: {
    /**
     * 获取用户配置
     */
    getSettings(category: string) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      return request({
        url: `${baseURL}/user/configs`,
        method: 'get',
        params: {
          user_id: userInfo._id,
          category,
          type: 'webdav'
        }
      })
    },

    /**
     * 获取用户知识库访问权限
     */
    getDatasetAccess() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      return request.post(`${baseURL}/user/getConfigs`, {
        user_id: userInfo._id,
        category: 'dify',
        type: 'know'
      })
    }
  },

  // 网盘相关
  disk: {
    /**
     * 更新网盘配置
     */
    updateConfig(data: DiskConfigParams) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      return request({
        url: `${baseURL}/user/updateDiskConfig`,
        method: 'post',
        data: {
          user_id: userInfo._id,
          type: data.type,
          name: data.name,
          config: {
            server_url: data.serverUrl,
            username: data.username,
            password: data.password,
            base_path: data.basePath || '/',
            auto_sync: data.autoSync || false,
            sync_interval: data.syncInterval || 30
          }
        }
      })
    },

    /**
     * 删除网盘配置
     */
    deleteConfig(appId: string) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      return request({
        url: `${baseURL}/user/deleteDiskConfig`,
        method: 'post',
        data: {
          user_id: userInfo._id,
          app_id: appId
        }
      })
    },

    /**
     * 获取所有网盘配置
     */
    getConfigs() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      return request.post(`${baseURL}/user/getConfigs`, {
        user_id: userInfo._id,
        category: 'disk'
      })
    }
  }
}

export default userApi 