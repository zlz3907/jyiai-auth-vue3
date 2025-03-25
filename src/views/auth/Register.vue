<template>
  <div class=" border-0 bg-transparent">
    <div class="card-body p-4">
      <!-- Alert -->
      <div class="mb-4">
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="success">
          <i class="bi bi-check-circle-fill me-2"></i>
          <span class="small">{{ t('auth.register.success.message') }}</span>
          <span class="ms-auto small">{{ countdown }}s</span>
        </div>
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <span class="small">{{ error?.response?.data?.message || error?.message || error }}</span>
          <button type="button" class="btn-close" @click="error = null"></button>
        </div>
      </div>

      <!-- Title -->
      <div class="text-center mb-4">
        <h1 class="fs-2 mt-2">{{ t('auth.register.title') }}</h1>
      </div>

      <!-- Form START -->
      <form @submit.prevent="handleSubmit">
        <!-- Username -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3" :class="{ 'border-danger': v$.username.$error }">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-person fs-5"></i>
            </span>
            <input type="text" class="form-control border-0 bg-transparent shadow-none" v-model="form.username"
              @blur="v$.username.$touch()" :placeholder="t('auth.register.form.usernamePlaceholder')">
          </div>
          <div class="text-danger small mt-1" v-if="v$.username.$error">
            {{ v$.username.$errors[0].$message }}
          </div>
        </div>

        <!-- Phone -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3" :class="{ 'border-danger': v$.phone.$error }">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-phone fs-5"></i>
            </span>
            <input type="tel" class="form-control border-0 bg-transparent shadow-none" v-model="form.phone"
              @blur="v$.phone.$touch()" :placeholder="t('auth.register.form.phonePlaceholder')">
          </div>
          <div class="text-danger small mt-1" v-if="v$.phone.$error">
            {{ v$.phone.$errors[0].$message }}
          </div>
        </div>

        <!-- Verification Code -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3" :class="{ 'border-danger': v$.code.$error }">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-shield-lock fs-5"></i>
            </span>
            <input type="text" class="form-control border-0 bg-transparent shadow-none" v-model="form.code"
              @blur="v$.code.$touch()" :placeholder="t('auth.register.form.codePlaceholder')">
            <button class="btn btn-link text-primary border-0 px-3" type="button" @click="handleSendCode"
              :disabled="!canSendCode || countdown > 0">
              {{ countdown > 0 ? `${countdown}s` : t('auth.register.form.getCode') }}
            </button>
          </div>
          <div class="text-danger small mt-1" v-if="v$.code.$error">
            {{ v$.code.$errors[0].$message }}
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3" :class="{ 'border-danger': v$.password.$error }">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-key fs-5"></i>
            </span>
            <input :type="showPassword ? 'text' : 'password'" class="form-control border-0 bg-transparent shadow-none"
              v-model="form.password" @blur="v$.password.$touch()"
              :placeholder="t('auth.register.form.passwordPlaceholder')">
            <button class="btn btn-link text-secondary border-0 px-3" type="button" @click="togglePassword">
              <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
            </button>
          </div>
          <div class="text-danger small mt-1" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </div>
          <!-- Password strength indicator -->
          <div class="mt-2 small text-secondary" v-if="form.password">
            <div class="progress" style="height: 4px;">
              <div class="progress-bar" :class="passwordStrengthClass" :style="{ width: passwordStrength + '%' }">
              </div>
            </div>
            <small class="mt-1 d-block">{{ passwordStrengthText }}</small>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3"
            :class="{ 'border-danger': v$.confirmPassword.$error }">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-key-fill fs-5"></i>
            </span>
            <input :type="showPassword ? 'text' : 'password'" class="form-control border-0 bg-transparent shadow-none"
              v-model="form.confirmPassword" @blur="v$.confirmPassword.$touch()"
              :placeholder="t('auth.register.form.confirmPasswordPlaceholder')">
          </div>
          <div class="text-danger small mt-1" v-if="v$.confirmPassword.$error">
            {{ v$.confirmPassword.$errors[0].$message }}
          </div>
        </div>

        <!-- Agreement -->
        <div class="mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" :class="{ 'is-invalid': v$.agreement.$error }"
              v-model="form.agreement" id="agreementCheck" @blur="v$.agreement.$touch()">
            <label class="form-check-label small" for="agreementCheck">
              {{ t('auth.register.form.agreement') }}
              <a href="#" class="text-primary text-decoration-none" @click.prevent="acceptTerms">
                {{ t('auth.register.form.terms') }}
              </a>
            </label>
            <div class="text-danger small mt-1" v-if="v$.agreement.$error">
              {{ v$.agreement.$errors[0].$message }}
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-lg w-100 mb-3" :class="canSubmit ? 'btn-primary' : 'btn-secondary'"
          :disabled="!canSubmit || loading || !form.agreement">
          <span class="spinner-border spinner-border-sm me-2" v-if="loading"></span>
          {{ loading ? t('common.system.loading') : t('auth.register.form.register') }}
        </button>

        <!-- Sign in link -->
        <div class="text-center mb-3">
          <p class="mb-0 small">
            {{ t('auth.register.form.hasAccount') }}
            <router-link to="/auth/login" class="text-primary text-decoration-none">
              {{ t('auth.register.form.login') }}
            </router-link>
          </p>
        </div>

        <!-- Divider -->
        <div class="position-relative my-4" v-if="showWechatLogin">
          <hr>
          <span class="position-absolute top-50 start-50 translate-middle px-3 bg-white small">
            {{ t('auth.register.form.or') }}
          </span>
        </div>

        <!-- Social buttons -->
        <div class="d-grid" v-if="showWechatLogin">
          <button type="button" class="btn btn-link p-2" style="height: 48px; width: 48px; margin: 0 auto;"
            @click="router.push('/auth/wx-auth')">
            <img src="https://api.zhycit.com/alioss2/icons/tubiaopng/wx_online.png" alt="WeChat" width="32" height="32">
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Terms Modal -->
  <!-- <Terms ref="termsModalRef" @accept="acceptTerms" /> -->
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import * as bootstrap from 'bootstrap'
import { userApi } from '@/api/user'
// import Terms from './Terms.vue'  // 导入 Terms 组件
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
    // Terms
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
          () => t('auth.register.validation.phoneLength'),
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
    const termsModalEl = ref(null)  // 改名以避免混淆
    let termsModal: typeof bootstrap.Modal | null = null  // 使用 typeof 获取类型
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

    const passwordStrengthClass = computed(() => {
      const strength = passwordStrength.value
      if (strength < 30) return 'bg-danger'
      if (strength < 60) return 'bg-warning'
      if (strength < 80) return 'bg-info'
      return 'bg-success'
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

    // 在 setup 函数中添加 termsModalRef 的定义
    // const termsModalRef = ref<InstanceType<typeof Terms> | null>(null)

    // Terms 相关方法
    // const showTerms = () => {
    //   if (termsModalRef.value) {
    //     termsModalRef.value.showModal()
    //   }
    // }

    const acceptTerms = () => {
      form.agreement = true
    }

    // 错误信息转换函数
    const translateError = (error: ApiError | string | null) => {
      if (!error) return ''

      // 获取错误信息
      const message = typeof error === 'string' ? error : error.message || ''

      return t(`auth.register.errors.${message}`, {}, {
        default: message
      })
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
      // 初始化模态框
      const modalEl = document.getElementById('termsModal')
      if (modalEl) {
        termsModal = new bootstrap.Modal(modalEl, {
          keyboard: false,
          backdrop: 'static'
        })
      }

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
      if (termsModal) {
        termsModal.dispose()
        termsModal = null
      }
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
      termsModalEl,
      termsModal,
      redirectCountdown,
      canSendCode,
      canSubmit,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthText,
      togglePassword,
      // showTerms,
      acceptTerms,
      translateError,
      handleSendCode,
      handleSubmit,
      t,
      // termsModalRef,
      router
    }
  }
})
</script>
