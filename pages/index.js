// pages/index.js
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [invoicesUsed, setInvoicesUsed] = useState(0);
  const [isPro, setIsPro] = useState(false);

  const MAX_FREE = 10;

  const handleStart = () => {
    if (!isPro && invoicesUsed >= MAX_FREE) {
      alert("Limite atteinte (10 factures/mois). Passe à Pro pour 19€/mois 🚀");
      return;
    }

    setStep(1);
    setInvoicesUsed(invoicesUsed + 1);
  };

  const handleSubscribe = () => {
    // 🔥 ici plus tard Stripe Checkout
    alert("Redirection vers paiement Stripe (19€/mois) 💳");
    setIsPro(true);
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f6f7fb;
        }

        .container {
          max-width: 900px;
          margin: auto;
          padding: 2rem;
        }

        header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid #eee;
        }

        .logo {
          font-weight: 800;
        }

        .badge {
          background: #e8fff1;
          color: #166534;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .hero {
          text-align: center;
          margin: 2rem 0;
        }

        .btn {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-secondary {
          background: #111;
          margin-left: 10px;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #eee;
          margin-top: 1rem;
        }

        .pricing {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid #4f46e5;
          margin-top: 2rem;
          text-align: center;
        }

        .price {
          font-size: 32px;
          font-weight: 800;
          margin: 10px 0;
        }

        .small {
          font-size: 13px;
          color: #666;
        }
      `}</style>

      {/* HEADER */}
      <header>
        <div className="logo">FacturX SaaS</div>
        <div className="badge">
          {isPro ? "PRO" : `${invoicesUsed}/10 free`}
        </div>
      </header>

      <div className="container">

        {/* HERO */}
        <div className="hero">
          <h1>Factur-X automatique</h1>
          <p>10 factures gratuites / mois puis 19€/mois</p>

          <button className="btn" onClick={handleStart}>
            🚀 Créer une facture
          </button>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="card">
            <h3>Upload facture</h3>
            <input type="file" />
            <br /><br />
            <button className="btn" onClick={() => setStep(2)}>
              Continuer →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="card">
            <h3>Vérification</h3>
            <input placeholder="Client" />
            <br /><br />

            <button onClick={() => setStep(1)}>Retour</button>
            {" "}
            <button className="btn" onClick={() => setStep(3)}>
              Générer →
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="card">
            <h3>✅ Facture générée</h3>
            <p>Factur-X prêt</p>

            <button className="btn" onClick={() => setStep(0)}>
              Nouvelle facture
            </button>
          </div>
        )}

        {/* PRICING */}
        {!isPro && (
          <div className="pricing">
            <h2>Passer en PRO</h2>
            <div className="price">19€ / mois</div>

            <p className="small">
              ✔ Factures illimitées<br />
              ✔ Export Factur-X automatique<br />
              ✔ Support prioritaire
            </p>

            <button className="btn" onClick={handleSubscribe}>
              💳 S'abonner
            </button>
          </div>
        )}
      </div>
    </>
  );
}
