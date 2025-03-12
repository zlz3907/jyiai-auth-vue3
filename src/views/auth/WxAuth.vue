<template>
  <div class="border-0 bg-transparent">
    <div class="card-body p-4">
      <!-- Title -->
      <div class="text-center mb-4">
        <h1 class="fs-2 mt-2">{{ t('auth.wxAuth.title') }}</h1>
        <p class="lead text-secondary mb-4">{{ t('auth.wxAuth.subtitle') }}</p>
      </div>

      <!-- QR Code -->
      <div v-if="!isMobile" class="gpt-qrcode d-flex justify-content-center">
        <iframe 
          id="wxIframe" 
          height="450px" 
          width="300px" 
          :src="frameSrc"
        ></iframe>
      </div>

      <!-- Back to login -->
      <div class="text-center mt-4">
        <router-link to="/auth/login" class="text-primary text-decoration-none small">
          {{ t('auth.wxAuth.backToLogin') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import storage from '@/utils/storage'

export default defineComponent({
  name: 'WxAuth',
  
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    // 状态
    const isMobile = ref(false)
    const isShow = ref(true)
    const frameSrc = ref('')

    // 检测是否移动设备
    const checkMobile = () => {
      isMobile.value = /mobile|android|iphone|ios/.test(navigator.userAgent.toLowerCase())
    }

    // 构建微信登录URL
    const buildWxLoginUrl = () => {
      const baseUrl = proxy?.$JAC?.wxLoginUrl || '/yll/wechat/gzh/user/login_index'
      const authKey = proxy?.$JAC?.authKey || 'ai_h5_gpt_home'
      const refer = router.currentRoute.value.query.refer as string

      if (baseUrl) {
        frameSrc.value = `${baseUrl}?key=${authKey}${refer ? '&refer=' + refer : ''}`
      }
    }

    // 监听登录状态
    let authCheckTimer: number
    const startAuthCheck = () => {
      authCheckTimer = window.setInterval(() => {
        // 从 localStorage 检查登录状态
        const token = storage.getItem('token')
        const userInfo = storage.getItem('userInfo')

        if (token && userInfo) {
          // 登录成功
          clearInterval(authCheckTimer)
          // userStore.setToken(token)
          // userStore.setUserInfo(JSON.parse(userInfo))
          
          // 跳转到首页或来源页
          const redirect = router.currentRoute.value.query.redirect as string || '/'
          router.push(redirect)
        }
      }, 1000)
    }

    onMounted(() => {
      checkMobile()
      buildWxLoginUrl()
      startAuthCheck()

      console.log('JYIAIAuthConfig:', proxy?.$JAC)
    })

    onUnmounted(() => {
      if (authCheckTimer) {
        clearInterval(authCheckTimer)
      }
    })

    return {
      isMobile,
      isShow,
      frameSrc,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.gpt-qrcode {
  position: relative;
  max-width: 18.8rem;
  margin: auto;

  &:before {
    position: absolute;
    content: "使用微信扫一扫登录";
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    height: 7rem;
    bottom: 0;
    background: var(--bs-light) url("https://zhycit-static.oss-cn-beijing.aliyuncs.com/aimetaa/aimetaa.svg") no-repeat bottom;
    background-size: 9rem !important;
    background-position-y: 3rem !important;
  }
}

[data-bs-theme=dark] {
  .gpt-qrcode {
    &:before {
      background: var(--bs-light) url("https://zhycit-static.oss-cn-beijing.aliyuncs.com/aimetaa/aimetaa-light.svg") no-repeat bottom;
    }
  }
}

@media (max-height: 700px) {
  .gpt-qrcode {
    max-height: 22rem;
    overflow: hidden;

    &:before {
      height: 2rem;
    }
  }
}
</style>
