# ⚡ QUICK START FACTURLY

Guide ultra-rapide pour lancer Facturly en 5 minutes.

---

## 📋 Prérequis

- **Node.js 18+** : https://nodejs.org/
- **Compte Anthropic** : https://console.anthropic.com/
- **Git** (optionnel) : https://git-scm.com/

---

## 🚀 Installation Locale (2 minutes)

```bash
# 1. Naviguer dans le dossier
cd facturly-app

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env

# 4. Éditer .env et ajouter votre clé API
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# 5. Lancer le serveur
npm run dev
```

**Ouvrir** : http://localhost:3000

**Tester** : Cliquer sur "Tester avec un exemple"

---

## 🌐 Déploiement Vercel (3 minutes)

### Méthode 1 : Via GitHub (recommandé)

```bash
# 1. Créer un repo GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/facturly.git
git push -u origin main

# 2. Aller sur vercel.com
# 3. Import from GitHub
# 4. Sélectionner le repo
# 5. Ajouter ANTHROPIC_API_KEY dans Environment Variables
# 6. Deploy !
```

### Méthode 2 : Via CLI Vercel

```bash
npm i -g vercel
vercel login
vercel
# Suivre les instructions
vercel env add ANTHROPIC_API_KEY
```

Votre site sera en ligne sur : `https://facturly-xxxxx.vercel.app`

---

## 🔑 Obtenir la clé API Anthropic

1. https://console.anthropic.com/
2. Se connecter / créer un compte
3. "API Keys" → "Create Key"
4. Copier la clé (commence par `sk-ant-`)
5. Ajouter ~5€ de crédit pour commencer
6. Coller dans `.env` : `ANTHROPIC_API_KEY=sk-ant-xxxxx`

**Coût estimé** : ~0.003$ par facture (Claude Sonnet)

---

## 📁 Structure du Projet

```
facturly-app/
├── pages/
│   ├── index.js                    # Interface principale
│   └── api/
│       ├── analyser.js             # Analyse facture
│       └── generer.js              # Génère XML
├── src/
│   ├── lib/
│   │   ├── anthropicService.js     # Service Claude
│   │   └── facturxGenerator.js     # Générateur XML
│   └── utils/
│       └── extractText.js          # Extraction texte
├── .env                            # Config (à créer)
├── package.json                    # Dépendances
└── next.config.js                  # Config Next.js
```

---

## 🧪 Tester l'API

### Exemple 1 : Analyser une facture

```bash
curl -X POST http://localhost:3000/api/analyser \
  -F "facture=@ma_facture.pdf"
```

### Exemple 2 : Générer XML

```bash
curl -X POST http://localhost:3000/api/generer \
  -H "Content-Type: application/json" \
  -d '{
    "facture": {
      "numero": "FAC-001",
      "date_emission": "2024-03-15",
      ...
    }
  }'
```

### Script de test automatisé

```bash
node test-api.js
```

---

## 📚 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `README.md` | Documentation complète |
| `DEPLOIEMENT.md` | Guide de déploiement détaillé |
| `API_DOCUMENTATION.md` | Documentation API complète |
| `TODO.md` | Roadmap et prochaines étapes |
| `schema.sql` | Schéma BDD (freemium) |
| `config.js` | Configuration centralisée |

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev              # Lancer en dev
npm run build            # Build production
npm run start            # Lancer en prod

# Tests
node test-api.js         # Tester l'API

# Déploiement
vercel                   # Déployer sur Vercel
vercel --prod            # Déployer en production

# Base de données (futur)
sqlite3 facturly.db < schema.sql   # Créer la BDD
```

---

## ⚠️ Dépannage Rapide

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur API Anthropic
- Vérifier `.env` existe et contient `ANTHROPIC_API_KEY`
- Vérifier la clé commence par `sk-ant-`
- Vérifier le crédit sur console.anthropic.com

### Port 3000 déjà utilisé
```bash
PORT=3001 npm run dev
```

### Build échoue sur Vercel
- Vérifier `ANTHROPIC_API_KEY` dans Environment Variables
- Vérifier les logs Vercel (onglet "Deployments")

---

## 📊 Métriques de Performance

| Métrique | Valeur |
|----------|--------|
| **Temps d'analyse** | 2-5 secondes (PDF) |
| **Temps OCR** | 10-20 secondes (images) |
| **Taille max fichier** | 10 MB |
| **Coût par facture** | ~0.003$ |
| **Temps de build** | ~60 secondes |

---

## 🎯 Prochaines Étapes

1. ✅ **Tester en local** → `npm run dev`
2. ✅ **Déployer sur Vercel** → `vercel`
3. 📝 **Ajouter authentification** → NextAuth.js
4. 💳 **Intégrer paiements** → Stripe
5. 📊 **Créer le blog SEO** → Next.js + MDX
6. 🚀 **Lancer le marketing** → Contenu + SEO

Voir `TODO.md` pour la roadmap complète.

---

## 🆘 Support

- **Email** : contact@facturly.fr
- **Issues** : GitHub Issues
- **Doc API** : `API_DOCUMENTATION.md`
- **Guide déploiement** : `DEPLOIEMENT.md`

---

## 💡 Tips

- **Commencer simple** : Tester avec le bouton "Exemple"
- **Logs** : `console.log` dans les API routes
- **Debugging** : DevTools → Network → API calls
- **Performance** : Lighthouse dans Chrome
- **SEO** : Google Search Console une fois en prod

---

## 🎉 C'est Parti !

```bash
cd facturly-app
npm install
npm run dev
```

**→ http://localhost:3000**

Bonne chance ! 🚀
