<template>
  <div class="w-full max-w-sm">
    <!-- Title -->
    <h1 class="text-xl font-medium text-center mb-6">{{ t('auth.register.title') }}</h1>
    <p class="text-sm text-center mb-6 text-base-content/60">{{ t('auth.register.welcome') }}</p>

    <!-- Success Alert -->
    <div v-if="success" class="alert alert-success mb-4 p-3">
      <div class="flex items-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm flex-1">{{ t('auth.register.success.message') }}</span>
        <span class="badge badge-primary badge-sm">{{ countdown }}s</span>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error mb-4 p-3">
      <div class="flex items-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm flex-1">{{ translateError(error) }}</span>
        <button class="btn btn-ghost btn-xs p-0 min-h-0 h-4 w-4" @click="error = null">✕</button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Username Input -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.register.form.username') }}</span>
        </label>
        <input type="text" 
          :placeholder="t('auth.register.form.usernamePlaceholder')" 
          class="input input-bordered w-full h-10"
          :class="{ 'input-error': v$.username.$error }"
          v-model="form.username" 
          @blur="v$.username.$touch()" />
        <label class="label py-0.5" v-if="v$.username.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.username.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Phone Input -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.register.form.phone') }}</span>
        </label>
        <input type="tel" 
          :placeholder="t('auth.register.form.phonePlaceholder')" 
          class="input input-bordered w-full h-10"
          :class="{ 'input-error': v$.phone.$error }"
          v-model="form.phone" 
          @blur="v$.phone.$touch()" />
        <label class="label py-0.5" v-if="v$.phone.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.phone.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Verification Code -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.register.form.code') }}</span>
        </label>
        <div class="join w-full">
          <input type="text" 
            :placeholder="t('auth.register.form.codePlaceholder')" 
            class="input input-bordered join-item flex-1 h-10"
            :class="{ 'input-error': v$.code.$error }"
            v-model="form.code"
            @blur="v$.code.$touch()" />
          <button type="button"
            class="btn join-item h-10 min-h-0" 
            :class="countdown > 0 ? 'btn-disabled' : 'btn-primary'"
            @click="handleSendCode"
            :disabled="!canSendCode">
            {{ countdown > 0 ? `${countdown}s` : t('auth.register.form.getCode') }}
          </button>
        </div>
        <label class="label py-0.5" v-if="v$.code.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.code.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Password Input -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.register.form.password') }}</span>
        </label>
        <div class="join w-full">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.register.form.passwordPlaceholder')" 
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
        <!-- Password Strength -->
        <div class="mt-1" v-if="form.password">
          <progress class="progress w-full h-1" :class="passwordStrengthBgClass" :value="passwordStrength" max="100"></progress>
          <div class="mt-1">
            <span class="text-xs text-base-content/60">{{ passwordStrengthText }}</span>
          </div>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text">{{ t('auth.register.form.confirmPassword') }}</span>
        </label>
        <div class="join w-full">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.register.form.confirmPasswordPlaceholder')" 
            class="input input-bordered join-item flex-1 h-10"
            :class="{ 'input-error': v$.confirmPassword.$error }"
            v-model="form.confirmPassword"
            @blur="v$.confirmPassword.$touch()" />
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
        <label class="label py-0.5" v-if="v$.confirmPassword.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.confirmPassword.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Agreement -->
      <div class="form-control w-full">
        <label class="label cursor-pointer justify-start gap-2">
          <input type="checkbox" 
            class="checkbox checkbox-primary checkbox-sm" 
            v-model="form.agreement" 
            @blur="v$.agreement.$touch()" />
          <span class="label-text">
            {{ t('auth.register.form.agreement') }}
            <a class="link link-primary" @click.prevent="showTerms">
              {{ t('auth.register.form.terms') }}
            </a>
          </span>
        </label>
        <label class="label py-0.5" v-if="v$.agreement.$error">
          <span class="label-text-alt text-error text-xs">{{ v$.agreement.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <button type="submit" 
          class="btn btn-primary w-full h-10 min-h-0" 
          :disabled="!canSubmit || loading">
          <span v-if="loading" class="loading loading-spinner loading-xs"></span>
          {{ loading ? t('common.system.loading') : t('auth.register.form.register') }}
        </button>
      </div>

      <!-- Login Link -->
      <div class="text-center text-sm mt-4">
        {{ t('auth.register.form.hasAccount') }}
        <router-link to="/auth/login" class="link link-primary">
          {{ t('auth.register.form.login') }}
        </router-link>
      </div>

      <!-- Social Login -->
      <template v-if="showWechatLogin">
        <div class="divider text-xs">{{ t('auth.register.form.or') }}</div>
        <div class="text-center">
          <button type="button" class="btn btn-ghost btn-circle" @click="router.push('/auth/wx-auth')">
            <img src="https://api.zhycit.com/alioss2/icons/tubiaopng/wx_online.png" 
                 alt="WeChat" width="20" height="20">
          </button>
        </div>
      </template>
    </form>

    <!-- Terms Modal -->
    <Terms ref="termsModalRef" @accept="acceptTerms" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { userApi } from '@/api/user'
import Terms from './Terms.vue'  // 取消注释，导入 Terms 组件
import type { RegisterForm, AuthFormRules } from './types'
import type { ApiResponse } from '@/api/types'


// 在 setup 前添加接口定义
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string
    }
  }
}

export default defineComponent({
  name: 'Register',
  components: {
    Terms  // 添加 Terms 组件
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const form = reactive<RegisterForm>({
      username: '',
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      agreement: false,
      verified: false
    })

    const rules: AuthFormRules = {
      username: {
        required: helpers.withMessage(() => t('auth.register.validation.usernameRequired'), required),
        minLength: helpers.withMessage(
          ({ $params }) => t('auth.register.validation.usernameMinLength', { min: $params.min }),
          minLength(3)
        ),
        maxLength: helpers.withMessage(
          ({ $params }) => t('auth.register.validation.usernameMaxLength', { max: $params.max }),
          maxLength(20)
        )
      },
      phone: {
        required: helpers.withMessage(() => t('auth.register.validation.phoneRequired'), required),
        minLength: helpers.withMessage(
          () => t('auth.register.validation.phoneRequired'),
          minLength(11)
        ),
        pattern: helpers.withMessage(
          () => t('auth.register.validation.phoneFormat'),
          helpers.regex(/^1[3-9]\d{9}$/)
        )
      },
      code: {
        required: helpers.withMessage(() => t('auth.register.validation.codeRequired'), required),
        pattern: helpers.withMessage(
          () => t('auth.register.validation.codeFormat'),
          helpers.regex(/^\d{6}$/)
        )
      },
      password: {
        required: helpers.withMessage(() => t('auth.register.validation.passwordRequired'), required),
        minLength: helpers.withMessage(
          ({ $params }) => t('auth.register.validation.passwordMinLength', { min: $params.min }),
          minLength(8)
        ),
        strongPassword: helpers.withMessage(
          () => t('auth.register.validation.passwordStrength'),
          helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        )
      },
      confirmPassword: {
        required: helpers.withMessage(() => t('auth.register.validation.confirmPasswordRequired'), required),
        sameAsPassword: helpers.withMessage(
          () => t('auth.register.validation.passwordMismatch'),
          value => value === form.password
        )
      },
      agreement: {
        required: helpers.withMessage(() => t('auth.register.validation.agreementRequired'), required)
      }
    }

    const v$ = useVuelidate(rules, form) as any // 临时解决方案，或使用更具体的类型
    const loading = ref(false)
    const error = ref<ApiError | null>(null)
    const success = ref(false)
    const countdown = ref(0)
    const showPassword = ref(false)
    const showWechatLogin = ref(false)
    const termsModalRef = ref<InstanceType<typeof Terms> | null>(null)
    let countdownTimer: ReturnType<typeof setTimeout> | null = null
    let redirectTimer: ReturnType<typeof setTimeout> | null = null

    // 计算属性
    const canSendCode = computed(() => {
      return form.phone && !v$.value.phone.$error
    })

    const canSubmit = computed(() => {
      return !v$.value.$invalid &&
        form.verified &&
        form.agreement &&
        !loading.value
    })

    const passwordStrength = computed(() => {
      const password = form.password
      if (!password) return 0

      let strength = 0
      if (password.length >= 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[a-z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 12.5
      if (/[^A-Za-z0-9]/.test(password)) strength += 12.5

      return Math.min(strength, 100)
    })

    const passwordStrengthBgClass = computed(() => {
      const strength = passwordStrength.value
      if (strength < 40) return 'bg-red-500'
      if (strength < 60) return 'bg-yellow-500'
      if (strength < 80) return 'bg-primary'
      return 'bg-green-500'
    })

    const passwordStrengthText = computed(() => {
      const strength = passwordStrength.value
      if (strength < 30) return t('auth.register.validation.passwordWeak')
      if (strength < 60) return t('auth.register.validation.passwordMedium')
      if (strength < 80) return t('auth.register.validation.passwordStrong')
      return t('auth.register.validation.passwordVeryStrong')
    })

    // 方法
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    // Terms 相关方法
    const showTerms = () => {
      if (termsModalRef.value) {
        termsModalRef.value.showModal()
      }
    }

    const acceptTerms = () => {
      form.agreement = true
    }

    // 错误信息转换函数
    const translateError = (error: ApiError | string | null) => {
      if (!error) return ''

      // 获取错误信息
      const message = typeof error === 'string' ? error : error?.response?.data?.message || error?.message || ''

      // 检查是否是已知错误类型
      const knownErrors = ['phoneExists', 'invalidCode', 'systemError']
      const errorKey = knownErrors.find(key => message.includes(key))
      
      if (errorKey) {
        return t(`auth.register.errors.${errorKey}`)
      }

      return message
    }

    // 发送验证码
    const handleSendCode = async () => {
      if (countdown.value > 0 || !canSendCode.value) return

      try {
        await v$.value.phone.$touch()
        if (v$.value.phone.$error) return

        loading.value = true
        error.value = null

        await userApi.auth.sendVerificationCode({
          phone: form.phone,
          type: 'register'
        })

        countdown.value = 60
        countdownTimer = setInterval(() => {
          countdown.value--
          if (countdown.value <= 0 && countdownTimer) {
            clearInterval(countdownTimer)
            countdownTimer = null
          }
        }, 1000)
      } catch (err) {
        error.value = {
          message: (err as any)?.response?.data?.message || String(err)
        } as ApiError
        form.verified = false
      } finally {
        loading.value = false
      }
    }

    // 验证码输入后自动校验
    watch(() => form.code, async (newCode) => {
      if (newCode?.length === 6) {
        try {
          loading.value = true
          error.value = null

          userApi.auth.verifyCode({
            phone: form.phone,
            code: newCode,
            type: 'register'
          }).then((res: ApiResponse<any>) => {
            console.log('code res:', res)

            if (res?.data?.code === 200) {
              form.verified = true
            } else {
              error.value = {
                message: res?.data?.message
              } as ApiError
              form.verified = false
            }
          })


        } catch (err) {
          error.value = {
            message: (err as any)?.response?.data?.message || String(err)
          } as ApiError
          form.verified = false
        } finally {
          loading.value = false
        }
      } else {
        form.verified = false
      }
    })

    // 注册提交
    const handleSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) return

      if (!form.verified) {
        error.value = new Error(t('auth.register.validation.codeNotVerified'))
        return
      }

      loading.value = true
      error.value = null

      try {
        await userApi.auth.register({
          username: form.username,
          phone: form.phone,
          password: form.password,
          code: form.code
        })

        router.push('/auth/login')
      } catch (err) {
        error.value = {
          message: (err as any)?.response?.data?.message || String(err)
        } as ApiError
      } finally {
        loading.value = false
      }
    }

    // 生命周期钩子
    onMounted(() => {
      // 初始化模态框 - 我们将使用DaisyUI的modal
      // DaisyUI模态框不需要JavaScript初始化，它使用HTML和CSS控制
      
      // 检查是否显示微信登录
      const thirdAuth = proxy?.$JAC?.thirdAuth || []
      showWechatLogin.value = Array.isArray(thirdAuth) && thirdAuth.indexOf('wechat') !== -1
    })

    onUnmounted(() => {
      if (countdown.value <= 0 && countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
      if (redirectTimer) {
        clearInterval(redirectTimer)
      }
      // DaisyUI模态框不需要销毁
    })

    const redirectCountdown = ref(3)

    return {
      form,
      v$,
      loading,
      error,
      success,
      countdown,
      showPassword,
      showWechatLogin,
      termsModalRef,
      redirectCountdown,
      canSendCode,
      canSubmit,
      passwordStrength,
      passwordStrengthBgClass,
      passwordStrengthText,
      togglePassword,
      showTerms,
      acceptTerms,
      translateError,
      handleSendCode,
      handleSubmit,
      t,
      router
    }
  }
})
</script>
