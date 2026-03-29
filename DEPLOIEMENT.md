# 🚀 GUIDE DE DÉPLOIEMENT FACTURLY

## Étape 1 : Préparer le projet localement

```bash
cd facturly-app

# Copier le fichier .env
cp .env.example .env

# Éditer .env et ajouter votre clé API Anthropic
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

## Étape 2 : Obtenir une clé API Anthropic

1. Aller sur https://console.anthropic.com/
2. Se connecter / créer un compte
3. Aller dans "API Keys"
4. Créer une nouvelle clé
5. Copier la clé (commence par `sk-ant-`)

## Étape 3 : Installer les dépendances

```bash
npm install
```

## Étape 4 : Tester en local

```bash
npm run dev
```

Ouvrir http://localhost:3000

Cliquer sur "Tester avec un exemple" pour vérifier que tout fonctionne.

## Étape 5 : Déployer sur Vercel

### Option A : Via GitHub (recommandé)

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit Facturly"
   git branch -M main
   git remote add origin https://github.com/TON_USERNAME/facturly.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur https://vercel.com
   - Cliquer "Add New Project"
   - Importer depuis GitHub
   - Sélectionner le repo `facturly`

3. **Configurer les variables d'environnement**
   - Dans Vercel, aller dans "Settings" → "Environment Variables"
   - Ajouter : `ANTHROPIC_API_KEY` = `sk-ant-xxxxx`

4. **Déployer**
   - Cliquer "Deploy"
   - Attendre 2-3 minutes
   - Votre site est en ligne ! 🎉

### Option B : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions interactives
# Quand demandé, ajouter ANTHROPIC_API_KEY
```

## Étape 6 : Configurer un domaine personnalisé (optionnel)

Dans Vercel :
1. Aller dans "Settings" → "Domains"
2. Ajouter `facturly.fr` (ou ton domaine)
3. Suivre les instructions DNS

## 🔧 Dépannage

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur API Anthropic
- Vérifier que la clé API est bien dans `.env`
- Vérifier que la clé commence par `sk-ant-`
- Vérifier qu'il y a du crédit sur le compte Anthropic

### PDF ne se charge pas
- Vérifier la taille du fichier (max 10MB)
- Tester avec le bouton "Exemple" d'abord

### L'upload ne fonctionne pas sur Vercel
- Vercel limite les uploads à 4.5MB par défaut
- Pour augmenter : ajouter dans `vercel.json` :
  ```json
  {
    "functions": {
      "api/analyser.js": {
        "maxDuration": 30,
        "memory": 1024
      }
    }
  }
  ```

## 📊 Monitoring

Dans Vercel, onglet "Analytics" pour voir :
- Nombre de requêtes
- Temps de réponse
- Erreurs

## 💰 Coûts estimés

- **Vercel** : Gratuit jusqu'à 100GB de bande passante/mois
- **Anthropic API** : ~0.003$ par facture analysée (Claude Sonnet)
  - 1000 factures ≈ 3$
  - 10000 factures ≈ 30$

## 🎯 Prochaines étapes

1. Ajouter un système de paiement (Stripe)
2. Limiter à 10 factures/mois en gratuit
3. Ajouter un tableau de bord utilisateur
4. Créer le blog SEO pour le trafic organique

## 🆘 Besoin d'aide ?

1. Vérifier la console du navigateur (F12)
2. Vérifier les logs Vercel
3. Me contacter si bloqué
