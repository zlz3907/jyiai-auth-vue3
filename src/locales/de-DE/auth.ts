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
      phoneRequired: 'Bitte Telefonnummer eingeben',
      codeRequired: 'Bitte Verifizierungscode eingeben',
      passwordRequired: 'Bitte neues Passwort eingeben'
    },
    backToLogin: 'Zurück zum Login'
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
  }
}

export default auth 