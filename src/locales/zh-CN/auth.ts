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
    backToLogin: '返回登录',
    message: {
      success: '密码重置成功，请使用新密码登录',
      redirectingIn: '即将跳转到登录页面',
      error: '密码重置失败，请稍后重试'
    }
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
  },
  terms: {
    serviceTerms: '服务条款',
    privacyPolicy: '隐私政策',
    serviceTermsTitle: '服务条款',
    serviceTermsIntro: '欢迎使用我们的服务。使用我们的平台即表示您同意这些条款。',
    termsSection1: {
      title: '1. 条款接受',
      content: '访问和使用本服务即表示您接受并同意受本协议条款的约束。'
    },
    termsSection2: {
      title: '2. 使用许可',
      content: '仅允许临时访问我们网站上的材料（信息或软件），仅供个人、非商业临时查看。'
    },
    termsSection3: {
      title: '3. 免责声明',
      content: '我们网站上的材料按"原样"提供。我们不提供任何明示或暗示的保证，特此否认并否定所有其他保证，包括但不限于对适销性、特定用途适用性、知识产权或其他权利侵犯的默示保证或条件。'
    },
    privacyPolicyTitle: '隐私政策',
    privacyPolicyIntro: '本隐私政策描述了我们如何收集、使用和处理您的个人信息。',
    privacySection1: {
      title: '1. 我们收集的信息',
      content: '我们收集您直接提供给我们的信息，包括但不限于您的姓名、电子邮件地址以及您选择提供的任何其他信息。'
    },
    privacySection2: {
      title: '2. 我们如何使用您的信息',
      content: '我们使用收集的信息来运营、维护和为您提供服务的功能和特性，处理您的交易，并与您沟通。'
    },
    privacySection3: {
      title: '3. 信息共享',
      content: '除非在本政策中描述或获得您的同意，我们不会与第三方共享您的个人信息。'
    }
  }
}

export default auth 