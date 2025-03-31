import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: 'Passwort vergessen',
    subtitle: 'Bitte geben Sie Ihre Telefonnummer ein, um das Passwort zurückzusetzen',
    form: {
      phonePlaceholder: 'Telefonnummer eingeben',
      codePlaceholder: 'Verifizierungscode eingeben',
      newPasswordPlaceholder: 'Neues Passwort eingeben',
      sendCode: 'Code senden',
      next: 'Weiter',
      reset: 'Passwort zurücksetzen'
    },
    validation: {
      phoneRequired: 'Bitte geben Sie Ihre Telefonnummer ein',
      codeRequired: 'Bitte geben Sie den Verifizierungscode ein',
      passwordRequired: 'Bitte geben Sie ein neues Passwort ein'
    },
    backToLogin: 'Zurück zum Login',
    message: {
      success: 'Passwort erfolgreich zurückgesetzt',
      redirectingIn: 'Weiterleitung in {seconds} Sekunden',
      error: 'Fehler beim Zurücksetzen des Passworts'
    }
  },
  login: {
    title: 'Anmelden',
    subtitle: 'Willkommen zurück',
    welcome: 'Willkommen im Wissensmanagementsystem',
    tabs: {
      password: 'Passwort-Login',
      phone: 'Telefon-Login',
      qrcode: 'QR-Code-Login'
    },
    form: {
      username: 'Benutzername',
      usernamePlaceholder: 'Bitte Benutzernamen eingeben',
      password: 'Passwort',
      passwordPlaceholder: 'Bitte Passwort eingeben',
      phone: 'Telefonnummer',
      phonePlaceholder: 'Bitte Telefonnummer eingeben',
      code: 'Verifizierungscode',
      codePlaceholder: 'Bitte Code eingeben',
      getCode: 'Code anfordern',
      remember: 'Angemeldet bleiben',
      forgot: 'Passwort vergessen?',
      login: 'Anmelden',
      loginLoading: 'Anmeldung läuft...'
    },
    validation: {
      phoneRequired: 'Bitte Telefonnummer eingeben',
      passwordRequired: 'Bitte Passwort eingeben'
    },
    qrcode: {
      tip: 'Bitte scannen Sie den QR-Code mit Ihrem Smartphone'
    },
    noAccount: 'Noch kein Konto?',
    register: 'Jetzt registrieren',
    passwordResetSuccess: 'Passwort erfolgreich zurückgesetzt, bitte melden Sie sich mit Ihrem neuen Passwort an'
  },
  register: {
    title: 'Registrieren',
    subtitle: 'Konto erstellen',
    welcome: 'Willkommen im Wissensmanagementsystem',
    success: {
      message: 'Registrierung erfolgreich! Sie werden zur Anmeldeseite weitergeleitet'
    },
    form: {
      username: 'Benutzername',
      usernamePlaceholder: 'Bitte Benutzernamen eingeben',
      phone: 'Telefonnummer',
      phonePlaceholder: 'Bitte Telefonnummer eingeben',
      code: 'Verifizierungscode',
      codePlaceholder: 'Bitte Code eingeben',
      getCode: 'Code anfordern',
      password: 'Passwort',
      passwordPlaceholder: 'Bitte Passwort eingeben',
      confirmPassword: 'Passwort bestätigen',
      confirmPasswordPlaceholder: 'Bitte Passwort wiederholen',
      register: 'Registrieren',
      hasAccount: 'Bereits ein Konto?',
      login: 'Jetzt anmelden',
      or: 'oder',
      agreement: 'Ich habe die',
      terms: 'Nutzungsbedingungen und Datenschutzerklärung gelesen und stimme zu'
    },
    validation: {
      usernameRequired: 'Bitte Benutzernamen eingeben',
      usernameMinLength: 'Benutzername muss mindestens {min} Zeichen lang sein',
      usernameMaxLength: 'Benutzername darf nicht länger als {max} Zeichen sein',
      phoneRequired: 'Bitte Telefonnummer eingeben',
      phoneFormat: 'Bitte gültige Telefonnummer eingeben',
      codeRequired: 'Bitte Verifizierungscode eingeben',
      codeFormat: 'Ungültiges Code-Format',
      codeNotVerified: 'Bitte zuerst Telefonnummer verifizieren',
      passwordRequired: 'Bitte Passwort eingeben',
      passwordMinLength: 'Passwort muss mindestens {min} Zeichen lang sein',
      passwordStrength: 'Passwort muss Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten',
      confirmPasswordRequired: 'Bitte Passwort bestätigen',
      passwordMismatch: 'Passwörter stimmen nicht überein',
      agreementRequired: 'Bitte Nutzungsbedingungen akzeptieren',
      passwordWeak: 'Passwortstärke: Schwach',
      passwordMedium: 'Passwortstärke: Mittel',
      passwordStrong: 'Passwortstärke: Stark',
      passwordVeryStrong: 'Passwortstärke: Sehr stark'
    },
    errors: {
      phoneExists: 'Diese Telefonnummer ist bereits registriert',
      invalidCode: 'Ungültiger oder abgelaufener Code',
      systemError: 'Systemfehler, bitte versuchen Sie es später erneut'
    }
  },
  wxAuth: {
    title: 'WeChat-Anmeldung',
    subtitle: 'QR-Code mit WeChat scannen',
    backToLogin: 'Zurück zur Anmeldung'
  },
  terms: {
    serviceTerms: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzerklärung',
    serviceTermsTitle: 'Nutzungsbedingungen',
    serviceTermsIntro: 'Willkommen bei unserem Service. Durch die Nutzung unserer Plattform akzeptieren Sie diese Bedingungen.',
    termsSection1: {
      title: '1. Annahme der Bedingungen',
      content: 'Durch den Zugriff auf und die Nutzung dieses Services akzeptieren Sie und stimmen zu, durch die Bedingungen dieser Vereinbarung gebunden zu sein.'
    },
    termsSection2: {
      title: '2. Nutzungslizenz',
      content: 'Der temporäre Zugriff auf Materialien (Informationen oder Software) auf unserer Website wird nur für persönliche, nicht-kommerzielle vorübergehende Betrachtung gewährt.'
    },
    termsSection3: {
      title: '3. Haftungsausschluss',
      content: 'Die Materialien auf unserer Website werden "wie besehen" bereitgestellt. Wir geben keine Garantien, weder ausdrücklich noch stillschweigend, und lehnen hiermit alle anderen Garantien ab, einschließlich, aber nicht beschränkt auf stillschweigende Garantien der Handelsfähigkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung geistiger Eigentumsrechte.'
    },
    privacyPolicyTitle: 'Datenschutzerklärung',
    privacyPolicyIntro: 'Diese Datenschutzerklärung beschreibt, wie wir Ihre personenbezogenen Daten sammeln, verwenden und verarbeiten.',
    privacySection1: {
      title: '1. Informationen, die wir sammeln',
      content: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich, aber nicht beschränkt auf Ihren Namen, E-Mail-Adresse und alle anderen Informationen, die Sie bereitstellen möchten.'
    },
    privacySection2: {
      title: '2. Wie wir Ihre Informationen verwenden',
      content: 'Wir verwenden die gesammelten Informationen, um den Service zu betreiben, zu warten und Ihnen die Funktionen bereitzustellen, Ihre Transaktionen zu verarbeiten und mit Ihnen zu kommunizieren.'
    },
    privacySection3: {
      title: '3. Informationsweitergabe',
      content: 'Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, es sei denn, dies ist in dieser Richtlinie beschrieben oder Sie haben zugestimmt.'
    }
  }
}

export default auth 