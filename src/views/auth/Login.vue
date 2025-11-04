<template>
  <div class="jyiai-form-animate jyiai-form jyiai-mx-auto">
    <!-- Title -->
    <h1 class="jyiai-text-xl jyiai-font-medium jyiai-text-center jyiai-mb-6">{{ t('auth.login.title') }}</h1>

    <!-- Error Alert -->
    <div v-if="error" class="jyiai-alert jyiai-alert-error mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="jyiai-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
      <button class="jyiai-btn jyiai-btn-ghost jyiai-btn-xs" @click="error = null">✕</button>
    </div>

    <form @submit.prevent="handleSubmit" class="jyiai-space-y-4">
      <!-- Phone Input -->
      <div class="jyiai-form-group">
        <label class="jyiai-label">
          {{ t('auth.login.form.phone') }}
        </label>
        <div class="jyiai-input-group">
          <input type="tel" 
            :placeholder="t('auth.login.form.phonePlaceholder')" 
            class="jyiai-input jyiai-input-primary"
            :class="{ 'jyiai-input-error': v$.phone.$error }"
            v-model="form.phone"
            @blur="v$.phone.$touch()" />
        </div>
        <div v-if="v$.phone.$error" class="jyiai-error-text">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Password Input -->
      <div class="jyiai-form-group">
        <div class="jyiai-flex jyiai-justify-between jyiai-items-center">
          <label class="jyiai-label">
            {{ t('auth.login.form.password') }}
          </label>
          <router-link to="/auth/forgot-password" class="jyiai-link jyiai-link-primary jyiai-text-xs jyiai-mb-2">
            {{ t('auth.login.form.forgot') }}
          </router-link>
        </div>
        <div class="jyiai-input-group">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.login.form.passwordPlaceholder')" 
            class="jyiai-input jyiai-input-secondary"
            :class="{ 'jyiai-input-error': v$.password.$error }"
            v-model="form.password"
            @blur="v$.password.$touch()" />
          <button type="button" 
            class="jyiai-input-addon" 
            @click="togglePassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'">
            <div class="jyiai-password-toggle" :class="{ 'show': showPassword }"></div>
          </button>
        </div>
        <div v-if="v$.password.$error" class="jyiai-error-text">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>
      
      <!-- Remember Me -->
      <div class="jyiai-flex jyiai-items-center jyiai-justify-start jyiai-mb-4">
        <input type="checkbox" class="jyiai-checkbox" v-model="form.remember" id="remember-me" />
        <label for="remember-me" class="jyiai-label-text jyiai-cursor-pointer">
          {{ t('auth.login.form.remember') }}
        </label>
      </div>
      
      <!-- Login Button -->
      <button type="submit" class="jyiai-btn jyiai-btn-primary jyiai-w-full" :disabled="v$.$invalid || loading">
        <span v-if="loading" class="jyiai-loading jyiai-loading-spinner jyiai-loading-sm jyiai-mr-2"></span>
        {{ loading ? t('common.system.loading') : t('auth.login.form.login') }}
      </button>

      <!-- Register Link -->
      <div class="jyiai-flex jyiai-items-center jyiai-justify-center jyiai-text-sm jyiai-mt-4">
        {{ t('auth.login.noAccount') }}
        <router-link to="/auth/register" class="jyiai-mt-0 jyiai-form-link">
          {{ t('auth.login.register') }}
        </router-link>
      </div>
      
      <!-- WeChat Login -->
      <template v-if="showWechatLogin">
        <div class="jyiai-form-divider">{{ t('auth.register.form.or') }}</div>
        <button type="button" class="jyiai-btn jyiai-btn-ghost jyiai-btn-circle mx-auto" @click="router.push('/auth/wx-auth')">
          <img src="https://api.zhycit.com/alioss2/icons/tubiaopng/wx_online.png" 
               alt="WeChat" width="20" height="20">
        </button>
      </template>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
// import { useUserStore } from '@/stores/user'
import type { LoginForm } from './types'
import { userApi } from '@/api/user'
import { required, minLength, helpers } from '@vuelidate/validators'
import Cookies from 'js-cookie'
import storage from '@/utils/storage'

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const { proxy } = getCurrentInstance()!
    // const userStore = useUserStore()

    const form = reactive<LoginForm>({
      phone: storage.getItem('phone') || '',
      password: '',
      remember: storage.getItem('remember') || false
    })

    const rules = {
      phone: {
        required: helpers.withMessage(() => t('auth.login.validation.phoneRequired'), required),
        minLength: helpers.withMessage(() => t('auth.register.validation.phoneFormat'), minLength(11))
      },
      password: {
        required: helpers.withMessage(() => t('auth.login.validation.passwordRequired'), required),
        minLength: helpers.withMessage(({ $params }) => t('auth.register.validation.passwordMinLength', { min: $params.min }), minLength(6))
      }
    }

    const v$ = useVuelidate(rules, form)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const showPassword = ref(false)
    const showWechatLogin = ref(false)

    // 检查是否显示微信登录
    onMounted(() => {
      const thirdAuth = proxy?.$JAC?.thirdAuth || []
      showWechatLogin.value = Array.isArray(thirdAuth) && thirdAuth.indexOf('wechat') !== -1
    })

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) return

      loading.value = true
      error.value = null

      try {
        const res = await userApi.auth.login({
          phone: form.phone,
          password: form.password,
          remember: form.remember
        })

        storage.setItem('token', res?.token) 
        storage.setItem('userInfo', res?.user)
        storage.setItem('expiresAt', res?.expires_at)
        // userStore.setToken(res.token)
        // userStore.setUserInfo(res.user)

        if (form.remember) {
          storage.setItem('phone', form.phone)
          storage.setItem('remember', true)
        } else {
          storage.removeItem('phone')
          storage.removeItem('remember')
        }

        // 支持多种跳转参数
        const redirectUrl = route.query.redirect as string || 
                           route.query.backUrl as string || 
                           '/'
        router.push(redirectUrl)

        // 添加调试代码，检查 cookie 是否设置成功
        console.log('Cookie value:', redirectUrl, Cookies.get('JYIAIToken'))

      } catch (_error: any) {
        console.error(_error)
        error.value = _error?.response?.data?.message || _error?.message || t('common.system.error')
        form.password = ''
      } finally {
        loading.value = false
      }
    }

    const handleSendCode = async () => {
      if (!form.phone) {
        error.value = t('auth.login.validation.phoneRequired')
        return
      }

      try {
        await userApi.auth.sendVerificationCode({
          phone: form.phone,
          type: 'login'
        })
        error.value = null
      } catch (_error: any) {
        error.value = _error?.message || t('common.system.error')
      }
    }

    return {
      form,
      v$,
      loading,
      error,
      showPassword,
      togglePassword,
      handleSubmit,
      handleSendCode,
      t,
      router,
      showWechatLogin
    }
  }
})
</script>