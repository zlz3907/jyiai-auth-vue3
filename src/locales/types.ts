import type { LocaleMessages } from 'vue-i18n'

export interface AuthMessages {
  forgot: {
    title: string
    subtitle: string
    form: {
      phonePlaceholder: string
      codePlaceholder: string
      newPasswordPlaceholder: string
      sendCode: string
      next: string
      reset: string
    }
    validation: {
      phoneRequired: string
      codeRequired: string
      passwordRequired: string
    }
    backToLogin: string
  }
  login: {
    title: string
    subtitle: string
    welcome: string
    tabs: {
      password: string
      phone: string
      qrcode: string
    }
    form: {
      username: string
      usernamePlaceholder: string
      password: string
      passwordPlaceholder: string
      phone: string
      phonePlaceholder: string
      code: string
      codePlaceholder: string
      getCode: string
      remember: string
      forgot: string
      login: string
      loginLoading: string
    }
    validation: {
      phoneRequired: string
      passwordRequired: string
    }
    qrcode: {
      tip: string
    }
    noAccount: string
    register: string
    passwordResetSuccess: string
  }
  register: {
    title: string
    subtitle: string
    welcome: string
    success: {
      message: string
    }
    form: {
      username: string
      usernamePlaceholder: string
      phone: string
      phonePlaceholder: string
      code: string
      codePlaceholder: string
      getCode: string
      password: string
      passwordPlaceholder: string
      confirmPassword: string
      confirmPasswordPlaceholder: string
      register: string
      hasAccount: string
      login: string
      or: string
      agreement: string
      terms: string
    }
    validation: {
      usernameRequired: string
      usernameMinLength: string
      usernameMaxLength: string
      phoneRequired: string
      phoneFormat: string
      codeRequired: string
      codeFormat: string
      codeNotVerified: string
      passwordRequired: string
      passwordMinLength: string
      passwordStrength: string
      confirmPasswordRequired: string
      passwordMismatch: string
      agreementRequired: string
      passwordWeak: string
      passwordMedium: string
      passwordStrong: string
      passwordVeryStrong: string
    }
    errors: {
      phoneExists: string
      invalidCode: string
      systemError: string
    }
  }
  wxAuth: {
    title: string
    subtitle: string
    backToLogin: string
  }
}

export interface CommonMessages {
  cancel: string
  ok: string
  confirm: string
  delete: string
  edit: string
  save: string
  warning: string
  system: {
    name: string
    loading: string
    success: string
    error: string
    confirm: string
    cancel: string
    delete: string
    edit: string
    create: string
    search: string
    more: string
    settings: string
    sessionExpired: string
  }
  menu: {
    home: string
    dataset: string
    agent: string
    settings: string
    apply: string
  }
  actions: {
    add: string
    cancel: string
    create: string
    save: string
  }
  user: {
    profile: string
    settings: string
    logout: string
    logoutConfirm: string
    applyList: string
  }
  button: {
    cancel: string
    delete: string
  }
  pageSelector: {
    title: string
    dataset: string
    agent: string
  }
  back: string
}

export type Messages = LocaleMessages<any>

export interface Language {
  code: string
  name: string
  flag: string
} 