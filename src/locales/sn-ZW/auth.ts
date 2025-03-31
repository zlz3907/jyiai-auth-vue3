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
      phoneRequired: 'Ndapota isa nhamba yefoni',
      codeRequired: 'Ndapota isa kodhi yekusimbisa',
      passwordRequired: 'Ndapota isa password itsva'
    },
    backToLogin: 'Dzokera kuLogin',
    message: {
      success: 'Password yakadzoserwa zvinobudirira',
      redirectingIn: 'Kudzosera mu {seconds} masekondi',
      error: 'Kukundikana kudzosera password'
    }
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
  },
  wxAuth: {
    title: 'WeChat Login',
    subtitle: 'Scan QR code with WeChat',
    backToLogin: 'Back to Login'
  },
  terms: {
    serviceTerms: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    serviceTermsTitle: 'Terms of Service',
    serviceTermsIntro: 'Tinokugamuchira kuchishandiso chedu. Kushandisa platform yedu kunoreva kuti unobvuma aya matemu.',
    termsSection1: {
      title: '1. Kubvuma Matemu',
      content: 'Kushandisa chishandiso ichi kunoreva kuti unobvuma uye unobvumirana nemitemu yechibvumirano ichi.'
    },
    termsSection2: {
      title: '2. Rezinesi Rekushandisa',
      content: 'Mvumo inopihwa yekushandisa zvinyorwa (ruzivo kana software) pawebhusaiti yedu kwenguva pfupi, chete kune vanhu, kwete kushandiswa kwekutengesa.'
    },
    termsSection3: {
      title: '3. Disclaimer',
      content: 'Zvinyorwa pawebhusaiti yedu zvinopihwa "sezvazviri". Hatipi vimbiso, dzakajeka kana dzisina kujeka, uye tinoramba uye tinoramba vimbiso dzose dzimwe, kusanganisira, pasina muganho, vimbiso dzekutengesa, kukodzera kwechinangwa chakati, kana kutyorwa kwekodzero.'
    },
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicyIntro: 'Aya Privacy Policy anotsanangura kuti tinotora sei, tinoshandisa sei, uye tinobata sei ruzivo rwako.',
    privacySection1: {
      title: '1. Ruzivo Rwatiri Kutora',
      content: 'Tinotora ruzivo rwamunotipa, kusanganisira asi pasina muganho zita rako, email address, uye chero ruzivo rwamunosarudza kupa.'
    },
    privacySection2: {
      title: '2. Mashandisiro Eruzivo Rwako',
      content: 'Tinoshandisa ruzivo rwatinotora kushandisa, kuchengetedza, uye kukupa mabasa echishandiso, kugadzirisa kutengeserana kwako, uye kutaura newe.'
    },
    privacySection3: {
      title: '3. Kugovera Ruzivo',
      content: 'Hatigoveri ruzivo rwako nevanhu vekunze kunze kwekunge zvataurwa mumutemo uyu kana kuti mwabvuma.'
    }
  }
}

export default auth 