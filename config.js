// config.js
// Configuration centralisée pour Facturly

const config = {
  // Environnement
  env: process.env.NODE_ENV || 'development',
  
  // Anthropic API
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '2000'),
  },
  
  // Limites de fichiers
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB par défaut
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ],
  },
  
  // Plans et quotas
  plans: {
    free: {
      name: 'Gratuit',
      monthlyQuota: 10,
      price: 0,
      features: [
        '10 factures/mois',
        'Extraction automatique',
        'XML Factur-X',
        'Support email',
      ],
    },
    pro: {
      name: 'Pro',
      monthlyQuota: -1, // illimité
      price: 19,
      currency: 'EUR',
      features: [
        'Factures illimitées',
        'Extraction automatique',
        'XML Factur-X',
        'Support prioritaire',
        'API Access',
        'Historique complet',
      ],
    },
  },
  
  // Stripe (paiements)
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    proPriceId: process.env.STRIPE_PRO_PRICE_ID,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  // Base de données
  database: {
    url: process.env.DATABASE_URL || './facturly.db',
    type: process.env.DATABASE_TYPE || 'sqlite', // 'sqlite' ou 'postgres'
  },
  
  // Email (notifications)
  email: {
    provider: process.env.EMAIL_PROVIDER || 'resend', // 'resend' ou 'sendgrid'
    apiKey: process.env.EMAIL_API_KEY,
    from: process.env.EMAIL_FROM || 'noreply@facturly.fr',
  },
  
  // URLs
  urls: {
    base: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    api: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  
  // Analytics
  analytics: {
    plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
  },
  
  // Features flags
  features: {
    allowSignup: process.env.FEATURE_ALLOW_SIGNUP !== 'false',
    allowPayment: process.env.FEATURE_ALLOW_PAYMENT === 'true',
    allowOCR: process.env.FEATURE_ALLOW_OCR !== 'false',
    maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
  },
  
  // Sécurité
  security: {
    jwtSecret: process.env.JWT_SECRET || 'changeme-in-production',
    sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE || '2592000'), // 30 jours
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  },
};

// Validation en production
if (config.env === 'production') {
  const required = [
    'ANTHROPIC_API_KEY',
    'JWT_SECRET',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Variables d\'environnement manquantes:', missing);
    process.exit(1);
  }
  
  if (config.security.jwtSecret === 'changeme-in-production') {
    console.error('❌ JWT_SECRET doit être changé en production !');
    process.exit(1);
  }
}

module.exports = config;
