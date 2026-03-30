// pages/index.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TGRHH567jEq7M8FSeNdZhGdAGCQy9yjXmHJRC78Npt07GLPQPnr52hDHIjDNxLeJDqGOtRgNhdVawWtdKbceITf00WFKo61ji');

export default function Home() {
  const handleButtonClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', { method: 'POST' });
    const data = await response.json();
    if (data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Erreur lors de la création de la session.');
    }
  };

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; color: #1A1A2E; min-height: 100vh; }
        header { background: white; border-bottom: 1px solid #E5E7EB; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 20px; font-weight: 700; color: #1A1A2E; }
        .logo span { color: #2563EB; }
        .badge-legale { background: #DCFCE7; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }
        .container { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }
        /* Ajoutez ici tout votre CSS existant */
      `}</style>

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">
        {/* contenu existant */}
        <div className="hero">
          <h1>Convertissez vos factures en Factur-X</h1>
          <p>Uploadez votre facture — l'IA extrait les données automatiquement et génère le format légal.</p>
          <div className="hero-badges">
            <span className="hbadge">Obligation légale 2026-2027</span>
            <span className="hbadge">100% automatique</span>
            <span className="hbadge">Gratuit pour démarrer</span>
          </div>
        </div>
        <div className="steps">
          <div className="step active" id="step1"><span className="step-n">ÉTAPE 1</span>Import</div>
          <div className="step" id="step2"><span className="step-n">ÉTAPE 2</span>Vérification</div>
          <div className="step" id="step3"><span className="step-n">ÉTAPE 3</span>Export</div>
        </div>
        {/* autres contenus... */}

        {/* Bouton en fin de page */}
        <button
          onClick={handleButtonClick}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          S’abonner à 19€
        </button>
      </div>
    </>
  );
}
