import { defineStore } from 'pinia'
import type { UserState, UserInfo } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    userInfo: null
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    getToken: (state): string | null => state.token,
    getUserInfo: (state): UserInfo | null => state.userInfo,
    hasRole: (state) => (role: string): boolean => {
      return state.userInfo?.roles?.includes(role) || false
    },
    hasPermission: (state) => (permission: string): boolean => {
      return state.userInfo?.permissions?.includes(permission) || false
    }
  },

  actions: {
    setToken(token: string | null) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
    },

    clearUserInfo() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
    },

    async updateUserInfo() {
      try {
        // 这里可以添加获取用户信息的 API 调用
        // const response = await userApi.getUserInfo()
        // this.setUserInfo(response.data)
      } catch (error) {
        console.error('Failed to update user info:', error)
      }
    }
  }
}) 