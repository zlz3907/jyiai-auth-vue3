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
    backToLogin: 'Back to Login'
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
  }
}

export default auth 