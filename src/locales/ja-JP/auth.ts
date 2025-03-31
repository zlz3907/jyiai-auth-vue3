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
    backToLogin: 'ログインに戻る',
    message: {
      success: 'パスワードのリセットが完了しました',
      redirectingIn: '{seconds}秒後にリダイレクトします',
      error: 'パスワードのリセットに失敗しました'
    }
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
  },
  terms: {
    serviceTerms: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
    serviceTermsTitle: '利用規約',
    serviceTermsIntro: '当サービスをご利用いただき、ありがとうございます。当プラットフォームをご利用いただくことで、これらの規約に同意されたものとみなされます。',
    termsSection1: {
      title: '1. 規約の同意',
      content: '本サービスを利用することにより、本規約に同意し、その条件に拘束されることに同意したものとみなされます。'
    },
    termsSection2: {
      title: '2. 利用ライセンス',
      content: '当ウェブサイト上の資料（情報またはソフトウェア）への一時的なアクセスが許可されます。これは個人の非商業目的の一時的な閲覧のみを目的としています。'
    },
    termsSection3: {
      title: '3. 免責事項',
      content: '当ウェブサイト上の資料は「現状のまま」提供されます。明示的または黙示的な保証は一切提供されず、商品性、特定目的への適合性、知的財産権の侵害またはその他の権利侵害に関する保証を含む、その他のすべての保証を否認します。'
    },
    privacyPolicyTitle: 'プライバシーポリシー',
    privacyPolicyIntro: '本プライバシーポリシーでは、お客様の個人情報の収集、使用、取り扱いについて説明します。',
    privacySection1: {
      title: '1. 収集する情報',
      content: 'お客様から直接提供される情報を収集します。これには、お名前、メールアドレス、およびお客様が選択して提供されるその他の情報が含まれます。'
    },
    privacySection2: {
      title: '2. 情報の使用方法',
      content: '収集した情報は、サービスの運営、維持、機能の提供、取引の処理、およびお客様とのコミュニケーションに使用します。'
    },
    privacySection3: {
      title: '3. 情報の共有',
      content: '本ポリシーで説明されている場合またはお客様の同意がある場合を除き、お客様の個人情報を第三者と共有することはありません。'
    }
  }
}

export default auth 