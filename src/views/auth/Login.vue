<template>
  <div class=" border-0 bg-transparent">
    <div class="card-body p-4">

      <div class="mb-4">
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <small>{{ error }}</small>
          <button type="button" class="btn-close" @click="error = null" aria-label="Close"></button>
        </div>
      </div>


      <!-- Title -->
      <div class="text-center mb-4">
        <h1 class="fs-2 mt-2">{{ t('auth.login.title') }}</h1>
        <p class="lead text-secondary mb-4">{{ t('auth.login.subtitle') }}</p>
      </div>

      <!-- Form START -->
      <form @submit.prevent="handleSubmit">
        <!-- Phone -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-phone fs-5"></i>
            </span>
            <input type="tel" class="form-control border-0 bg-transparent shadow-none"
              :class="{ 'is-invalid': v$.phone.$error }" v-model="form.phone" @blur="v$.phone.$touch()"
              :placeholder="t('auth.login.form.phonePlaceholder')">
          </div>
          <div class="invalid-feedback" v-if="v$.phone.$error">
            {{ v$.phone.$errors[0].$message }}
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <div class="input-group input-group-lg border rounded-3">
            <span class="input-group-text border-0 bg-transparent">
              <i class="bi bi-key fs-5"></i>
            </span>
            <input :type="showPassword ? 'text' : 'password'" class="form-control border-0 bg-transparent shadow-none"
              :class="{ 'is-invalid': v$.password.$error }" v-model="form.password" @blur="v$.password.$touch()"
              :placeholder="t('auth.login.form.passwordPlaceholder')">
            <button class="btn btn-link text-secondary border-0 px-3" type="button" @click="togglePassword">
              <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
            </button>
          </div>
          <div class="invalid-feedback" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </div>
        </div>

        <!-- Remember me -->
        <div class="mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="rememberCheck" v-model="form.remember">
            <label class="form-check-label text-secondary" for="rememberCheck">
              {{ t('auth.login.form.remember') }}
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-lg w-100 mb-3" :class="!v$.$invalid ? 'btn-primary' : 'btn-secondary'"
          :disabled="v$.$invalid || loading">
          <span class="spinner-border spinner-border-sm me-2" v-if="loading"></span>
          {{ loading ? t('common.system.loading') : t('auth.login.form.login') }}
        </button>

        <!-- Links -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="small">
            {{ t('auth.login.noAccount') }}
            <router-link to="/auth/register" class="text-primary text-decoration-none">
              {{ t('auth.login.register') }}
            </router-link>
          </div>
          <router-link to="/auth/forgot-password" class="text-primary text-decoration-none small">
            {{ t('auth.login.form.forgot') }}
          </router-link>
        </div>

        <!-- Divider -->
        <div class="position-relative my-4">
          <hr>
          <span class="position-absolute top-50 start-50 translate-middle px-3 bg-white small">
            {{ t('auth.register.form.or') }}
          </span>
        </div>

        <!-- Social buttons -->
        <div class="d-grid">
          <button type="button" 
                  class="btn btn-link p-2" 
                  style="height: 48px; width: 48px; margin: 0 auto;"
                  @click="router.push('/auth/wx-auth')">
            <img src="https://api.zhycit.com/alioss2/icons/tubiaopng/wx_online.png" 
                 alt="WeChat" width="32" height="32">
          </button>
        </div>

        <!-- Alert -->

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
// import { useUserStore } from '@/stores/user'
import type { LoginForm } from './types'
import type { ValidationRule } from '@vuelidate/core'
import { userApi } from '@/api/user'
import { required, minLength } from '@vuelidate/validators'
import Cookies from 'js-cookie'
import storage from '@/utils/storage'

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    // const userStore = useUserStore()

    const form = reactive<LoginForm>({
      phone: storage.getItem('phone') || '',
      password: '',
      remember: storage.getItem('remember') || false
    })

    const rules = {
      phone: {
        required: required as ValidationRule,
        minLength: minLength(11) as ValidationRule
      },
      password: {
        required: required as ValidationRule,
        minLength: minLength(6) as ValidationRule
      }
    }

    const v$ = useVuelidate(rules, form)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const showPassword = ref(false)

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
        console.log('Cookie value:', Cookies.get('JYIAIToken'))

      } catch (_error: any) {
        console.error(_error)
        error.value = _error?.response?.data?.message || _error?.message || t('auth.login.error.failed')
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
        error.value = _error?.message || t('auth.login.error.sendCodeFailed')
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
      router
    }
  }
})
</script>