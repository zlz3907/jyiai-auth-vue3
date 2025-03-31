<template>
  <div class="w-full max-w-sm">
    <!-- Title -->
    <h1 class="text-xl font-medium text-center mb-6">{{ t('auth.login.title') }}</h1>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error alert-sm mb-4">
      <i class="bi bi-exclamation-circle text-sm"></i>
      <span class="text-sm">{{ error }}</span>
      <button class="btn btn-ghost btn-xs" @click="error = null">✕</button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Phone Input -->
      <div class="form-control">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.login.form.phone') }}</span>
        </label>
        <input type="tel" 
          :placeholder="t('auth.login.form.phonePlaceholder')" 
          class="input input-bordered w-full h-10"
          :class="{ 'input-error': v$.phone.$error }"
          v-model="form.phone" 
          @blur="v$.phone.$touch()" />
        <label class="label py-0.5" v-if="v$.phone.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.phone.$errors[0].$message }}</span>
        </label>
      </div>
      
      <!-- Password Input -->
      <div class="form-control">
        <label class="label pt-0 flex justify-between">
          <span class="label-text">{{ t('auth.login.form.password') }}</span>
          <router-link to="/auth/forgot-password" class="link link-primary text-xs">
            {{ t('auth.login.form.forgot') }}
          </router-link>
        </label>
        <div class="join w-full">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.login.form.passwordPlaceholder')" 
            class="input input-bordered join-item flex-1 h-10"
            :class="{ 'input-error': v$.password.$error }"
            v-model="form.password" 
            @blur="v$.password.$touch()" />
          <button type="button" 
            class="btn join-item h-10 min-h-0 px-3" 
            @click="togglePassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4" 
              :class="{ 'opacity-50': !showPassword }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
              <path 
                v-if="!showPassword"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path 
                v-if="!showPassword"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path
                v-if="showPassword"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <label class="label py-0.5" v-if="v$.password.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.password.$errors[0].$message }}</span>
        </label>
      </div>
      
      <!-- Remember Me -->
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2 py-0">
          <input type="checkbox" class="checkbox checkbox-xs" v-model="form.remember" />
          <span class="label-text text-sm">{{ t('auth.login.form.remember') }}</span>
        </label>
      </div>
      
      <!-- Login Button -->
      <button type="submit" class="btn btn-primary w-full h-10 min-h-0" :disabled="v$.$invalid || loading">
        <span v-if="loading" class="loading loading-spinner loading-xs"></span>
        {{ loading ? t('common.system.loading') : t('auth.login.form.login') }}
      </button>

      <!-- Register Link -->
      <div class="text-center text-sm">
        {{ t('auth.login.noAccount') }}
        <router-link to="/auth/register" class="link link-primary">
          {{ t('auth.login.register') }}
        </router-link>
      </div>
      
      <!-- WeChat Login -->
      <template v-if="showWechatLogin">
        <div class="divider text-xs">{{ t('auth.register.form.or') }}</div>
        <button type="button" class="btn btn-ghost btn-circle mx-auto" @click="router.push('/auth/wx-auth')">
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