<template>
  <div class="register-form-container">
    <!-- Alert -->
    <div class="alert-container mb-4">
      <div class="alert alert-success d-flex align-items-center shadow-sm" role="alert" v-if="success">
        <i class="bi bi-check-circle-fill me-2"></i>
        <div class="small">{{ t('auth.register.success.message') }}</div>
        <div class="ms-auto small">{{ countdown }}s</div>
      </div>
      <div class="alert alert-danger d-flex align-items-center shadow-sm" role="alert" v-if="error">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <div class="small">{{ error?.response?.data?.message || error?.message || error }}</div>
        <button type="button" class="btn-close ms-auto" @click="error = null"></button>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-4">
      <span class="mb-0 display-6 d-block">👋</span>
      <h1 class="h2 mt-2">{{ t('auth.register.title') }}</h1>
    </div>

    <!-- Form START -->
    <form class="mt-4" @submit.prevent="handleSubmit">
      <!-- Username -->
      <div class="mb-3">
        <div class="input-group border rounded-3" :class="{ 'border-danger': v$.username.$error }">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-person fs-5"></i>
          </span>
          <input type="text" 
                 class="form-control bg-transparent border-0 shadow-none" 
                 v-model="form.username"
                 @blur="v$.username.$touch()"
                 :placeholder="t('auth.register.form.usernamePlaceholder')">
        </div>
        <div class="invalid-feedback d-block" v-if="v$.username.$error">
          {{ v$.username.$errors[0].$message }}
        </div>
      </div>

      <!-- Phone -->
      <div class="mb-3">
        <div class="input-group border rounded-3" :class="{ 'border-danger': v$.phone.$error }">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-phone fs-5"></i>
          </span>
          <input type="tel" 
                 class="form-control bg-transparent border-0 shadow-none" 
                 v-model="form.phone"
                 @blur="v$.phone.$touch()"
                 :placeholder="t('auth.register.form.phonePlaceholder')">
        </div>
        <div class="invalid-feedback d-block" v-if="v$.phone.$error">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>

      <!-- Verification Code -->
      <div class="mb-3">
        <div class="input-group border rounded-3" :class="{ 'border-danger': v$.code.$error }">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-shield-lock fs-5"></i>
          </span>
          <input type="text" 
                 class="form-control bg-transparent border-0 shadow-none" 
                 v-model="form.code"
                 @blur="v$.code.$touch()"
                 :placeholder="t('auth.register.form.codePlaceholder')">
          <button class="btn btn-link text-primary border-0 px-3" 
                  type="button"
                  @click="handleSendCode"
                  :disabled="!canSendCode || countdown > 0">
            {{ countdown > 0 ? `${countdown}s` : t('auth.register.form.getCode') }}
          </button>
        </div>
        <div class="invalid-feedback d-block" v-if="v$.code.$error">
          {{ v$.code.$errors[0].$message }}
        </div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <div class="input-group border rounded-3" :class="{ 'border-danger': v$.password.$error }">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-key fs-5"></i>
          </span>
          <input :type="showPassword ? 'text' : 'password'"
                 class="form-control bg-transparent border-0 shadow-none"
                 v-model="form.password"
                 @blur="v$.password.$touch()"
                 :placeholder="t('auth.register.form.passwordPlaceholder')">
          <button class="btn btn-link text-secondary border-0" type="button" @click="togglePassword">
            <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
          </button>
        </div>
        <div class="invalid-feedback d-block" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </div>
        <!-- Password strength indicator -->
        <div class="mt-1 small text-secondary" v-if="form.password">
          <div class="progress" style="height: 4px;">
            <div class="progress-bar" 
                 :class="passwordStrengthClass" 
                 :style="{ width: passwordStrength + '%' }">
            </div>
          </div>
          <small class="mt-1">{{ passwordStrengthText }}</small>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="mb-3">
        <div class="input-group border rounded-3" :class="{ 'border-danger': v$.confirmPassword.$error }">
          <span class="input-group-text bg-transparent border-0">
            <i class="bi bi-key-fill fs-5"></i>
          </span>
          <input :type="showPassword ? 'text' : 'password'"
                 class="form-control bg-transparent border-0 shadow-none"
                 v-model="form.confirmPassword"
                 @blur="v$.confirmPassword.$touch()"
                 :placeholder="t('auth.register.form.confirmPasswordPlaceholder')">
        </div>
        <div class="invalid-feedback d-block" v-if="v$.confirmPassword.$error">
          {{ v$.confirmPassword.$errors[0].$message }}
        </div>
      </div>

      <!-- Agreement -->
      <div class="mb-3">
        <div class="form-check">
          <input type="checkbox"
                 class="form-check-input"
                 :class="{ 'is-invalid': v$.agreement.$error }"
                 v-model="form.agreement"
                 id="agreementCheck"
                 @blur="v$.agreement.$touch()">
          <label class="form-check-label small" for="agreementCheck">
            {{ t('auth.register.form.agreement') }}
            <a href="#" class="text-primary text-decoration-none" @click.prevent="showTerms">
              {{ t('auth.register.form.terms') }}
            </a>
          </label>
          <div class="invalid-feedback" v-if="v$.agreement.$error">
            {{ v$.agreement.$errors[0].$message }}
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="d-grid mb-3">
        <button type="submit"
                class="btn btn-lg"
                :class="canSubmit ? 'btn-primary' : 'btn-secondary opacity-75'"
                :disabled="!canSubmit || loading || !form.agreement">
          <span class="spinner-border spinner-border-sm me-2" v-if="loading"></span>
          {{ loading ? t('common.system.loading') : t('auth.register.form.register') }}
        </button>
      </div>

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
      <div class="position-relative my-3">
        <hr>
        <p class="small position-absolute top-50 start-50 translate-middle bg-body px-2">
          {{ t('auth.register.form.or') }}
        </p>
      </div>

      <!-- Social buttons -->
      <div class="row g-2">
        <div class="col-sm-6">
          <button type="button"
                  class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center py-2"
                  disabled>
            <img src="https://zhycit.com/templates/eduport/assets/images/client/google.svg"
                 class="me-2" alt="Google" width="20" height="20">
            <span>Google</span>
          </button>
        </div>
        <div class="col-sm-6">
          <button type="button"
                  class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center py-2"
                  disabled>
            <i class="bi bi-facebook fs-5 me-2 text-primary"></i>
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- Terms Modal -->
  <Terms ref="termsModalRef" @accept="acceptTerms" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import * as bootstrap from 'bootstrap'
import {userApi} from '@/api/user'
import Terms from './Terms.vue'  // 导入 Terms 组件
import type { RegisterForm, AuthFormRules } from './types'
import { register, sendVerifyCode } from '@/api/auth'

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
    Terms
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()

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
    const termsModalEl = ref(null)  // 改名以避免混淆
    let termsModal: typeof bootstrap.Modal | null = null  // 使用 typeof 获取类型
    let countdownTimer: NodeJS.Timeout | null = null
    let redirectTimer: NodeJS.Timeout | null = null

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

    // Terms 相关方法
    const showTerms = () => {
      termsModalRef.value?.show()
    }

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
        
        await sendVerifyCode(form.phone)
        
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
          
          const res = await userApi.verification.verify({
            phone: form.phone,
            code: newCode,
            type: 'register'
          })
          
          if (res.code === 200) {  // 验证码验证通过
            form.verified = true
            // 可以添加成功提示
            // toast.success(t('auth.register.validation.codeVerifySuccess'))
          } else {
            error.value = {
              message: res.message
            } as ApiError
            form.verified = false
          }
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
        await register(form)
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

    const termsModalRef = ref<InstanceType<typeof Terms> | null>(null)
    const redirectCountdown = ref(3)

    return {
      form,
      v$,
      loading,
      error,
      success,
      countdown,
      showPassword,
      termsModalEl,
      termsModal,
      redirectCountdown,
      canSendCode,
      canSubmit,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthText,
      togglePassword,
      showTerms,
      acceptTerms,
      translateError,
      handleSendCode,
      handleSubmit,
      t
    }
  }
})
</script>

<style scoped>
/* 深色模式适配 */
[data-bs-theme="dark"] .input-group {
  background-color: var(--bs-dark);
}

[data-bs-theme="dark"] .form-control::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

/* 动画效果 */
.alert {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 