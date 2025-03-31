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
      phoneRequired: 'Veuillez entrer votre numéro de téléphone',
      codeRequired: 'Veuillez entrer le code de vérification',
      passwordRequired: 'Veuillez entrer un nouveau mot de passe'
    },
    backToLogin: 'Retour à la connexion',
    message: {
      success: 'Mot de passe réinitialisé avec succès',
      redirectingIn: 'Redirection dans {seconds} secondes',
      error: 'Échec de la réinitialisation du mot de passe'
    }
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
  },
  wxAuth: {
    title: 'Connexion WeChat',
    subtitle: 'Scanner le code QR avec WeChat',
    backToLogin: 'Retour à la connexion'
  },
  terms: {
    serviceTerms: "Conditions d'utilisation",
    privacyPolicy: 'Politique de confidentialité',
    serviceTermsTitle: "Conditions d'utilisation",
    serviceTermsIntro: 'Bienvenue sur notre service. En utilisant notre plateforme, vous acceptez ces conditions.',
    termsSection1: {
      title: '1. Acceptation des conditions',
      content: "En accédant et en utilisant ce service, vous acceptez et convenez d'être lié par les conditions de cet accord."
    },
    termsSection2: {
      title: '2. Licence d\'utilisation',
      content: 'L\'accès temporaire aux documents (informations ou logiciels) sur notre site web est accordé uniquement pour une consultation personnelle et non commerciale.'
    },
    termsSection3: {
      title: '3. Clause de non-responsabilité',
      content: 'Les documents sur notre site web sont fournis "tels quels". Nous ne fournissons aucune garantie, expresse ou implicite, et rejetons par la présente toutes les autres garanties, y compris, sans limitation, les garanties implicites de qualité marchande, d\'adéquation à un usage particulier ou de non-violation des droits de propriété intellectuelle.'
    },
    privacyPolicyTitle: 'Politique de confidentialité',
    privacyPolicyIntro: 'Cette politique de confidentialité décrit comment nous collectons, utilisons et traitons vos informations personnelles.',
    privacySection1: {
      title: '1. Informations que nous collectons',
      content: 'Nous collectons les informations que vous nous fournissez directement, y compris, sans limitation, votre nom, adresse e-mail et toute autre information que vous choisissez de fournir.'
    },
    privacySection2: {
      title: '2. Comment nous utilisons vos informations',
      content: 'Nous utilisons les informations collectées pour exploiter, maintenir et vous fournir les fonctionnalités du service, traiter vos transactions et communiquer avec vous.'
    },
    privacySection3: {
      title: '3. Partage d\'informations',
      content: 'Nous ne partageons pas vos informations personnelles avec des tiers, sauf comme décrit dans cette politique ou avec votre consentement.'
    }
  }
}

export default auth 