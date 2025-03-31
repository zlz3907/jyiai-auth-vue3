import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: 'Forgot Password',
    subtitle: 'Please enter your phone number to reset password',
    form: {
      phonePlaceholder: 'Enter phone number',
      codePlaceholder: 'Enter verification code',
      newPasswordPlaceholder: 'Enter new password',
      sendCode: 'Send Code',
      next: 'Next',
      reset: 'Reset Password'
    },
    validation: {
      phoneRequired: 'Please enter phone number',
      codeRequired: 'Please enter verification code',
      passwordRequired: 'Please enter new password'
    },
    backToLogin: 'Back to Login',
    message: {
      success: 'Password reset successful',
      redirectingIn: 'Redirecting in {seconds} seconds',
      error: 'Failed to reset password'
    }
  },
  login: {
    title: 'Login',
    subtitle: 'Welcome Back',
    welcome: 'Welcome to Knowledge Base Management System',
    tabs: {
      password: 'Password Login',
      phone: 'Phone Login',
      qrcode: 'QR Code Login'
    },
    form: {
      username: 'Username',
      usernamePlaceholder: 'Enter username',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      phone: 'Phone',
      phonePlaceholder: 'Enter phone number',
      code: 'Verification Code',
      codePlaceholder: 'Enter verification code',
      getCode: 'Get Code',
      remember: 'Remember me',
      forgot: 'Forgot Password?',
      login: 'Login',
      loginLoading: 'Logging in...'
    },
    validation: {
      phoneRequired: 'Please enter phone number',
      passwordRequired: 'Please enter password'
    },
    qrcode: {
      tip: 'Please scan QR code with your phone to login'
    },
    noAccount: "Don't have an account?",
    register: 'Register Now',
    passwordResetSuccess: 'Password reset successful, please login with your new password'
  },
  register: {
    title: 'Register',
    subtitle: 'Create Account',
    welcome: 'Welcome to Knowledge Base Management System',
    success: {
      message: 'Registration successful! Redirecting to login page'
    },
    form: {
      username: 'Username',
      usernamePlaceholder: 'Enter username',
      phone: 'Phone',
      phonePlaceholder: 'Enter phone number',
      code: 'Verification Code',
      codePlaceholder: 'Enter verification code',
      getCode: 'Get Code',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Enter password again',
      register: 'Register',
      hasAccount: 'Already have an account?',
      login: 'Login Now',
      or: 'or',
      agreement: 'I have read and agree to the',
      terms: 'Terms of Service and Privacy Policy'
    },
    validation: {
      usernameRequired: 'Please enter username',
      usernameMinLength: 'Username must be at least {min} characters',
      usernameMaxLength: 'Username cannot exceed {max} characters',
      phoneRequired: 'Please enter phone number',
      phoneFormat: 'Please enter valid phone number format',
      codeRequired: 'Please enter verification code',
      codeFormat: 'Invalid verification code format',
      codeNotVerified: 'Please verify phone number first',
      passwordRequired: 'Please enter password',
      passwordMinLength: 'Password must be at least {min} characters',
      passwordStrength: 'Password must contain uppercase and lowercase letters, numbers and special characters',
      confirmPasswordRequired: 'Please confirm password',
      passwordMismatch: 'Passwords do not match',
      agreementRequired: 'Please read and agree to the terms of service',
      passwordWeak: 'Password strength: Weak',
      passwordMedium: 'Password strength: Medium',
      passwordStrong: 'Password strength: Strong',
      passwordVeryStrong: 'Password strength: Very Strong'
    },
    errors: {
      phoneExists: 'This phone number is already registered',
      invalidCode: 'Invalid or expired verification code',
      systemError: 'System error, please try again later'
    }
  },
  wxAuth: {
    title: 'WeChat Login',
    subtitle: 'Scan QR code with WeChat to login',
    backToLogin: 'Back to Login'
  },
  terms: {
    serviceTerms: 'Service Terms',
    privacyPolicy: 'Privacy Policy',
    serviceTermsTitle: 'Terms of Service',
    serviceTermsIntro: 'Welcome to our service. By using our platform, you agree to these terms.',
    termsSection1: {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using this service, you accept and agree to be bound by the terms and conditions of this agreement.'
    },
    termsSection2: {
      title: '2. Use License',
      content: 'Permission is granted to temporarily access the materials (information or software) on our website for personal, non-commercial transitory viewing only.'
    },
    termsSection3: {
      title: '3. Disclaimer',
      content: 'The materials on our website are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
    },
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicyIntro: 'This Privacy Policy describes how we collect, use, and handle your personal information.',
    privacySection1: {
      title: '1. Information We Collect',
      content: 'We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide.'
    },
    privacySection2: {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to operate, maintain, and provide you with the features and functionality of the service, to process your transactions, and to communicate with you.'
    },
    privacySection3: {
      title: '3. Information Sharing',
      content: 'We do not share your personal information with third parties except as described in this policy or with your consent.'
    }
  }
}

export default auth 