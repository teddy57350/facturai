# Facturly - Convertisseur de factures en Factur-X

Application web Next.js pour convertir automatiquement des factures en format Factur-X (EN 16931) grâce à l'IA Claude.

## 🚀 Fonctionnalités

- ✅ Upload de factures (PDF, Word, Images)
- ✅ Extraction automatique des données via Claude AI
- ✅ Génération XML Factur-X conforme EN 16931
- ✅ Interface intuitive en 3 étapes
- ✅ Téléchargement du fichier XML

## 📦 Installation locale

```bash
# Cloner le projet
cd facturly-app

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env et ajouter votre clé API Anthropic

# Lancer en dev
npm run dev
```

L'app sera disponible sur `http://localhost:3000`

## 🔑 Configuration

Créer un fichier `.env` à la racine :

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

Pour obtenir une clé API : https://console.anthropic.com/

## 🌐 Déploiement sur Vercel

### 1. Via l'interface Vercel

1. Connecter votre compte GitHub à Vercel
2. Importer le repository `facturly-app`
3. Configurer les variables d'environnement :
   - `ANTHROPIC_API_KEY` : votre clé API Anthropic
4. Déployer !

### 2. Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter la variable d'environnement
vercel env add ANTHROPIC_API_KEY
```

## 📁 Structure du projet

```
facturly-app/
├── pages/
│   ├── index.js              # Page principale
│   └── api/
│       ├── analyser.js       # API d'analyse de facture
│       └── generer.js        # API de génération XML
├── src/
│   ├── lib/
│   │   ├── anthropicService.js    # Service Claude AI
│   │   └── facturxGenerator.js    # Générateur XML
│   └── utils/
│       └── extractText.js         # Extraction de texte
├── package.json
└── next.config.js
```

## 🧪 Tester l'API

### Endpoint `/api/analyser`

```bash
curl -X POST http://localhost:3000/api/analyser \
  -F "facture=@ma_facture.pdf"
```

### Endpoint `/api/generer`

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

## 🛠️ Technologies utilisées

- **Next.js 14** : Framework React
- **Anthropic Claude API** : Extraction intelligente de données
- **PDF-Parse** : Lecture de PDF
- **Mammoth** : Lecture de fichiers Word
- **Tesseract.js** : OCR pour images
- **XML** : Génération Factur-X conforme EN 16931

## 📄 Licence

MIT

## 🤝 Support

Pour toute question : contact@facturly.fr
