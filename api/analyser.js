export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ erreur: 'Clé API manquante' });
    }

    let contenu = '';

    if (req.body && req.body.texte) {
      contenu = req.body.texte;
    } else {
      contenu = `FACTURE
Numéro : FAC-2026-0147
Date : 25/03/2026
Échéance : 25/04/2026

ÉMETTEUR :
SARL Dupont Électricité
SIRET : 52384716200023
TVA : FR75523847162
3 rue de l'Artisan, 67100 Strasbourg

CLIENT :
SCI Les Oliviers
SIRET : 83921045600017
12 rue des Lilas, 67000 Strasbourg

PRESTATIONS :
- Installation tableau électrique : 1 x 850,00 € HT
- Fournitures et câblage : 1 x 320,00 € HT
- Main d'oeuvre (8h) : 8 x 65,00 € HT

Total HT : 1 690,00 €
TVA 20% : 338,00 €
Total TTC : 2 028,00 €`;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Tu es un expert en facturation française et en format Factur-X.
Analyse cette facture et extrais toutes les informations importantes.
Réponds UNIQUEMENT en JSON valide, sans texte avant ou après, avec cette structure exacte :

{
  "numero": "numéro de facture",
  "date_emission": "YYYY-MM-DD",
  "date_echeance": "YYYY-MM-DD",
  "emetteur": {
    "nom": "raison sociale",
    "siret": "14 chiffres",
    "tva": "numéro TVA",
    "adresse": "adresse complète"
  },
  "client": {
    "nom": "raison sociale",
    "siret": "14 chiffres",
    "adresse": "adresse complète"
  },
  "lignes": [
    {
      "description": "description",
      "quantite": 1,
      "prix_unitaire": 100.00,
      "taux_tva": 20,
      "total_ht": 100.00
    }
  ],
  "totaux": {
    "ht": 0.00,
    "tva": 0.00,
    "ttc": 0.00
  },
  "confiance": 95
}

Facture à analyser :
${contenu}`
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ erreur: data.error.message });
    }

    const texteReponse = data.content[0].text.trim();

    const jsonMatch = texteReponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ erreur: 'Format de réponse invalide' });
    }

    const facture = JSON.parse(jsonMatch[0]);
    return res.json({ succes: true, facture });

  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ erreur: error.message });
  }
}
