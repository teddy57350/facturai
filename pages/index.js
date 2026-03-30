// pages/index.js
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <>
      {/* GLOBAL STYLE */}
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
          font-size: 18px;
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

        .steps {
          display: flex;
          margin: 2rem 0;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
        }

        .step {
          flex: 1;
          padding: 10px;
          text-align: center;
          background: #f1f1f1;
          font-size: 13px;
        }

        .step.active {
          background: #4f46e5;
          color: white;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #eee;
          margin-top: 1rem;
        }
      `}</style>

      {/* HEADER */}
      <header>
        <div className="logo">FacturX SaaS</div>
        <div className="badge">EN 16931</div>
      </header>

      <div className="container">

        {/* HERO */}
        <div className="hero">
          <h1>Générez vos factures Factur-X</h1>
          <p>IA + conformité automatique PDF/A-3 + XML embarqué</p>

          <button className="btn" onClick={() => setStep(1)}>
            🚀 Commencer
          </button>
        </div>

        {/* STEPS */}
        <div className="steps">
          <div className={`step ${step === 1 ? "active" : ""}`}>Upload</div>
          <div className={`step ${step === 2 ? "active" : ""}`}>Vérification</div>
          <div className={`step ${step === 3 ? "active" : ""}`}>Export</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="card">
            <h3>📄 Upload facture</h3>
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
            <h3>🔍 Vérification IA</h3>

            <input placeholder="Numéro facture" />
            <br /><br />
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
            <p>Format Factur-X prêt (PDF/A-3 + XML)</p>

            <button className="btn" onClick={() => setStep(1)}>
              Nouvelle facture
            </button>
          </div>
        )}
      </div>
    </>
  );
}
