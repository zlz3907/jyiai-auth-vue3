<template>
  <div class="navbar h-14 bg-base-100" :class="{ 'shadow': withShadow, 'border-b': withBorder }">
    <!-- 左侧区域 -->
    <div class="navbar-start">
      <!-- 返回按钮 - 仅在 Auth 布局中显示 -->
      <template v-if="mode === 'auth'">
        <button v-if="backUrl" class="btn btn-ghost btn-sm h-9" @click="handleBack">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="ml-1 text-sm">{{ t('common.back') }}</span>
        </button>
      </template>

      <!-- 汉堡菜单 - 仅在主布局中显示 -->
      <template v-else>
        <div class="dropdown lg:hidden">
          <label tabindex="0" class="btn btn-ghost btn-sm h-9">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <slot name="mobile-menu"></slot>
          </ul>
        </div>
      </template>

      <!-- Logo -->
      <router-link to="/" class="btn btn-ghost h-9 px-2 min-h-0">
        <slot name="logo">
          <span class="logo-brand font-bold text-lg">登录/注册</span>
          <!-- <span class="text-lg">App</span> -->
        </slot>
      </router-link>
    </div>
    
    <!-- 中间区域 - 仅在主布局中显示 -->
    <div v-if="mode === 'main'" class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal menu-sm">
        <slot name="desktop-menu"></slot>
      </ul>
    </div>
    
    <!-- 右侧区域 -->
    <div class="navbar-end gap-1">
      <!-- 语言选择器 -->
      <LanguageSelector v-if="withLanguageSelector" />
      
      <!-- 主题切换 -->
      <div v-if="withThemeToggle">
        <label class="swap swap-rotate btn btn-ghost btn-sm h-9 px-2">
          <input type="checkbox" @change="toggleTheme" :checked="isDarkMode" />
          <svg class="swap-on h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          <svg class="swap-off h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>
      </div>
      
      <slot name="right-content">
        <!-- 默认的用户菜单/登录按钮 -->
        <template v-if="mode === 'main'">
          <div class="dropdown dropdown-end" v-if="isLoggedIn">
            <label tabindex="0" class="btn btn-ghost btn-sm h-9 px-2">
              <div class="w-6 h-6 rounded-full overflow-hidden">
                <img :src="userAvatar || 'https://ui-avatars.com/api/?name=User'" class="w-full h-full object-cover" />
              </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-2 z-50 p-2 shadow bg-base-100 rounded-box w-52">
              <slot name="user-menu"></slot>
            </ul>
          </div>
          <div v-else class="flex gap-1">
            <router-link to="/auth/login" class="btn btn-ghost btn-sm h-9">{{ t('auth.login.title') }}</router-link>
            <router-link to="/auth/register" class="btn btn-primary btn-sm h-9">{{ t('auth.register.title') }}</router-link>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './LanguageSelector.vue'

// Props
defineProps({
  mode: {
    type: String as () => 'main' | 'auth',
    default: 'main'
  },
  withShadow: {
    type: Boolean,
    default: true
  },
  withBorder: {
    type: Boolean,
    default: false
  },
  withLanguageSelector: {
    type: Boolean,
    default: true
  },
  withThemeToggle: {
    type: Boolean,
    default: true
  },
  backUrl: {
    type: String,
    default: ''
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  userAvatar: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['back'])

// Composables
const { t } = useI18n()
const themeControl = inject('theme', {
  current: computed(() => 'light'),
  toggleDarkMode: () => {}
})

// Computed
const isDarkMode = computed(() => themeControl.current.value === 'dark')

// Methods
const toggleTheme = () => {
  themeControl.toggleDarkMode()
}

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
.router-link-active {
  color: hsl(var(--p));
}

.logo-brand {
  color: hsl(var(--p));
}
</style> 