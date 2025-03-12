<template>
  <button
    type="button"
    class="btn btn-icon btn-sm p-1 mb-0"
    @click="toggleTheme"
  >
    <!-- 月亮图标 - 暗色模式 -->
    <i v-if="!isDark" class="bi bi-moon-stars"></i>
    <!-- 太阳图标 - 亮色模式 -->
    <i v-else class="bi bi-sun"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import storage from '@/utils/storage'

export default defineComponent({
  name: 'ThemeToggler',
  setup() {
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
      document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light')
      storage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    onMounted(() => {
      // 从 localStorage 获取主题设置
      const theme = storage.getItem('theme')
      if (theme) {
        isDark.value = theme === 'dark'
        document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light')
      }
    })

    return {
      isDark,
      toggleTheme
    }
  }
})
</script>

<style scoped>
/* 深色模式样式 */
:root[data-bs-theme="dark"] .btn-icon {
  color: #fff;
}

:root[data-bs-theme="dark"] .btn-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 