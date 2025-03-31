<script setup>
import { onMounted, ref, watch, onBeforeMount, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import storage from '@/utils/storage'
import Navbar from '@/components/Navbar.vue'

// 主题控制
const theme = ref(storage.getItem('theme') || 'light')
const route = useRoute()

// 检测是否为登录/注册页面
const isAuthPage = computed(() => {
  return route.path.startsWith('/auth')
})

// 监听主题变化并保存
watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  storage.setItem('theme', newTheme)
})

// 设置主题
const setTheme = (newTheme) => {
  theme.value = newTheme
}

// 切换亮暗主题
const toggleDarkMode = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onBeforeMount(() => {
  // 从本地存储加载主题
  const savedTheme = storage.getItem('theme')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})

onMounted(() => {
  // 应用主题
  document.documentElement.setAttribute('data-theme', theme.value)
  
  // 检查登录状态
  // const token = storage.getItem('token')
  // const userInfo = storage.getItem('userInfo')
})

// 提供给子组件使用
provide('theme', {
  current: theme,
  setTheme,
  toggleDarkMode
})
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 导航栏（仅在非认证页面显示） -->
    <Navbar v-if="!isAuthPage" />
    
    <!-- 主要内容区 -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 底部状态栏（仅在非认证页面显示） -->
    <footer v-if="!isAuthPage" class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © {{ new Date().getFullYear() }} - All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局样式调整 */
body {
  background-color: hsl(var(--b2));
  color: hsl(var(--bc));
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 确保图标和文本垂直居中对齐 */
.btn i, 
.btn svg {
  vertical-align: middle;
}

/* 调整全局卡片样式 */
.card {
  background-color: hsl(var(--b1));
  border-radius: var(--rounded-box, 1rem);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--b3));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--p));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--pf));
}
</style>
