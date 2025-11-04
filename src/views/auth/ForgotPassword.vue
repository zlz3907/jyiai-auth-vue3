<template>
  <div class="jyiai-w-full jyiai-max-w-sm">
    <!-- Success State -->
    <div v-if="isSuccess" class="jyiai-text-center jyiai-space-y-6">
      <div class="jyiai-flex jyiai-justify-center jyiai-mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="jyiai-h-16 jyiai-w-16 jyiai-text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="jyiai-space-y-2">
        <h2 class="jyiai-text-xl jyiai-font-medium">{{ t('auth.forgot.message.success') }}</h2>
        <p class="jyiai-text-base-content/60">{{ t('auth.forgot.message.redirectingIn', { seconds: redirectCountdown }) }}</p>
      </div>
      <div class="jyiai-pt-2">
        <button class="jyiai-btn jyiai-btn-primary jyiai-w-full jyiai-h-10 jyiai-min-h-0" @click="goToLogin">
          {{ t('auth.forgot.backToLogin') }}
        </button>
      </div>
    </div>

    <!-- Main Form -->
    <div v-else>
      <!-- Title -->
      <h1 class="jyiai-text-xl jyiai-font-medium jyiai-text-center jyiai-mb-6">{{ t('auth.forgot.title') }}</h1>
      <p class="jyiai-text-sm jyiai-text-center jyiai-mb-6 jyiai-text-base-content/60">{{ t('auth.forgot.subtitle') }}</p>

      <!-- Error Alert -->
      <div v-if="error" class="jyiai-alert jyiai-alert-error jyiai-mb-4 jyiai-p-3">
        <div class="jyiai-flex jyiai-items-center jyiai-w-full">
          <div class="jyiai-flex jyiai-items-center jyiai-gap-2 jyiai-flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="jyiai-stroke-current jyiai-shrink-0 jyiai-h-4 jyiai-w-4" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="jyiai-text-sm">{{ error }}</span>
          </div>
          <button class="jyiai-btn jyiai-btn-ghost jyiai-btn-xs jyiai-p-0 jyiai-min-h-0 jyiai-h-4 jyiai-w-4 jyiai-ml-2" @click="error = null">✕</button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="jyiai-space-y-4">
        <!-- Phone Input -->
        <div class="jyiai-form-control jyiai-w-full">
          <label class="jyiai-label jyiai-pt-0">
            <span class="jyiai-label-text">{{ t('auth.login.form.phone') }}</span>
          </label>
          <input type="tel" 
            :placeholder="t('auth.forgot.form.phonePlaceholder')" 
            class="jyiai-input jyiai-input-bordered jyiai-w-full jyiai-h-10"
            :class="{ 'jyiai-input-error': v$.phone.$error }"
            v-model="form.phone" 
            :disabled="step === 2"
            @blur="v$.phone.$touch()" />
          <label class="jyiai-label jyiai-py-0.5" v-if="v$.phone.$error">
            <span class="jyiai-label-text-alt jyiai-text-error jyiai-text-xs">{{ v$.phone.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- Verification Code -->
        <div class="jyiai-form-control" v-if="step === 2">
          <label class="jyiai-label jyiai-pt-0">
            <span class="jyiai-label-text">{{ t('auth.register.form.code') }}</span>
          </label>
          <div class="jyiai-join jyiai-w-full">
            <input type="text" 
              :placeholder="t('auth.forgot.form.codePlaceholder')" 
              class="jyiai-input jyiai-input-bordered jyiai-join-item jyiai-flex-1 jyiai-h-10"
              :class="{ 'jyiai-input-error': v$.code.$error }"
              v-model="form.code"
              @blur="v$.code.$touch()" />
            <button type="button"
              class="jyiai-btn jyiai-join-item jyiai-h-10 jyiai-min-h-0" 
              :class="countdown > 0 ? 'jyiai-btn-disabled' : 'jyiai-btn-primary'"
              @click="handleSendCode">
              {{ countdown > 0 ? `${countdown}s` : t('auth.forgot.form.sendCode') }}
            </button>
          </div>
          <label class="jyiai-label jyiai-py-0.5" v-if="v$.code.$error">
            <span class="jyiai-label-text-alt jyiai-text-error jyiai-text-xs">{{ v$.code.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- New Password -->
        <div class="jyiai-form-control" v-if="step === 2">
          <label class="jyiai-label jyiai-pt-0">
            <span class="jyiai-label-text">{{ t('auth.register.form.password') }}</span>
          </label>
          <div class="jyiai-join jyiai-w-full">
            <input :type="showPassword ? 'text' : 'password'" 
              :placeholder="t('auth.forgot.form.newPasswordPlaceholder')" 
              class="jyiai-input jyiai-input-bordered jyiai-join-item jyiai-flex-1 jyiai-h-10"
              :class="{ 'jyiai-input-error': v$.newPassword.$error }"
              v-model="form.newPassword"
              @blur="v$.newPassword.$touch()" />
            <button type="button" 
              class="jyiai-input-addon jyiai-join-item jyiai-h-10" 
              @click="togglePassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'">
              <div class="jyiai-password-toggle" :class="{ 'show': showPassword }"></div>
            </button>
          </div>
          <label class="jyiai-label jyiai-py-0.5" v-if="v$.newPassword.$error">
            <span class="jyiai-label-text-alt jyiai-text-error jyiai-text-xs">{{ v$.newPassword.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- Confirm Password -->
        <div class="jyiai-form-control" v-if="step === 2">
          <label class="jyiai-label jyiai-pt-0">
            <span class="jyiai-label-text">{{ t('auth.register.form.confirmPassword') }}</span>
          </label>
          <div class="jyiai-join jyiai-w-full">
            <input :type="showConfirmPassword ? 'text' : 'password'" 
              :placeholder="t('auth.register.form.confirmPasswordPlaceholder')" 
              class="jyiai-input jyiai-input-bordered jyiai-join-item jyiai-flex-1 jyiai-h-10"
              :class="{ 'jyiai-input-error': v$.confirmPassword.$error }"
              v-model="form.confirmPassword"
              @blur="v$.confirmPassword.$touch()" />
            <button type="button" 
              class="jyiai-input-addon jyiai-join-item jyiai-h-10" 
              @click="toggleConfirmPassword"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'">
              <div class="jyiai-password-toggle" :class="{ 'show': showConfirmPassword }"></div>
            </button>
          </div>
          <label class="jyiai-label jyiai-py-0.5" v-if="v$.confirmPassword.$error">
            <span class="jyiai-label-text-alt jyiai-text-error jyiai-text-xs">{{ v$.confirmPassword.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- Submit Button -->
        <div class="jyiai-w-full">
          <button type="submit" 
            class="jyiai-btn jyiai-btn-primary jyiai-w-full jyiai-h-10 jyiai-min-h-0" 
            :disabled="(step === 1 ? v$.phone.$invalid : v$.$invalid) || loading">
            <span v-if="loading" class="jyiai-loading jyiai-loading-spinner jyiai-loading-xs"></span>
            {{ loading ? t('common.system.loading') : buttonText }}
          </button>
        </div>

        <!-- Back to Login -->
        <div class="jyiai-text-center jyiai-text-sm jyiai-mt-4">
          <router-link to="/auth/login" class="jyiai-link jyiai-link-primary">
            {{ t('auth.forgot.backToLogin') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { userApi } from '@/api/user'
import type { ForgotPasswordForm } from './types'

const router = useRouter()
const { t } = useI18n()

// UI state
const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const step = ref(1)
const countdown = ref(0)
const isSuccess = ref(false)
const redirectCountdown = ref(5)

// Form state
const form = ref<ForgotPasswordForm>({
  phone: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

// Validation rules
const rules = {
  phone: {
    required: helpers.withMessage(() => t('auth.forgot.validation.phoneRequired'), required),
    minLength: helpers.withMessage(() => t('auth.register.validation.phoneFormat'), minLength(11))
  },
  code: {
    required: helpers.withMessage(() => t('auth.forgot.validation.codeRequired'), required)
  },
  newPassword: {
    required: helpers.withMessage(() => t('auth.forgot.validation.passwordRequired'), required),
    minLength: helpers.withMessage(({ $params }) => t('auth.register.validation.passwordMinLength', { min: $params.min }), minLength(6))
  },
  confirmPassword: {
    required: helpers.withMessage(() => t('auth.register.validation.confirmPasswordRequired'), required),
    sameAsPassword: helpers.withMessage(() => t('auth.register.validation.passwordMismatch'), (value) => value === form.value.newPassword)
  }
}

const v$ = useVuelidate(rules, form)

// Computed
const buttonText = computed(() => {
  return step.value === 1 
    ? t('auth.forgot.form.next') 
    : t('auth.forgot.form.reset')
})

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleSendCode = async () => {
  const isValid = await v$.value.phone.$validate()
  if (!isValid) return

  try {
    loading.value = true
    error.value = null
    
    await userApi.auth.sendVerificationCode({
      phone: form.value.phone,
      type: 'forgot_password'
    })
    
    startCountdown()
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || t('common.system.error')
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push({
    path: '/auth/login',
    query: { message: t('auth.login.passwordResetSuccess') }
  })
}

const handleSubmit = async () => {
  if (step.value === 1) {
    const isPhoneValid = await v$.value.phone.$validate()
    if (!isPhoneValid) return

    step.value = 2
    await handleSendCode()
    return
  }

  const isValid = await v$.value.$validate()
  if (!isValid) return

  try {
    loading.value = true
    error.value = null

    await userApi.auth.resetPassword({
      phone: form.value.phone,
      code: form.value.code,
      newPassword: form.value.newPassword
    })

    isSuccess.value = true
    const timer = setInterval(() => {
      redirectCountdown.value--
      if (redirectCountdown.value <= 0) {
        clearInterval(timer)
        goToLogin()
      }
    }, 1000)
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || t('common.system.error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 移除旧的 Bootstrap 样式 */
.jyiai-form-control {
  width: 100%;
}

.jyiai-alert {
  position: relative;
  display: flex;
  align-items: center;
}

/* 添加过渡动画 */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Add fade transition for success state */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>