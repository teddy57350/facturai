# 📡 DOCUMENTATION API FACTURLY

## Vue d'ensemble

Facturly expose 2 endpoints API REST :
- **POST /api/analyser** : Analyse une facture et extrait les données
- **POST /api/generer** : Génère le XML Factur-X à partir des données

Base URL : `https://votre-domaine.vercel.app`

---

## 1. POST /api/analyser

Analyse un fichier de facture et extrait les données structurées via l'IA Claude.

### Requête

**Endpoint:** `/api/analyser`

**Method:** `POST`

**Content-Type:** `multipart/form-data`

**Body:**
```
facture: File (PDF, DOCX, JPG, PNG) - max 10MB
```

### Exemples

#### cURL
```bash
curl -X POST https://facturly.vercel.app/api/analyser \
  -F "facture=@ma_facture.pdf"
```

#### JavaScript (Fetch)
```javascript
const formData = new FormData();
formData.append('facture', fileInput.files[0]);

const response = await fetch('/api/analyser', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

#### Python
```python
import requests

files = {'facture': open('ma_facture.pdf', 'rb')}
response = requests.post('https://facturly.vercel.app/api/analyser', files=files)
data = response.json()
```

### Réponse Success (200)

```json
{
  "facture": {
    "numero": "FAC-2024-0042",
    "date_emission": "2024-03-15",
    "date_echeance": "2024-04-15",
    "emetteur": {
      "nom": "Tech Solutions SARL",
      "siret": "85234567800012",
      "tva": "FR12852345678",
      "adresse": "15 rue de la Innovation, 67000 Strasbourg"
    },
    "client": {
      "nom": "Boulangerie Martin",
      "siret": "79845612300045",
      "adresse": "8 avenue du Pain, 51200 Épernay"
    },
    "lignes": [
      {
        "description": "Licence logiciel annuelle",
        "quantite": 1,
        "prix_unitaire": 890.00,
        "taux_tva": 20,
        "total_ht": 890.00
      }
    ],
    "totaux": {
      "ht": 1940.00,
      "tva": 388.00,
      "ttc": 2328.00
    },
    "confiance": 93
  }
}
```

### Réponse Erreur (500)

```json
{
  "erreur": "Format de fichier non supporté"
}
```

### Codes de réponse

- **200** : Succès
- **405** : Méthode non autorisée (utiliser POST)
- **500** : Erreur serveur (parsing, API Claude, etc.)

### Note sur l'exemple

Si aucun fichier n'est uploadé (`facture` absent), l'API retourne automatiquement une **facture d'exemple** pour tester l'interface.

---

## 2. POST /api/generer

Génère un fichier XML Factur-X conforme EN 16931 à partir des données de facture.

### Requête

**Endpoint:** `/api/generer`

**Method:** `POST`

**Content-Type:** `application/json`

**Body:**
```json
{
  "facture": {
    "numero": "FAC-2024-0042",
    "date_emission": "2024-03-15",
    "date_echeance": "2024-04-15",
    "emetteur": {
      "nom": "Tech Solutions SARL",
      "siret": "85234567800012",
      "tva": "FR12852345678",
      "adresse": "15 rue de la Innovation, 67000 Strasbourg"
    },
    "client": {
      "nom": "Boulangerie Martin",
      "siret": "79845612300045",
      "adresse": "8 avenue du Pain, 51200 Épernay"
    },
    "lignes": [
      {
        "description": "Licence logiciel",
        "quantite": 1,
        "prix_unitaire": 890.00,
        "taux_tva": 20,
        "total_ht": 890.00
      }
    ],
    "totaux": {
      "ht": 1940.00,
      "tva": 388.00,
      "ttc": 2328.00
    }
  }
}
```

### Exemples

#### cURL
```bash
curl -X POST https://facturly.vercel.app/api/generer \
  -H "Content-Type: application/json" \
  -d '{
    "facture": {
      "numero": "FAC-001",
      "date_emission": "2024-03-15",
      ...
    }
  }'
```

#### JavaScript (Fetch)
```javascript
const response = await fetch('/api/generer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ facture: factureData })
});

const result = await response.json();
const xmlContent = result.xml;
```

#### Python
```python
import requests
import json

data = {
    "facture": {
        "numero": "FAC-001",
        "date_emission": "2024-03-15",
        # ...
    }
}

response = requests.post(
    'https://facturly.vercel.app/api/generer',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(data)
)

xml_content = response.json()['xml']
```

### Réponse Success (200)

```json
{
  "xml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rsm:CrossIndustryInvoice ...",
  "success": true
}
```

Le champ `xml` contient le XML Factur-X complet conforme EN 16931.

### Réponse Erreur (400)

```json
{
  "erreur": "Données de facture manquantes"
}
```

### Réponse Erreur (500)

```json
{
  "erreur": "Erreur lors de la génération du XML"
}
```

### Codes de réponse

- **200** : Succès
- **400** : Requête invalide (données manquantes)
- **405** : Méthode non autorisée (utiliser POST)
- **500** : Erreur serveur

---

## Structure de données Facture

### Objet Facture complet

```typescript
interface Facture {
  numero: string;                    // Numéro de facture
  date_emission: string;             // Format YYYY-MM-DD
  date_echeance: string;             // Format YYYY-MM-DD
  
  emetteur: {
    nom: string;                     // Raison sociale
    siret: string;                   // 14 chiffres
    tva: string;                     // Format FR + 11 chiffres
    adresse: string;                 // Adresse complète
  };
  
  client: {
    nom: string;                     // Raison sociale
    siret?: string;                  // 14 chiffres (optionnel)
    adresse: string;                 // Adresse complète
  };
  
  lignes: Array<{
    description: string;             // Description du produit/service
    quantite: number;                // Quantité
    prix_unitaire: number;           // Prix unitaire HT
    taux_tva: number;                // Taux de TVA en %
    total_ht: number;                // Total HT de la ligne
  }>;
  
  totaux: {
    ht: number;                      // Total HT
    tva: number;                     // Total TVA
    ttc: number;                     // Total TTC
  };
  
  confiance?: number;                // Score de confiance (0-100)
}
```

---

## Formats de fichiers supportés

### POST /api/analyser accepte :

| Format | Extension | MIME Type | Note |
|--------|-----------|-----------|------|
| PDF | `.pdf` | `application/pdf` | Texte extractible uniquement |
| Word | `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | Office 2007+ |
| Image | `.jpg`, `.jpeg` | `image/jpeg` | OCR via Tesseract |
| Image | `.png` | `image/png` | OCR via Tesseract |

**Note :** Les PDF scannés sans couche texte utilisent l'OCR (plus lent).

---

## Limites et quotas

### Taille de fichier
- **Max upload** : 10 MB par fichier
- **Recommandé** : < 5 MB pour performance optimale

### Rate limiting
- **Vercel** : 100 requêtes/10 secondes par IP
- **Anthropic API** : Variable selon votre plan

### Timeout
- **Fonction serverless** : 30 secondes max sur Vercel Hobby
- **OCR** : Peut prendre 10-20s pour images complexes

---

## Gestion des erreurs

### Erreurs courantes

| Code | Message | Cause probable | Solution |
|------|---------|----------------|----------|
| 500 | "Format de fichier non supporté" | Type MIME non reconnu | Utiliser PDF, DOCX, JPG ou PNG |
| 500 | "Impossible d'extraire les données" | Erreur Claude API | Vérifier la clé API et le crédit |
| 400 | "Données de facture manquantes" | Body JSON incomplet | Envoyer objet `facture` complet |
| 413 | "Payload too large" | Fichier > 10MB | Compresser le fichier |

### Retry logic recommandée

```javascript
async function analyserAvecRetry(file, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const formData = new FormData();
      formData.append('facture', file);
      
      const response = await fetch('/api/analyser', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // backoff
    }
  }
}
```

---

## Sécurité

### CORS
L'API accepte les requêtes depuis n'importe quelle origine (`Access-Control-Allow-Origin: *`)

Pour restreindre en production, modifier `next.config.js` :

```javascript
async headers() {
  return [{
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: 'https://votre-domaine.com' },
    ],
  }]
}
```

### Authentification

Actuellement **aucune authentification** n'est requise.

Pour ajouter une authentification par API key :

```javascript
// pages/api/analyser.js
export default async function handler(req, res) {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ erreur: 'Non autorisé' });
  }
  
  // ... reste du code
}
```

---

## Webhooks (à venir)

Prochainement : possibilité de configurer un webhook pour être notifié lorsque l'analyse est terminée (pour les gros fichiers).

---

## Support

Pour toute question sur l'API : contact@facturly.fr
