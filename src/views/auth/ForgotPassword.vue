<template>
  <!-- Title -->
  <span class="mb-0 fs-1">🔑</span>
  <h1 class="fs-2 mt-2">{{ t('auth.forgot.title') }}</h1>
  <p class="lead mb-4">{{ t('auth.forgot.subtitle') }}</p>

  <!-- Form START -->
  <div>
    <!-- Phone -->
    <div class="mb-4">
      <div class="input-group" :class="{ 'is-invalid': error && !form.phone }">
        <span class="input-group-text border-0">
          <i class="bi bi-phone fs-5"></i>
        </span>
        <input type="tel" class="form-control form-control-lg ps-1" 
               v-model="form.phone" 
               :placeholder="t('auth.forgot.form.phonePlaceholder')"
               :disabled="step === 2">
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
      <button type="button" class="btn btn-primary btn-lg" 
              @click="handleSubmit" 
              :disabled="loading">
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
        <div class="small">{{ error }}</div>
        <button type="button" class="btn-close ms-auto" @click="error = null"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import type { ForgotPasswordForm, AuthFormRules } from './types'
import { resetPassword, sendVerifyCode } from '@/api/auth'

export default defineComponent({
  name: 'ForgotPassword',
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const form = reactive<ForgotPasswordForm>({
      phone: '',
      code: '',
      newPassword: '',
      confirmPassword: ''
    })

    const rules: AuthFormRules = {
      phone: { required: true, pattern: /^1[3-9]\d{9}$/ },
      code: { required: true, pattern: /^\d{6}$/ },
      password: { required: true, minLength: 6 }
    }

    const v$ = useVuelidate(rules, form)
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

    const handleSendCode = async () => {
      if (countdown.value > 0) return
      try {
        await sendVerifyCode(form.phone)
        countdown.value = 60
        const timer = setInterval(() => {
          countdown.value--
          if (countdown.value <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    }

    const handleSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) return

      loading.value = true
      try {
        await resetPassword(form)
        router.push('/auth/login')
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      v$,
      loading,
      error,
      showPassword,
      step,
      countdown,
      buttonText,
      togglePassword,
      startCountdown,
      handleSendCode,
      handleSubmit,
      t
    }
  }
})
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
</style> 