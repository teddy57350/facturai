# 📋 ROADMAP FACTURLY

## ✅ Phase 1 : MVP (TERMINÉ)

- [x] Architecture Next.js
- [x] API d'analyse de factures
- [x] Intégration Anthropic Claude
- [x] Extraction PDF/Word/Images
- [x] Génération XML Factur-X EN 16931
- [x] Interface utilisateur 3 étapes
- [x] Système d'exemple intégré
- [x] Configuration Vercel
- [x] Documentation API

## 🚧 Phase 2 : Authentification & Freemium (EN COURS)

### Authentification
- [ ] Système d'inscription/connexion
- [ ] NextAuth.js ou Auth0
- [ ] Gestion des sessions
- [ ] Récupération de mot de passe
- [ ] Profil utilisateur

### Base de données
- [ ] Migration SQLite → PostgreSQL (Supabase ou Neon)
- [ ] Schéma utilisateurs
- [ ] Schéma factures traitées
- [ ] Schéma quotas mensuels
- [ ] Historique des factures

### Système freemium
- [ ] Middleware de vérification du quota
- [ ] Compteur de factures mensuelles
- [ ] Blocage à 10 factures/mois (free)
- [ ] Page de pricing
- [ ] CTA pour upgrade

### Dashboard utilisateur
- [ ] Page "Mes factures"
- [ ] Historique des conversions
- [ ] Re-téléchargement des XML
- [ ] Statistiques d'usage
- [ ] Gestion de l'abonnement

## 💳 Phase 3 : Paiements (PROCHAINE)

### Stripe Integration
- [ ] Setup compte Stripe
- [ ] Créer les produits/prix
- [ ] Page de checkout
- [ ] Webhooks Stripe
- [ ] Gestion des abonnements
- [ ] Annulation/Renouvellement
- [ ] Facturation Stripe

### Plan Pro
- [ ] Débloquer illimité après paiement
- [ ] Badge "Pro" dans l'interface
- [ ] Fonctionnalités exclusives :
  - [ ] API key personnelle
  - [ ] Export en masse
  - [ ] Support prioritaire
  - [ ] Historique complet

## 📝 Phase 4 : Blog & SEO (IMPORTANTE)

### Infrastructure blog
- [ ] Setup Next.js + MDX ou Contentlayer
- [ ] Système de tags/catégories
- [ ] Page d'accueil blog
- [ ] Pages article
- [ ] RSS feed
- [ ] Sitemap XML

### Contenu SEO
- [ ] 20 articles sur Factur-X
  - [ ] "Qu'est-ce que Factur-X ?"
  - [ ] "Obligation 2026 : ce qui change"
  - [ ] "Comment convertir une facture PDF en Factur-X"
  - [ ] "Factur-X vs Chorus Pro : différences"
  - [ ] "Guide complet EN 16931"
  - [ ] "Top 5 erreurs à éviter"
  - [ ] "Factur-X pour TPE/PME"
  - [ ] "Sanctions en cas de non-conformité"
  - [ ] "Factur-X et logiciels comptables"
  - [ ] "Migration vers la facturation électronique"
  - [ ] + 10 autres articles

### SEO technique
- [ ] Meta tags optimisés
- [ ] Open Graph / Twitter Cards
- [ ] Structured data (JSON-LD)
- [ ] Performance (Lighthouse 90+)
- [ ] Images optimisées (WebP)
- [ ] Lazy loading
- [ ] Internal linking

### Acquisition
- [ ] Newsletter (Mailchimp ou Resend)
- [ ] Lead magnet (guide PDF gratuit)
- [ ] Formulaires de contact
- [ ] CTA dans les articles
- [ ] Pop-up sortie (optionnel)

## 🚀 Phase 5 : Croissance

### Analytics
- [ ] Plausible ou Google Analytics
- [ ] Tracking conversions
- [ ] Funnel d'acquisition
- [ ] A/B testing (pricing, CTA)
- [ ] Heatmaps (Hotjar)

### Marketing
- [ ] Landing page optimisée
- [ ] Case studies clients
- [ ] Témoignages
- [ ] Comparateur vs concurrents
- [ ] Programme parrainage (optionnel)

### Partenariats
- [ ] Intégrations logiciels comptables
  - [ ] QuickBooks
  - [ ] Sage
  - [ ] Cegid
  - [ ] Pennylane
- [ ] Partenariats experts-comptables
- [ ] Marketplace Chorus Pro ?

## 🔧 Phase 6 : Améliorations techniques

### Performance
- [ ] Caching API (Redis)
- [ ] Queue système (BullMQ)
- [ ] CDN pour assets
- [ ] Optimisation Claude API (prompts)
- [ ] Batch processing

### Qualité
- [ ] Tests unitaires (Jest)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoring (Sentry)
- [ ] Logs centralisés

### Features avancées
- [ ] API publique pour développeurs
- [ ] Webhooks
- [ ] Export CSV/Excel
- [ ] Templates de factures
- [ ] Multi-langues (EN, DE, ES)
- [ ] Mode sombre
- [ ] PWA (app mobile)

## 📊 KPIs à suivre

### Acquisition
- Visiteurs uniques/mois
- Taux de conversion visiteur → signup
- Taux de conversion signup → première facture
- Taux de conversion free → pro

### Engagement
- Factures traitées/mois
- Taux de rétention (D7, D30)
- NPS (Net Promoter Score)

### Revenus
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Churn rate

## 🎯 Objectifs 2024-2025

### Q2 2024
- ✅ MVP en ligne
- [ ] 100 signups
- [ ] 10 clients payants
- [ ] 500 visiteurs/mois

### Q3 2024
- [ ] 1000 signups
- [ ] 100 clients payants (1900€ MRR)
- [ ] 5000 visiteurs/mois
- [ ] 20 articles de blog

### Q4 2024
- [ ] 5000 signups
- [ ] 500 clients payants (9500€ MRR)
- [ ] 20000 visiteurs/mois
- [ ] Partenariat comptable

### 2025
- [ ] 10000+ signups
- [ ] 1000+ clients payants (19000€ MRR = 228k€ ARR)
- [ ] Équipe de 2-3 personnes
- [ ] Levée de fonds (optionnel)

## 💡 Idées futures

- Mode "comptable" pour gérer plusieurs clients
- Scan de factures par email (send to facturly@...)
- Application mobile native
- IA pour détecter anomalies/fraudes
- Prédiction de trésorerie
- Intégration bancaire (DSP2)
- Marketplace de services (avocats, comptables)

## 🐛 Bugs connus

- [ ] OCR lent sur grosses images (> 5MB)
- [ ] Certains PDF scannés mal parsés
- [ ] Timeout Vercel sur files > 8MB

## 📞 Contact & Support

- Email: contact@facturly.fr
- Twitter: @facturly_fr (à créer)
- LinkedIn: Facturly (à créer)

---

*Dernière mise à jour : Mars 2024*
