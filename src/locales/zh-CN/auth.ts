import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: '忘记密码',
    subtitle: '请输入您的手机号码重置密码',
    form: {
      phonePlaceholder: '请输入手机号码',
      codePlaceholder: '请输入验证码',
      newPasswordPlaceholder: '请输入新密码',
      sendCode: '发送验证码',
      next: '下一步',
      reset: '重置密码'
    },
    validation: {
      phoneRequired: '请输入手机号码',
      codeRequired: '请输入验证码',
      passwordRequired: '请输入新密码'
    },
    backToLogin: '返回登录'
  },
  login: {
    title: '登录',
    subtitle: '欢迎回来',
    welcome: '欢迎使用简易AI认证系统',
    tabs: {
      password: '账号密码登录',
      phone: '手机号登录',
      qrcode: '扫码登录'
    },
    form: {
      username: '用户名',
      usernamePlaceholder: '请输入用户名',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      phone: '手机号',
      phonePlaceholder: '请输入手机号',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      getCode: '获取验证码',
      remember: '记住我',
      forgot: '忘记密码？',
      login: '登录',
      loginLoading: '登录中...'
    },
    validation: {
      phoneRequired: '请输入手机号码',
      passwordRequired: '请输入密码'
    },
    qrcode: {
      tip: '请使用手机扫码登录'
    },
    noAccount: '还没有账号？',
    register: '立即注册',
    passwordResetSuccess: '密码重置成功，请使用新密码登录'
  },
  register: {
    title: '注册账号',
    subtitle: '注册账号',
    welcome: '欢迎使用简易AI认证系统',
    success: {
      message: '注册成功！即将跳转到登录页面'
    },
    form: {
      username: '用户名',
      usernamePlaceholder: '请输入用户名',
      phone: '手机号',
      phonePlaceholder: '请输入手机号',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      getCode: '获取验证码',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      confirmPassword: '确认密码',
      confirmPasswordPlaceholder: '请再次输入密码',
      register: '注册',
      hasAccount: '已有账号？',
      login: '立即登录',
      or: '或者',
      agreement: '我已阅读并同意',
      terms: '服务条款和隐私政策'
    },
    validation: {
      usernameRequired: '请输入用户名',
      usernameMinLength: '用户名至少需要 {min} 个字符',
      usernameMaxLength: '用户名不能超过 {max} 个字符',
      phoneRequired: '请输入手机号码',
      phoneFormat: '请输入正确的手机号格式',
      codeRequired: '请输入验证码',
      codeFormat: '验证码格式不正确',
      codeNotVerified: '请先验证手机验证码',
      passwordRequired: '请输入密码',
      passwordMinLength: '密码至少需要 {min} 个字符',
      passwordStrength: '密码需包含大小写字母、数字和特殊字符',
      confirmPasswordRequired: '请确认密码',
      passwordMismatch: '两次输入的密码不一致',
      agreementRequired: '请阅读并同意服务条款',
      passwordWeak: '密码强度：弱',
      passwordMedium: '密码强度：中',
      passwordStrong: '密码强度：强',
      passwordVeryStrong: '密码强度：很强'
    },
    errors: {
      phoneExists: '该手机号已被注册',
      invalidCode: '验证码无效或已过期',
      systemError: '系统错误，请稍后重试'
    }
  },
  wxAuth: {
    title: '微信登录',
    subtitle: '请使用微信扫描二维码登录',
    backToLogin: '返回账号登录'
  }
}

export default auth 