<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// import { useAuthStore } from '@/stores/auth'
import LanguageSelector from '@/components/LanguageSelector.vue'
import ThemeToggler from '@/components/ThemeToggler.vue'
import PageSelector from '@/components/PageSelector.vue'
// import { useUserStore } from '@/stores/user'
import { logout as apiLogout } from '@/api/user'
import storage from '@/utils/storage'

const { t } = useI18n()
const router = useRouter()
// const authStore = useAuthStore()
// const userStore = useUserStore()

const isDark = ref(document.documentElement.getAttribute('data-bs-theme') === 'dark')
const username = computed(() => userStore.userInfo?.username || '用户')
const userStatusClass = computed(() => {
  const status = userStore.userInfo?.status
  return {
    'bg-success': status === 1,
    'bg-warning': status === 0,
    'bg-danger': status === -1
  }
})
const userStatusText = computed(() => {
  const status = userStore.userInfo?.status
  switch (status) {
    case 1: return '正常'
    case 0: return '待激活'
    case -1: return '已禁用'
    default: return '未知状态'
  }
})
const userAvatar = computed(() => {
  const userId = userStore.userInfo?._id
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId || 'default'}`
})

// 添加当前页面类型的计算属性
const currentPageType = computed(() => {
  const path = router.currentRoute.value.path
  if (path.startsWith('/agent')) {
    return 'agent'
  }
  return 'dataset'
})

// 传递给 PageSelector 的属性
const pageSelectorProps = computed(() => ({
  currentType: currentPageType.value
}))

// 检查用户登录状态
const checkAuth = () => {
  const token = storage.getItem('token')
  const userInfo = storage.getItem('userInfo')
  
  if (!token || !userInfo) {
    router.push('/auth/login')
    return false
  }
  
  try {
    const parsedUserInfo = JSON.parse(userInfo)
    userStore.setUserInfo(parsedUserInfo)
    userStore.setToken(token)
    return true
  } catch (e) {
    console.error('Failed to parse user info:', e)
    router.push('/auth/login')
    return false
  }
}

// 主题观察器
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-bs-theme') {
      isDark.value = document.documentElement.getAttribute('data-bs-theme') === 'dark'
    }
  })
})

// 退出登录
const logout = async () => {
  try {
    await apiLogout()
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    userStore.clearUser()
    router.push('/auth/login')
  }
}

// 格式化日期的简单实现
const formatDate = (date) => {
  if (!date) return '未知'
  const d = new Date(date)
  return d.toLocaleString()  // 使用浏览器内置的本地化日期格式化
}

onMounted(() => {
  checkAuth()
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  })
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div class="main-layout">
    <nav class="navbar navbar-expand-lg" :class="{'navbar-dark': isDark, 'bg-dark': isDark, 'navbar-light': !isDark}">
      <div class="container-fluid px-2">
        <!-- Logo and Brand -->
        <router-link 
          class="navbar-brand me-2" 
          to="/"
          style="text-decoration: none;"
        >
          {{ t('common.system.name') }}
        </router-link>
        
        <!-- Right Side Navigation -->
        <div class="d-flex align-items-center nav-actions">
          <div class="nav-item">
            <ThemeToggler class="theme-icon" />
          </div>
          <div class="nav-item">
            <PageSelector :current-type="currentPageType" />
          </div>
          <div class="nav-item">
            <LanguageSelector />
          </div>
          <!-- User Dropdown -->
          <div class="nav-item dropdown">
            <button 
              class="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <div class="avatar">
                <img 
                  :src="userAvatar" 
                  alt="User Avatar"
                  class="rounded-circle"
                  width="32" 
                  height="32"
                >
              </div>
              <div class="ms-2 d-none d-lg-block">
                <div class="fw-semibold">{{ username }}</div>
              </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <!-- User Info -->
              <li>
                <div class="dropdown-item-text">
                  <div class="d-flex align-items-center mb-2">
                    <img :src="userAvatar" 
                         alt="User Avatar"
                         class="rounded-circle me-2"
                         width="48" 
                         height="48">
                    <div>
                      <div class="fw-semibold">{{ username }}</div>
                    </div>
                  </div>
                  <div class="small text-muted mb-1">
                    <i class="bi bi-phone me-2"></i>{{ userStore.userInfo?.phone }}
                  </div>
                  <div class="small text-muted mb-1">
                    <i class="bi bi-clock-history me-2"></i>上次登录: {{ formatDate(userStore.userInfo?.last_login) }}
                  </div>
                  <div class="small text-muted">
                    <i class="bi bi-calendar3 me-2"></i>注册时间: {{ formatDate(userStore.userInfo?.created_at) }}
                  </div>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <!-- Status -->
              <li>
                <div class="dropdown-item-text">
                  <div class="d-flex align-items-center">
                    <span class="status-indicator" :class="userStatusClass"></span>
                    <span class="ms-2">{{ userStatusText }}</span>
                  </div>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <!-- Logout -->
              <li>
                <button 
                  class="dropdown-item text-danger d-flex align-items-center" 
                  @click="logout"
                >
                  <i class="bi bi-box-arrow-right me-2"></i>
                  <span>{{ t('common.user.logout') }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  height: 64px;
  border-bottom: 1px solid var(--bs-border-color);
}

/* 调整右侧元素的对齐方式 */
.d-flex.align-items-center {
  height: 100%;  /* 确保容器高度与导航栏一致 */
}

/* 调整下拉菜单项的样式 */
.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.dropdown-item i {
  font-size: 1rem;
  width: 1.25rem;
  text-align: center;
}

/* 调整头像容器样式 */
.avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 调整按钮样式 */
.btn-link.nav-link {
  color: var(--bs-body-color);
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.btn-link.nav-link:hover {
  background-color: var(--bs-light);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
  padding-top: 2rem;
}

/* 深色模式适配 */
[data-bs-theme="dark"] .navbar {
  border-bottom-color: var(--bs-border-color);
  background-color: var(--bs-dark);
}

[data-bs-theme="dark"] .main-content {
  background-color: var(--bs-tertiary-bg);
}

[data-bs-theme="dark"] .btn-link.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 添加主题切换图标的样式 */
.theme-icon {
  font-size: 1rem !important;  /* 减小图标大小 */
}

.theme-icon :deep(i) {
  font-size: 1rem !important;  /* 确保图标内部也使用相同大小 */
}

/* 添加禁用项的样式 */
.dropdown-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

[data-bs-theme="dark"] .dropdown-item.disabled {
  color: var(--bs-secondary);
}

/* 添加导航品牌链接样式 */
.navbar-brand {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dropdown-item-text {
  padding: 0.5rem 1rem;
}

.dropdown-menu {
  min-width: 280px;
}

.avatar {
  position: relative;
}

.avatar::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--bs-success);
  border: 2px solid var(--bs-body-bg);
}

[data-bs-theme="dark"] .avatar::after {
  border-color: var(--bs-dark);
}

/* 调整导航栏右侧容器样式 */
.nav-actions {
  gap: 0.5rem !important; /* 减小间距 */
}

/* 调整导航项样式 */
.nav-item {
  display: flex;
  align-items: center;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-actions {
    gap: 0.25rem !important; /* 进一步减小间距 */
  }
  
  /* 调整按钮内边距 */
  .btn-icon {
    padding: 0.35rem !important;
  }
  
  /* 调整导航栏高度 */
  .navbar {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  /* 隐藏品牌名称 */
  .navbar-brand {
    font-size: 0.9rem;
  }
}

/* 深色模式适配 */
[data-bs-theme="dark"] .nav-actions {
  border-color: var(--bs-border-color);
}

/* 移动端适配优化 */
@media (max-width: 375px) { /* iPhone SE 尺寸 */
  .container-fluid {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }

  .navbar-brand {
    font-size: 0.85rem;
    margin-right: 0.5rem !important;
  }

  .nav-actions {
    gap: 0.25rem !important;
  }

  .btn-link.nav-link {
    padding: 0.25rem !important;
  }

  .avatar {
    width: 28px;
    height: 28px;
  }

  /* 调整图标大小 */
  .theme-icon {
    font-size: 0.9rem !important;
  }

  .theme-icon :deep(i) {
    font-size: 0.9rem !important;
  }

  /* 确保下拉菜单不会被截断 */
  .dropdown-menu {
    right: 0;
    left: auto;
    margin-top: 0.5rem;
  }
}

/* 优化导航栏高度 */
.navbar {
  min-height: 56px; /* 减小导航栏最小高度 */
  height: auto; /* 允许自适应高度 */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

/* 优化导航项间距 */
.nav-actions {
  gap: 0.35rem !important;
}

/* 优化按钮内边距 */
.btn-link.nav-link {
  padding: 0.35rem;
}
</style> 