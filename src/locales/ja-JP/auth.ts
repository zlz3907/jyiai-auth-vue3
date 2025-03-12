import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: 'パスワードをお忘れの方',
    subtitle: 'パスワードをリセットするには電話番号を入力してください',
    form: {
      phonePlaceholder: '電話番号を入力',
      codePlaceholder: '認証コードを入力',
      newPasswordPlaceholder: '新しいパスワードを入力',
      sendCode: 'コードを送信',
      next: '次へ',
      reset: 'パスワードをリセット'
    },
    validation: {
      phoneRequired: '電話番号を入力してください',
      codeRequired: '認証コードを入力してください',
      passwordRequired: '新しいパスワードを入力してください'
    },
    backToLogin: 'ログインに戻る'
  },
  login: {
    title: 'ログイン',
    subtitle: 'おかえりなさい',
    welcome: 'ナレッジベース管理システムへようこそ',
    tabs: {
      password: 'パスワードログイン',
      phone: '電話番号ログイン',
      qrcode: 'QRコードログイン'
    },
    form: {
      username: 'ユーザー名',
      usernamePlaceholder: 'ユーザー名を入力してください',
      password: 'パスワード',
      passwordPlaceholder: 'パスワードを入力してください',
      phone: '電話番号',
      phonePlaceholder: '電話番号を入力してください',
      code: '認証コード',
      codePlaceholder: '認証コードを入力してください',
      getCode: 'コードを取得',
      remember: '記憶する',
      forgot: 'パスワードをお忘れですか？',
      login: 'ログイン',
      loginLoading: 'ログイン中...'
    },
    validation: {
      phoneRequired: '電話番号を入力してください',
      passwordRequired: 'パスワードを入力してください'
    },
    qrcode: {
      tip: 'スマートフォンでQRコードをスキャンしてください'
    },
    noAccount: 'アカウントをお持ちでない方',
    register: '今すぐ登録',
    passwordResetSuccess: 'パスワードのリセットが完了しました。新しいパスワードでログインしてください'
  },
  register: {
    title: '登録',
    subtitle: 'アカウント作成',
    welcome: 'ナレッジベース管理システムへようこそ',
    success: {
      message: '登録が完了しました！ログインページに移動します'
    },
    form: {
      username: 'ユーザー名',
      usernamePlaceholder: 'ユーザー名を入力してください',
      phone: '電話番号',
      phonePlaceholder: '電話番号を入力してください',
      code: '認証コード',
      codePlaceholder: '認証コードを入力してください',
      getCode: 'コードを取得',
      password: 'パスワード',
      passwordPlaceholder: 'パスワードを入力してください',
      confirmPassword: 'パスワード（確認）',
      confirmPasswordPlaceholder: 'パスワードを再入力してください',
      register: '登録',
      hasAccount: 'すでにアカウントをお持ちの方',
      login: '今すぐログイン',
      or: 'または',
      agreement: '利用規約とプライバシーポリシーに',
      terms: '同意します'
    },
    validation: {
      usernameRequired: 'ユーザー名を入力してください',
      usernameMinLength: 'ユーザー名は{min}文字以上である必要があります',
      usernameMaxLength: 'ユーザー名は{max}文字を超えることはできません',
      phoneRequired: '電話番号を入力してください',
      phoneFormat: '有効な電話番号形式を入力してください',
      codeRequired: '認証コードを入力してください',
      codeFormat: '無効なコード形式です',
      codeNotVerified: '最初に電話番号を認証してください',
      passwordRequired: 'パスワードを入力してください',
      passwordMinLength: 'パスワードは{min}文字以上である必要があります',
      passwordStrength: 'パスワードは大文字、小文字、数字、特殊文字を含む必要があります',
      confirmPasswordRequired: 'パスワードを確認してください',
      passwordMismatch: 'パスワードが一致しません',
      agreementRequired: '利用規約に同意してください',
      passwordWeak: 'パスワード強度：弱',
      passwordMedium: 'パスワード強度：中',
      passwordStrong: 'パスワード強度：強',
      passwordVeryStrong: 'パスワード強度：非常に強い'
    },
    errors: {
      phoneExists: 'この電話番号は既に登録されています',
      invalidCode: '無効または期限切れのコードです',
      systemError: 'システムエラーが発生しました。後でもう一度お試しください'
    }
  },
  wxAuth: {
    title: 'WeChatログイン',
    subtitle: 'WeChatでQRコードをスキャン',
    backToLogin: 'ログインに戻る'
  }
}

export default auth 