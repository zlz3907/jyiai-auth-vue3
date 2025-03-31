<template>
  <div class="w-full max-w-sm">
    <!-- Success State -->
    <div v-if="isSuccess" class="text-center space-y-6">
      <div class="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="space-y-2">
        <h2 class="text-xl font-medium">{{ t('auth.forgot.message.success') }}</h2>
        <p class="text-base-content/60">{{ t('auth.forgot.message.redirectingIn', { seconds: redirectCountdown }) }}</p>
      </div>
      <div class="pt-2">
        <button class="btn btn-primary w-full h-10 min-h-0" @click="goToLogin">
          {{ t('auth.forgot.backToLogin') }}
        </button>
      </div>
    </div>

    <!-- Main Form -->
    <div v-else>
      <!-- Title -->
      <h1 class="text-xl font-medium text-center mb-6">{{ t('auth.forgot.title') }}</h1>
      <p class="text-sm text-center mb-6 text-base-content/60">{{ t('auth.forgot.subtitle') }}</p>

      <!-- Error Alert -->
      <div v-if="error" class="alert alert-error mb-4 p-3">
        <div class="flex items-center w-full">
          <div class="flex items-center gap-2 flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm">{{ error }}</span>
          </div>
          <button class="btn btn-ghost btn-xs p-0 min-h-0 h-4 w-4 ml-2" @click="error = null">✕</button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Phone Input -->
        <div class="form-control w-full">
          <label class="label pt-0">
            <span class="label-text">{{ t('auth.login.form.phone') }}</span>
          </label>
          <input type="tel" 
            :placeholder="t('auth.forgot.form.phonePlaceholder')" 
            class="input input-bordered w-full h-10"
            :class="{ 'input-error': v$.phone.$error }"
            v-model="form.phone" 
            :disabled="step === 2"
            @blur="v$.phone.$touch()" />
          <label class="label py-0.5" v-if="v$.phone.$error">
            <span class="label-text-alt text-error text-xs">{{ v$.phone.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- Verification Code -->
        <div class="form-control" v-if="step === 2">
          <label class="label pt-0">
            <span class="label-text">{{ t('auth.register.form.code') }}</span>
          </label>
          <div class="join w-full">
            <input type="text" 
              :placeholder="t('auth.forgot.form.codePlaceholder')" 
              class="input input-bordered join-item flex-1 h-10"
              :class="{ 'input-error': v$.code.$error }"
              v-model="form.code"
              @blur="v$.code.$touch()" />
            <button type="button"
              class="btn join-item h-10 min-h-0" 
              :class="countdown > 0 ? 'btn-disabled' : 'btn-primary'"
              @click="handleSendCode">
              {{ countdown > 0 ? `${countdown}s` : t('auth.forgot.form.sendCode') }}
            </button>
          </div>
          <label class="label py-0.5" v-if="v$.code.$error">
            <span class="label-text-alt text-error text-xs">{{ v$.code.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- New Password -->
        <div class="form-control" v-if="step === 2">
          <label class="label pt-0">
            <span class="label-text">{{ t('auth.register.form.password') }}</span>
          </label>
          <div class="join w-full">
            <input :type="showPassword ? 'text' : 'password'" 
              :placeholder="t('auth.forgot.form.newPasswordPlaceholder')" 
              class="input input-bordered join-item flex-1 h-10"
              :class="{ 'input-error': v$.newPassword.$error }"
              v-model="form.newPassword"
              @blur="v$.newPassword.$touch()" />
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
          <label class="label py-0.5" v-if="v$.newPassword.$error">
            <span class="label-text-alt text-error text-xs">{{ v$.newPassword.$errors[0].$message }}</span>
          </label>
        </div>

        <!-- Confirm Password -->
        <div class="form-control" v-if="step === 2">
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

        <!-- Submit Button -->
        <div class="w-full">
          <button type="submit" 
            class="btn btn-primary w-full h-10 min-h-0" 
            :disabled="(step === 1 ? v$.phone.$invalid : v$.$invalid) || loading">
            <span v-if="loading" class="loading loading-spinner loading-xs"></span>
            {{ loading ? t('common.system.loading') : buttonText }}
          </button>
        </div>

        <!-- Back to Login -->
        <div class="text-center text-sm mt-4">
          <router-link to="/auth/login" class="link link-primary">
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
.form-control {
  @apply w-full;
}

.alert {
  @apply relative flex items-center;
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