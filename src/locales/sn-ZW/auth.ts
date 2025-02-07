import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: 'Wakanganwa Password',
    subtitle: 'Ndapota isa nhamba yako yerunhare kuti ugadzirire password itsva',
    form: {
      phonePlaceholder: 'Isa nhamba yerunhare',
      codePlaceholder: 'Isa code yekuverifier',
      newPasswordPlaceholder: 'Isa password itsva',
      sendCode: 'Tumira Code',
      next: 'Enderera Mberi',
      reset: 'Reset Password'
    },
    validation: {
      phoneRequired: 'Ndapota isa nhamba yerunhare',
      codeRequired: 'Ndapota isa code yekuverifier',
      passwordRequired: 'Ndapota isa password itsva'
    },
    backToLogin: 'Dzokera kuLogin'
  },
  login: {
    title: 'Login',
    subtitle: 'Tinofara Kukuonazve',
    welcome: 'Tinokugamuchira kuSystem yedu yeRuzivo',
    tabs: {
      password: 'Login nePassword',
      phone: 'Login neRunhare',
      qrcode: 'Login neQR Code'
    },
    form: {
      username: 'Username',
      usernamePlaceholder: 'Ndapota isa username',
      password: 'Password',
      passwordPlaceholder: 'Ndapota isa password',
      phone: 'Nhamba yeRunhare',
      phonePlaceholder: 'Ndapota isa nhamba yerunhare',
      code: 'Code yeKuverifier',
      codePlaceholder: 'Ndapota isa code',
      getCode: 'Wana Code',
      remember: 'Ndirangarire',
      forgot: 'Wakanganwa Password?',
      login: 'Login',
      loginLoading: 'Kulogin...'
    },
    validation: {
      phoneRequired: 'Ndapota isa nhamba yerunhare',
      passwordRequired: 'Ndapota isa password'
    },
    qrcode: {
      tip: 'Ndapota scanner QR code nefoni yako'
    },
    noAccount: 'Hauna Account?',
    register: 'Register Iyezvino',
    passwordResetSuccess: 'Password yagadziriswa zvakanaka, ndapota login nepassword itsva'
  },
  register: {
    title: 'Register',
    subtitle: 'Gadzira Account',
    welcome: 'Tinokugamuchira kuSystem yedu yeRuzivo',
    success: {
      message: 'Wagadzira account zvakanaka! Uchitumirwa kupage yeLogin'
    },
    form: {
      username: 'Username',
      usernamePlaceholder: 'Ndapota isa username',
      phone: 'Nhamba yeRunhare',
      phonePlaceholder: 'Ndapota isa nhamba yerunhare',
      code: 'Code yeKuverifier',
      codePlaceholder: 'Ndapota isa code',
      getCode: 'Wana Code',
      password: 'Password',
      passwordPlaceholder: 'Ndapota isa password',
      confirmPassword: 'Simbisa Password',
      confirmPasswordPlaceholder: 'Ndapota isa password zvakare',
      register: 'Register',
      hasAccount: 'Une Account Kare?',
      login: 'Login Iyezvino',
      or: 'kana',
      agreement: 'Ndaverenga uye ndinobvuma',
      terms: 'Terms of Service nePrivacy Policy'
    },
    validation: {
      usernameRequired: 'Ndapota isa username',
      usernameMinLength: 'Username inofanira kuva nemaletters {min} kana kupfuura',
      usernameMaxLength: 'Username haifanire kupfuura maletters {max}',
      phoneRequired: 'Ndapota isa nhamba yerunhare',
      phoneFormat: 'Ndapota isa nhamba yerunhare yakakwana',
      codeRequired: 'Ndapota isa code yekuverifier',
      codeFormat: 'Code format haina kukwana',
      codeNotVerified: 'Ndapota verifier nhamba yerunhare kutanga',
      passwordRequired: 'Ndapota isa password',
      passwordMinLength: 'Password inofanira kuva nemaletters {min} kana kupfuura',
      passwordStrength: 'Password inofanira kuva nemaletters makuru, madiki, nhamba uye zvimwe zviratidzo',
      confirmPasswordRequired: 'Ndapota simbisa password',
      passwordMismatch: 'Mapasswords haana kufanana',
      agreementRequired: 'Ndapota verenga uye ubvume terms of service',
      passwordWeak: 'Simba rePassword: Weak',
      passwordMedium: 'Simba rePassword: Medium',
      passwordStrong: 'Simba rePassword: Strong',
      passwordVeryStrong: 'Simba rePassword: Very Strong'
    },
    errors: {
      phoneExists: 'Nhamba yerunhare iyi yatoregistwa kare',
      invalidCode: 'Code haina kukwana kana kuti yapera nguva',
      systemError: 'System error, ndapota edza zvakare pashure'
    }
  }
}

export default auth 