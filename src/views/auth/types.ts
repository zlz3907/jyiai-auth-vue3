import type { ValidationRule } from '@vuelidate/core'

export interface LoginForm {
  phone: string
  password: string
  remember: boolean
}

export interface PhoneLoginForm {
  phone: string
  code: string
  remember: boolean
}

export interface RegisterForm {
  username: string
  phone: string
  code: string
  password: string
  confirmPassword: string
  agreement: boolean
  verified: boolean
}

export interface ForgotPasswordForm {
  phone: string
  code: string
  newPassword: string
  confirmPassword: string
}

export interface AuthFormRules {
  phone: {
    required: ValidationRule
    minLength: ValidationRule
    pattern: ValidationRule
  }
  password: {
    required: ValidationRule
    minLength: ValidationRule
    strongPassword?: ValidationRule
  }
  username?: {
    required: ValidationRule
    minLength: ValidationRule
    maxLength: ValidationRule
  }
  code?: {
    required: ValidationRule
    pattern: ValidationRule
  }
  agreement?: {
    required: ValidationRule
  }
  confirmPassword?: {
    required: ValidationRule
    sameAsPassword: ValidationRule
  }
}

export interface AuthFormEmits {
  (e: 'submit'): void
  (e: 'cancel'): void
}

export interface AuthFormRef {
  validate: () => Promise<boolean>
  reset: () => void
} 