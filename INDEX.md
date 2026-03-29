# 📦 FACTURLY - INDEX DES FICHIERS

Guide complet de tous les fichiers du projet.

---

## 📖 Documentation (LIRE EN PREMIER)

### 🚀 QUICK_START.md
**Le guide essentiel - commencer ici !**
- Installation en 5 minutes
- Commandes de base
- Déploiement rapide
- Dépannage

### 📘 README.md
**Documentation complète du projet**
- Vue d'ensemble
- Fonctionnalités
- Architecture
- Technologies utilisées

### 🌐 DEPLOIEMENT.md
**Guide de déploiement étape par étape**
- Setup local détaillé
- Déploiement Vercel
- Configuration DNS
- Monitoring

### 📡 API_DOCUMENTATION.md
**Documentation API REST**
- Endpoints `/api/analyser` et `/api/generer`
- Exemples cURL, JS, Python
- Codes d'erreur
- Limites et quotas

### 📋 TODO.md
**Roadmap et prochaines étapes**
- Phases de développement
- Features à venir
- Objectifs 2024-2025
- KPIs à suivre

---

## ⚙️ Configuration

### package.json
**Dépendances npm**
- Next.js 14
- React 18
- Anthropic SDK
- PDF-Parse, Mammoth, Tesseract
- Scripts : `dev`, `build`, `start`

### next.config.js
**Configuration Next.js**
- Headers CORS
- Optimisations
- Regions Vercel

### config.js
**Configuration centralisée**
- Environnements (dev/prod)
- Plans et quotas
- Stripe, Analytics
- Feature flags

### .env.example
**Template des variables d'environnement**
- `ANTHROPIC_API_KEY`
- Variables optionnelles

### vercel.json
**Configuration Vercel**
- Builds
- Régions (Paris CDG)
- Variables d'env

### .gitignore
**Fichiers à ignorer**
- node_modules
- .next
- .env
- Fichiers temporaires

---

## 💻 Code Source

### pages/index.js
**Page principale (UI complète)**
- Interface 3 étapes
- Upload de fichiers
- Formulaire de vérification
- Export XML
- Gestion des événements

### pages/api/analyser.js
**API Route - Analyse de facture**
- Upload multipart/form-data
- Extraction texte (PDF/Word/Images)
- Appel Claude API
- Retour JSON structuré
- Gestion erreurs

### pages/api/generer.js
**API Route - Génération XML**
- Réception données JSON
- Génération XML Factur-X
- Validation EN 16931
- Retour XML

### src/lib/anthropicService.js
**Service Claude API**
- Configuration client Anthropic
- Prompt engineering pour extraction
- Parsing JSON réponse
- Nettoyage données

### src/lib/facturxGenerator.js
**Générateur XML Factur-X**
- Template XML EN 16931
- Calculs TVA
- Escape caractères spéciaux
- Conformité norme européenne

### src/utils/extractText.js
**Extraction de texte**
- PDF → pdf-parse
- Word → mammoth
- Images → tesseract.js (OCR)
- Gestion erreurs

---

## 🗄️ Base de Données (Futur)

### schema.sql
**Schéma SQLite/PostgreSQL**
- Table `users` (utilisateurs)
- Table `invoices` (factures traitées)
- Table `monthly_usage` (quotas)
- Table `payments` (paiements Stripe)
- Index et vues

---

## 🧪 Tests & Scripts

### test-api.js
**Script de test automatisé**
- Test analyser (exemple)
- Test generer (XML)
- Test upload fichier
- Sauvegarde résultats

### setup.sh (Linux/Mac)
**Script d'installation automatique**
- Vérification Node.js
- `npm install`
- Configuration `.env`
- Lancement dev

### setup.bat (Windows)
**Script d'installation Windows**
- Même fonctionnalités que setup.sh
- Syntaxe Batch

---

## 📁 Organisation des Fichiers

```
facturly-app/
│
├── 📖 Documentation
│   ├── QUICK_START.md          ← Commencer ici !
│   ├── README.md
│   ├── DEPLOIEMENT.md
│   ├── API_DOCUMENTATION.md
│   ├── TODO.md
│   └── INDEX.md                ← Vous êtes ici
│
├── ⚙️ Configuration
│   ├── package.json
│   ├── next.config.js
│   ├── config.js
│   ├── vercel.json
│   ├── .env.example
│   └── .gitignore
│
├── 💻 Code Source
│   ├── pages/
│   │   ├── index.js           # Interface utilisateur
│   │   └── api/
│   │       ├── analyser.js    # API analyse
│   │       └── generer.js     # API génération
│   │
│   └── src/
│       ├── lib/
│       │   ├── anthropicService.js
│       │   └── facturxGenerator.js
│       └── utils/
│           └── extractText.js
│
├── 🗄️ Base de Données
│   └── schema.sql             # Schéma BDD (freemium)
│
└── 🧪 Scripts
    ├── test-api.js            # Tests automatisés
    ├── setup.sh               # Setup Linux/Mac
    └── setup.bat              # Setup Windows
```

---

## 🎯 Workflow Recommandé

### 1️⃣ **Installation Locale**
```bash
./setup.sh                     # ou setup.bat sur Windows
npm run dev
```
→ Voir `QUICK_START.md`

### 2️⃣ **Configuration**
```bash
# Éditer .env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```
→ Voir `DEPLOIEMENT.md` section "Clé API"

### 3️⃣ **Test de l'API**
```bash
node test-api.js
```
→ Voir `API_DOCUMENTATION.md`

### 4️⃣ **Déploiement Vercel**
```bash
vercel
```
→ Voir `DEPLOIEMENT.md` section "Vercel"

### 5️⃣ **Développement Features**
→ Voir `TODO.md` pour la roadmap

---

## 🔍 Trouver une Information

| Je cherche... | Fichier |
|---------------|---------|
| Comment démarrer rapidement | `QUICK_START.md` |
| Documentation complète | `README.md` |
| Déployer sur Vercel | `DEPLOIEMENT.md` |
| Utiliser l'API | `API_DOCUMENTATION.md` |
| Prochaines étapes | `TODO.md` |
| Structure du code | `INDEX.md` (ici) |
| Configurer l'app | `config.js` |
| Schéma BDD | `schema.sql` |
| Tester l'API | `test-api.js` |

---

## 📊 Statistiques du Projet

- **Fichiers totaux** : 23
- **Lignes de code** : ~2000
- **Dépendances** : 11
- **API Endpoints** : 2
- **Pages** : 1
- **Documentation** : 6 fichiers

---

## 🚀 Quick Commands

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm run start

# Tests
node test-api.js

# Déploiement
vercel
```

---

## 💡 Pro Tips

1. **Commencer par** `QUICK_START.md` - tout y est !
2. **En cas de bug** → DevTools (F12) → Console/Network
3. **Tester l'API** → `node test-api.js`
4. **Logs Vercel** → vercel.com → Deployments → Logs
5. **Coût API** → console.anthropic.com → Usage

---

## 🆘 Aide Rapide

| Problème | Solution |
|----------|----------|
| Module not found | `rm -rf node_modules && npm install` |
| Erreur API Anthropic | Vérifier `.env` et crédit |
| Port occupé | `PORT=3001 npm run dev` |
| Build Vercel échoue | Vérifier env vars Vercel |
| Upload ne marche pas | Vérifier taille < 10MB |

---

## 📞 Contact

- **Email** : contact@facturly.fr
- **GitHub** : [à créer]
- **Documentation** : Tous les fichiers .md de ce projet

---

*Dernière mise à jour : Mars 2024*
*Version : 1.0.0-beta*
