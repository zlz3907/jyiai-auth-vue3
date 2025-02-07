import type { AuthMessages } from '../types'

const auth: AuthMessages = {
  forgot: {
    title: 'Mot de passe oublié',
    subtitle: 'Veuillez saisir votre numéro de téléphone pour réinitialiser le mot de passe',
    form: {
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      codePlaceholder: 'Entrez le code de vérification',
      newPasswordPlaceholder: 'Entrez le nouveau mot de passe',
      sendCode: 'Envoyer le code',
      next: 'Suivant',
      reset: 'Réinitialiser le mot de passe'
    },
    validation: {
      phoneRequired: 'Veuillez saisir votre numéro de téléphone',
      codeRequired: 'Veuillez saisir le code de vérification',
      passwordRequired: 'Veuillez saisir le nouveau mot de passe'
    },
    backToLogin: 'Retour à la connexion'
  },
  login: {
    title: 'Connexion',
    subtitle: 'Bon retour',
    welcome: 'Bienvenue dans le système de gestion des connaissances',
    tabs: {
      password: 'Connexion par mot de passe',
      phone: 'Connexion par téléphone',
      qrcode: 'Connexion par QR code'
    },
    form: {
      username: "Nom d'utilisateur",
      usernamePlaceholder: "Entrez votre nom d'utilisateur",
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      phone: 'Numéro de téléphone',
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      code: 'Code de vérification',
      codePlaceholder: 'Entrez le code',
      getCode: 'Obtenir le code',
      remember: 'Se souvenir de moi',
      forgot: 'Mot de passe oublié ?',
      login: 'Se connecter',
      loginLoading: 'Connexion en cours...'
    },
    validation: {
      phoneRequired: 'Veuillez saisir votre numéro de téléphone',
      passwordRequired: 'Veuillez saisir votre mot de passe'
    },
    qrcode: {
      tip: 'Veuillez scanner le QR code avec votre téléphone'
    },
    noAccount: 'Pas encore de compte ?',
    register: "S'inscrire maintenant",
    passwordResetSuccess: 'Mot de passe réinitialisé avec succès, veuillez vous connecter avec votre nouveau mot de passe'
  },
  register: {
    title: 'Inscription',
    subtitle: 'Créer un compte',
    welcome: 'Bienvenue dans le système de gestion des connaissances',
    success: {
      message: 'Inscription réussie ! Redirection vers la page de connexion'
    },
    form: {
      username: "Nom d'utilisateur",
      usernamePlaceholder: "Entrez votre nom d'utilisateur",
      phone: 'Numéro de téléphone',
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      code: 'Code de vérification',
      codePlaceholder: 'Entrez le code',
      getCode: 'Obtenir le code',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: 'Entrez à nouveau votre mot de passe',
      register: "S'inscrire",
      hasAccount: 'Déjà un compte ?',
      login: 'Se connecter maintenant',
      or: 'ou',
      agreement: "J'ai lu et j'accepte les",
      terms: "conditions d'utilisation et la politique de confidentialité"
    },
    validation: {
      usernameRequired: "Veuillez saisir votre nom d'utilisateur",
      usernameMinLength: "Le nom d'utilisateur doit contenir au moins {min} caractères",
      usernameMaxLength: "Le nom d'utilisateur ne peut pas dépasser {max} caractères",
      phoneRequired: 'Veuillez saisir votre numéro de téléphone',
      phoneFormat: 'Veuillez saisir un format de numéro de téléphone valide',
      codeRequired: 'Veuillez saisir le code de vérification',
      codeFormat: 'Format de code invalide',
      codeNotVerified: 'Veuillez d\'abord vérifier votre numéro de téléphone',
      passwordRequired: 'Veuillez saisir votre mot de passe',
      passwordMinLength: 'Le mot de passe doit contenir au moins {min} caractères',
      passwordStrength: 'Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux',
      confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      agreementRequired: "Veuillez lire et accepter les conditions d'utilisation",
      passwordWeak: 'Force du mot de passe : Faible',
      passwordMedium: 'Force du mot de passe : Moyenne',
      passwordStrong: 'Force du mot de passe : Forte',
      passwordVeryStrong: 'Force du mot de passe : Très forte'
    },
    errors: {
      phoneExists: 'Ce numéro de téléphone est déjà enregistré',
      invalidCode: 'Code invalide ou expiré',
      systemError: 'Erreur système, veuillez réessayer plus tard'
    }
  }
}

export default auth 