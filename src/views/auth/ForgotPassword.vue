<template>
  <!-- Title -->
  <span class="mb-0 fs-1">🔑</span>
  <h1 class="fs-2 mt-2">{{ t('auth.forgot.title') }}</h1>
  <p class="lead mb-4">{{ t('auth.forgot.subtitle') }}</p>

  <!-- Form START -->
  <div>
    <!-- Phone -->
    <div class="mb-4">
      <div class="input-group" :class="{ 
        'is-invalid': (error && !form.phone) || (form.phone && !isPhoneValid),
        'border-success': form.phone && isPhoneValid 
      }">
        <span class="input-group-text border-0">
          <i class="bi bi-phone fs-5"></i>
        </span>
        <input type="tel" class="form-control form-control-lg ps-1" 
               v-model="form.phone" 
               :placeholder="t('auth.forgot.form.phonePlaceholder')"
               :disabled="step === 2">
      </div>
      <div class="invalid-feedback" v-if="form.phone && !isPhoneValid">
        {{ t('auth.forgot.validation.phoneInvalid') }}
      </div>
    </div>

    <!-- Verification Code -->
    <div class="mb-4" v-if="step === 2">
      <div class="input-group" :class="{ 'is-invalid': error && !form.code }">
        <span class="input-group-text border-0">
          <i class="bi bi-shield-lock fs-5"></i>
        </span>
        <input type="text" class="form-control form-control-lg ps-1" 
               v-model="form.code" 
               :placeholder="t('auth.forgot.form.codePlaceholder')">
        <button class="btn btn-outline-secondary border-0" type="button" 
                @click="handleSendCode" 
                :disabled="countdown > 0">
          {{ countdown > 0 ? `${countdown}s` : t('auth.forgot.form.sendCode') }}
        </button>
      </div>
    </div>

    <!-- New Password -->
    <div class="mb-4" v-if="step === 2">
      <div class="input-group" :class="{ 'is-invalid': error && !form.newPassword }">
        <span class="input-group-text border-0">
          <i class="bi bi-key fs-5"></i>
        </span>
        <input :type="showPassword ? 'text' : 'password'" 
               class="form-control form-control-lg ps-1" 
               v-model="form.newPassword" 
               :placeholder="t('auth.forgot.form.newPasswordPlaceholder')">
        <button class="btn btn-outline-secondary border-0" type="button" @click="togglePassword">
          <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="d-grid">
      <button type="button" 
              class="btn btn-primary btn-lg" 
              @click="handleSubmit" 
              :disabled="loading || (step === 1 && (!form.phone || !isPhoneValid))">
        <span class="spinner-border spinner-border-sm me-2" v-if="loading"></span>
        {{ loading ? t('common.system.loading') : buttonText }}
      </button>
    </div>

    <!-- Back to Login -->
    <div class="mt-4 text-center">
      <p class="mb-0">
        <router-link to="/auth/login" class="text-primary">
          <i class="bi bi-arrow-left me-1"></i>{{ t('auth.forgot.backToLogin') }}
        </router-link>
      </p>
    </div>

    <!-- Alert -->
    <div class="alert-container" style="min-height: 60px">
      <div class="alert alert-danger d-flex align-items-center mt-3" role="alert" v-if="error">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <div class="small">{{ error.message }}</div>
        <button type="button" class="btn-close ms-auto" @click="error = null"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { userApi } from '@/api/user'
import type { ForgotPasswordForm } from './types'

const router = useRouter()
const { t } = useI18n()

// 使用类型定义
const form = ref<ForgotPasswordForm>({
  phone: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref<Error | null>(null)
const showPassword = ref(false)
const step = ref(1)
const countdown = ref(0)

const buttonText = computed(() => {
  return step.value === 1 
    ? t('auth.forgot.form.next') 
    : t('auth.forgot.form.reset')
})

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

// 添加手机号验证函数
const isValidPhone = (phone: string): boolean => {
  // 中国大陆手机号验证规则
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 添加手机号验证状态
const isPhoneValid = computed(() => {
  return form.value.phone ? isValidPhone(form.value.phone) : false
})

const handleSendCode = async () => {
  if (!form.value.phone) {
    error.value = new Error(t('auth.forgot.validation.phoneRequired'))
    return
  }

  if (!isValidPhone(form.value.phone)) {
    error.value = new Error(t('auth.forgot.validation.phoneInvalid'))
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    // 使用新的 API 调用
    await userApi.auth.sendVerificationCode({
      phone: form.value.phone,
      type: 'forgot_password'
    })
    
    startCountdown()
  } catch (err) {
    error.value = {
      message: (err as any)?.response?.data?.message || String(err)
    } as Error
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!form.value.phone) {
    error.value = new Error(t('auth.forgot.validation.phoneRequired'))
    return
  }

  if (!isValidPhone(form.value.phone)) {
    error.value = new Error(t('auth.forgot.validation.phoneInvalid'))
    return
  }

  if (step.value === 1) {
    step.value = 2
    handleSendCode()
    return
  }

  if (!form.value.code) {
    error.value = new Error(t('auth.forgot.validation.codeRequired'))
    return
  }

  if (!form.value.newPassword) {
    error.value = new Error(t('auth.forgot.validation.passwordRequired'))
    return
  }

  try {
    loading.value = true
    error.value = null

    // 使用新的 API 调用
    await userApi.auth.resetPassword({
      phone: form.value.phone,
      code: form.value.code,
      newPassword: form.value.newPassword
    })

    router.push({
      path: '/auth/login',
      query: { 
        phone: form.value.phone,
        resetSuccess: 'true'
      }
    })
  } catch (err) {
    error.value = {
      message: (err as any)?.response?.data?.message || String(err)
    } as Error
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 复用 Login.vue 的样式 */
.input-group {
  border: 1px solid var(--bs-border-color);
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.input-group:focus-within {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

.input-group-text {
  background-color: transparent;
  border: none;
  border-right: 1px solid var(--bs-border-color);
  color: var(--bs-gray-600);
  padding: 0.75rem 1rem;
  min-width: 46px;
  display: flex;
  justify-content: center;
}

.form-control {
  border: none;
  padding: 0.75rem 1rem;
  background-color: transparent;
  color: var(--bs-body-color);
}

.form-control::placeholder {
  color: var(--bs-gray-400);
  opacity: 0.65;
}

:root[data-bs-theme="dark"] .input-group {
  background-color: var(--bs-dark);
  border-color: rgba(255, 255, 255, 0.1);
}

:root[data-bs-theme="dark"] .input-group-text {
  border-right-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

:root[data-bs-theme="dark"] .form-control::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.alert-container {
  position: relative;
  margin-top: 1rem;
}

.alert {
  position: absolute;
  left: 0;
  right: 0;
  animation: fadeIn 0.3s ease-in-out;
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

.invalid-feedback {
  display: block;
  font-size: 0.875em;
  color: var(--bs-danger);
  margin-top: 0.25rem;
}

.input-group.border-success {
  border-color: var(--bs-success);
}
</style> 