<template>
  <div class=" jyiai-form jyiai-mx-auto jyiai-form-animate">
    <!-- Title -->
    <h1 class="jyiai-text-xl jyiai-font-medium jyiai-text-center jyiai-mb-6">{{ t('auth.register.title') }}</h1>
    <p class="jyiai-text-sm jyiai-text-center jyiai-mb-6 jyiai-opacity-70">{{ t('auth.register.welcome') }}</p>

    <!-- Success Alert -->
    <div v-if="success" class="jyiai-alert jyiai-alert-success mb-4 p-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ t('auth.register.success.message') }}</span>
      <span class="jyiai-badge">{{ countdown }}s</span>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="jyiai-alert jyiai-alert-error mb-4 p-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ translateError(error) }}</span>
      <button class="jyiai-btn jyiai-btn-ghost jyiai-btn-xs" @click="error = null">✕</button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Username Input -->
      <div class="jyiai-form-control">
        <label class="jyiai-label">
          {{ t('auth.register.form.username') }}
        </label>
        <input type="text" 
          :placeholder="t('auth.register.form.usernamePlaceholder')" 
          class="jyiai-input"
          :class="{ 'jyiai-input-error': v$.username.$error }"
          v-model="form.username" 
          @blur="v$.username.$touch()" />
        <div v-if="v$.username.$error" class="jyiai-error-text">
          {{ v$.username.$errors[0].$message }}
        </div>
      </div>

      <!-- Phone Input -->
      <div class="jyiai-form-group">
        <label class="jyiai-label">
          {{ t('auth.register.form.phone') }}
        </label>
        <div class="jyiai-input-group">
          <!-- <div class="jyiai-input-addon">+86</div> -->
          <input type="tel" 
            :placeholder="t('auth.register.form.phonePlaceholder')" 
            class="jyiai-input"
            :class="{ 'jyiai-input-error': v$.phone.$error }"
            v-model="form.phone"
            @blur="v$.phone.$touch()" />
        </div>
        <div v-if="v$.phone.$error" class="jyiai-error-text">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>

      <!-- Verification Code -->
      <div class="jyiai-form-control">
        <label class="jyiai-label">
          {{ t('auth.register.form.code') }}
        </label>
        <div class="jyiai-join w-full">
          <input type="text" 
            :placeholder="t('auth.register.form.codePlaceholder')" 
            class="jyiai-input jyiai-join-item flex-1"
            :class="{ 'jyiai-input-error': v$.code.$error }"
            v-model="form.code"
            @blur="v$.code.$touch()" />
          <button type="button"
            class="jyiai-btn jyiai-join-item" 
            :class="countdown > 0 ? 'jyiai-btn-disabled' : 'jyiai-btn-primary'"
            @click="handleSendCode"
            :disabled="!canSendCode">
            {{ countdown > 0 ? `${countdown}s` : t('auth.register.form.getCode') }}
          </button>
        </div>
        <div v-if="v$.code.$error" class="jyiai-error-text">
          {{ v$.code.$errors[0].$message }}
        </div>
      </div>

      <!-- Password Input -->
      <div class="jyiai-form-group">
        <label class="jyiai-label">
          {{ t('auth.register.form.password') }}
        </label>
        <div class="jyiai-input-group">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.register.form.passwordPlaceholder')" 
            class="jyiai-input"
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
        <!-- Password Strength -->
        <div class="mt-1" v-if="form.password">
          <progress class="jyiai-progress w-full h-1" :class="passwordStrengthBgClass" :value="passwordStrength" max="100"></progress>
          <div class="mt-1">
            <span class="text-xs opacity-70">{{ passwordStrengthText }}</span>
          </div>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="jyiai-form-group">
        <label class="jyiai-label">
          {{ t('auth.register.form.confirmPassword') }}
        </label>
        <div class="jyiai-input-group">
          <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="t('auth.register.form.confirmPasswordPlaceholder')" 
            class="jyiai-input"
            :class="{ 'jyiai-input-error': v$.confirmPassword.$error }"
            v-model="form.confirmPassword"
            @blur="v$.confirmPassword.$touch()" />
          <button type="button" 
            class="jyiai-input-addon" 
            @click="togglePassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'">
            <div class="jyiai-password-toggle" :class="{ 'show': showPassword }"></div>
          </button>
        </div>
        <div v-if="v$.confirmPassword.$error" class="jyiai-error-text">
          {{ v$.confirmPassword.$errors[0].$message }}
        </div>
      </div>

      <!-- Agreement -->
      <div class="jyiai-form-control">
        <div class="jyiai-flex jyiai-items-center jyiai-justify-start">
          <input type="checkbox" 
            class="jyiai-checkbox jyiai-checkbox-primary jyiai-checkbox" 
            v-model="form.agreement" 
            @blur="v$.agreement.$touch()" />
          <label class="jyiai-label-text">
            {{ t('auth.register.form.agreement') }}
            <a class="jyiai-link jyiai-link-primary" @click.prevent="showTerms">
              {{ t('auth.register.form.terms') }}
            </a>
          </label>
        </div>
        <label class="jyiai-label py-0.5" v-if="v$.agreement.$error">
          <span class="jyiai-label-text-alt jyiai-text-error jyiai-text-xs">{{ v$.agreement.$errors[0].$message }}</span>
        </label>
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <button type="submit" 
          class="jyiai-btn jyiai-btn-primary jyiai-w-full" 
          :disabled="!canSubmit || loading">
          <span v-if="loading" class="jyiai-loading jyiai-loading-spinner jyiai-loading-xs"></span>
          {{ loading ? t('common.system.loading') : t('auth.register.form.register') }}
        </button>
      </div>

      <!-- Login Link -->
      <div class="jyiai-flex jyiai-items-center jyiai-justify-center jyiai-text-sm jyiai-mt-4">
        {{ t('auth.register.form.hasAccount') }}
        <router-link to="/auth/login" class="jyiai-link jyiai-link-primary">
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
