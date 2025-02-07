<script setup>
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(() => {
  // 初始化时检查并恢复用户状态
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  
  if (token && userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo)
      userStore.setUserInfo(parsedUserInfo)
      userStore.setToken(token)
    } catch (e) {
      console.error('Failed to parse user info:', e)
    }
  }
})
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
}
</style>
