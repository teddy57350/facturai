// test-api.js
// Script de test pour vérifier que l'API Facturly fonctionne
// Usage: node test-api.js

const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const API_BASE = process.env.API_URL || 'http://localhost:3000';

console.log('🧪 TEST API FACTURLY');
console.log('====================\n');
console.log(`Base URL: ${API_BASE}\n`);

// Test 1: Analyser avec exemple (sans fichier)
async function testAnalyserExemple() {
  console.log('Test 1: POST /api/analyser (exemple)');
  console.log('--------------------------------------');
  
  try {
    const response = await fetch(`${API_BASE}/api/analyser`, {
      method: 'POST',
      body: new FormData() // vide = retourne l'exemple
    });
    
    const data = await response.json();
    
    if (response.ok && data.facture) {
      console.log('✅ SUCCESS');
      console.log(`   - Numéro: ${data.facture.numero}`);
      console.log(`   - Émetteur: ${data.facture.emetteur.nom}`);
      console.log(`   - Total TTC: ${data.facture.totaux.ttc}€`);
      console.log(`   - Confiance: ${data.facture.confiance}%`);
      return data.facture;
    } else {
      console.log('❌ FAIL');
      console.log(`   Erreur: ${data.erreur || 'Unknown'}`);
      return null;
    }
  } catch (error) {
    console.log('❌ FAIL');
    console.log(`   Erreur: ${error.message}`);
    return null;
  }
}

// Test 2: Générer XML Factur-X
async function testGenererXML(facture) {
  console.log('\nTest 2: POST /api/generer');
  console.log('---------------------------');
  
  if (!facture) {
    console.log('⏭️  SKIP (pas de facture du test 1)');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/generer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ facture })
    });
    
    const data = await response.json();
    
    if (response.ok && data.xml) {
      console.log('✅ SUCCESS');
      console.log(`   - XML généré: ${data.xml.length} caractères`);
      console.log(`   - Contient EN 16931: ${data.xml.includes('urn:cen.eu:en16931:2017') ? 'Oui' : 'Non'}`);
      console.log(`   - Contient facture: ${data.xml.includes(facture.numero) ? 'Oui' : 'Non'}`);
      
      // Sauvegarder le XML pour inspection
      fs.writeFileSync('test_output.xml', data.xml);
      console.log('   - Sauvegardé dans: test_output.xml');
      
      return true;
    } else {
      console.log('❌ FAIL');
      console.log(`   Erreur: ${data.erreur || 'Unknown'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL');
    console.log(`   Erreur: ${error.message}`);
    return false;
  }
}

// Test 3: Upload d'un vrai fichier (si disponible)
async function testUploadFichier() {
  console.log('\nTest 3: Upload fichier PDF');
  console.log('----------------------------');
  
  const testFile = './test_facture.pdf';
  
  if (!fs.existsSync(testFile)) {
    console.log('⏭️  SKIP (pas de test_facture.pdf)');
    console.log('   Créer un fichier test_facture.pdf pour tester');
    return;
  }
  
  try {
    const form = new FormData();
    form.append('facture', fs.createReadStream(testFile));
    
    const response = await fetch(`${API_BASE}/api/analyser`, {
      method: 'POST',
      body: form
    });
    
    const data = await response.json();
    
    if (response.ok && data.facture) {
      console.log('✅ SUCCESS');
      console.log(`   - Fichier uploadé et analysé`);
      console.log(`   - Numéro extrait: ${data.facture.numero}`);
      console.log(`   - Confiance: ${data.facture.confiance}%`);
      return true;
    } else {
      console.log('❌ FAIL');
      console.log(`   Erreur: ${data.erreur || 'Unknown'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL');
    console.log(`   Erreur: ${error.message}`);
    return false;
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.time('Durée totale');
  
  const facture = await testAnalyserExemple();
  await testGenererXML(facture);
  await testUploadFichier();
  
  console.log('\n====================');
  console.timeEnd('Durée totale');
  console.log('\n✨ Tests terminés\n');
}

// Lancer les tests
runAllTests().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
