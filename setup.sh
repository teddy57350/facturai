#!/bin/bash

# Script de setup automatique Facturly
# Usage: ./setup.sh

echo "🚀 SETUP FACTURLY"
echo "================="
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Installer depuis: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    exit 1
fi

echo "✅ Dépendances installées"
echo ""

# Configurer .env
if [ ! -f .env ]; then
    echo "⚙️  Configuration de l'environnement..."
    cp .env.example .env
    echo ""
    echo "📝 Veuillez éditer le fichier .env et ajouter votre clé API Anthropic"
    echo "   ANTHROPIC_API_KEY=sk-ant-xxxxx"
    echo ""
    read -p "Appuyez sur Entrée une fois la clé ajoutée..."
else
    echo "✅ Fichier .env déjà présent"
fi

echo ""
echo "✨ Setup terminé !"
echo ""
echo "Pour démarrer l'application:"
echo "  npm run dev"
echo ""
echo "Puis ouvrir: http://localhost:3000"
echo ""
