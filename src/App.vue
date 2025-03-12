<script setup>
import { onMounted } from 'vue'
import storage from '@/utils/storage'

// const authStore = useAuthStore()
// const userStore = useUserStore()

onMounted(() => {
  // 检查登录状态
  const token = storage.getItem('token')
  const userInfo = storage.getItem('userInfo')
  
  if (token && userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo)
      // userStore.setUserInfo(parsedUserInfo)
      // userStore.setToken(token)
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
