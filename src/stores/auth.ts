import { defineStore } from 'pinia'
import type { AuthState } from './types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    userInfo: null
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    getToken: (state): string | null => state.token,
    getUserInfo: (state): UserInfo | null => state.userInfo
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

    logout() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
    }
  }
}) 