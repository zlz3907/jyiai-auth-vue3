<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h4>{{ message }}</h4>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { handleOAuthCallback } from '@/api/cloud-storage'

const route = useRoute()
const router = useRouter()
const message = ref('正在处理授权...')

onMounted(async () => {
  try {
    const { type } = route.params
    const response = await handleOAuthCallback(type, route.query)
    
    if (response.code === 200) {
      message.value = '授权成功，正在返回...'
      // 将新添加的网盘信息存储到 sessionStorage
      if (response.data) {
        const storageList = JSON.parse(sessionStorage.getItem('cloudStorageList') || '[]')
        storageList.push(response.data)
        sessionStorage.setItem('cloudStorageList', JSON.stringify(storageList))
      }
      
      // 延迟一下再跳转，让用户看到成功提示
      setTimeout(() => {
        window.close()
      }, 1500)
    } else {
      throw new Error(response.message)
    }
  } catch (error) {
    message.value = `授权失败：${error.message}`
    // 3秒后关闭窗口
    setTimeout(() => {
      window.close()
    }, 3000)
  }
})
</script> 