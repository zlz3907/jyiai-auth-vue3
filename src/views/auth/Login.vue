<template>
  <!-- Title -->
  <span class="mb-0 fs-1">👋</span>
  <h1 class="fs-2 mt-2">{{ t('auth.login.title') }}</h1>
  <p class="lead mb-4">{{ t('auth.login.subtitle') }}</p>

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
               :placeholder="t('auth.login.form.phonePlaceholder')">
      </div>
    </div>

    <!-- Password -->
    <div class="mb-4">
      <div class="input-group" :class="{ 'is-invalid': error && !form.password }">
        <span class="input-group-text border-0">
          <i class="bi bi-key fs-5"></i>
        </span>
        <input :type="showPassword ? 'text' : 'password'" 
               class="form-control form-control-lg ps-1" 
               v-model="form.password" 
               :placeholder="t('auth.login.form.passwordPlaceholder')">
        <button class="btn btn-outline-secondary border-0" type="button" @click="togglePassword">
          <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
        </button>
      </div>
    </div>

    <!-- Remember me -->
    <div class="mb-4">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" 
               id="rememberCheck" 
               v-model="form.remember">
        <label class="form-check-label" for="rememberCheck">
          {{ t('auth.login.form.remember') }}
        </label>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="d-grid">
      <button type="button" class="btn btn-primary btn-lg" 
              @click="handleSubmit" 
              :disabled="loading">
        <span class="spinner-border spinner-border-sm me-2" v-if="loading"></span>
        {{ loading ? t('common.system.loading') : t('auth.login.form.login') }}
      </button>
    </div>

    <!-- Links -->
    <div class="d-flex justify-content-between mt-4">
      <router-link to="/auth/register" class="text-primary">
        {{ t('auth.login.register') }}
      </router-link>
      <router-link to="/auth/forgot-password" class="text-primary">
        {{ t('auth.login.form.forgot') }}
      </router-link>
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
import { defineComponent, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import type { LoginForm, AuthFormRules } from './types'
import { loginByPassword } from '@/api/auth'

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()

    const form = reactive<LoginForm>({
      username: '',
      password: '',
      remember: false
    })

    const rules: AuthFormRules = {
      username: { required: true, minLength: 3 },
      password: { required: true, minLength: 6 }
    }

    const v$ = useVuelidate(rules, form)
    const loading = ref(false)
    const error = ref(null)
    const showPassword = ref(false)

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) return

      loading.value = true
      try {
        await loginByPassword(form)
        const redirect = route.query.redirect as string || '/'
        router.push(redirect)
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
      togglePassword,
      handleSubmit,
      t
    }
  }
})
</script>

<style scoped>
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

.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
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