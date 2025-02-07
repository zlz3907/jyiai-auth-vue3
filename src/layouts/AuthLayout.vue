<template>
  <div class="auth-layout">
    <header v-if="showHeader" class="auth-header">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <div class="logo">
            <!-- 这里可以放置 logo -->
          </div>
          <div class="actions">
            <LanguageSelector />
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>

    <main class="auth-main">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <footer v-if="showFooter" class="auth-footer">
      <div class="container">
        <div class="text-center">
          <!-- 这里可以放置版权信息等 -->
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { AuthLayoutProps, AuthLayoutEmits } from './types'
import LanguageSelector from '@/components/LanguageSelector.vue'
import ThemeToggler from '@/components/ThemeToggler.vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {
    LanguageSelector,
    ThemeToggler
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:showHeader', 'update:showFooter'],
  setup(props, { emit }) {
    // 如果需要的话，这里可以添加更多的逻辑
    return {
      // 返回需要在模板中使用的内容
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.auth-header {
  padding: 1rem 0;
  background-color: var(--bs-body-bg);
  border-bottom: 1px solid var(--bs-border-color);

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.auth-main {
  flex: 1;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-footer {
  padding: 1rem 0;
  background-color: var(--bs-body-bg);
  border-top: 1px solid var(--bs-border-color);
}
</style> 