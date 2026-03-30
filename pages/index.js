// pages/index.js
export default function Home() {
  return (
    <>
      <style jsx global>{`
        /* TON CSS INCHANGÉ */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8F9FA; color: #1A1A2E; min-height: 100vh; }
        header { background: white; border-bottom: 1px solid #E5E7EB; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 20px; font-weight: 700; color: #1A1A2E; }
        .logo span { color: #2563EB; }
        .badge-legale { background: #DCFCE7; color: #166534; font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }
        .container { max-width: 860px; margin: 0 auto; padding: 2rem 1rem; }
        .hero { text-align: center; margin-bottom: 2.5rem; }
        .hero h1 { font-size: 32px; font-weight: 700; color: #1A1A2E; margin-bottom: 8px; }
        .hero p { font-size: 16px; color: #6B7280; max-width: 500px; margin: 0 auto 1.5rem; }
        .hero-badges { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .hbadge { background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 6px 14px; font-size: 13px; color: #374151; }
        .steps { display: flex; background: white; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; margin-bottom: 2rem; }
        .step { flex: 1; padding: 16px; text-align: center; font-size: 13px; color: #9CA3AF; }
        .step.active { color: #2563EB; background: #EFF6FF; font-weight: 600; }
        .card { background: white; border-radius: 12px; border: 1px solid #E5E7EB; padding: 1.5rem; margin-bottom: 1rem; }
        .btn { padding: 10px 22px; border-radius: 8px; font-size: 14px; cursor: pointer; border: none; }
        .btn-primary { background: #2563EB; color: white; }
        .btn-success { background: #16A34A; color: white; }
        .btn-secondary { background: white; border: 1px solid #D1D5DB; }
      `}</style>

      <header>
        <div className="logo">Factur<span>X</span></div>
        <span className="badge-legale">Conforme EN 16931</span>
      </header>

      <div className="container">

        {/* PAGE 3 UNIQUEMENT MODIFIÉE */}
        <div id="page3">
          <div className="card" style={{textAlign:'center'}}>
            <h2>Facture générée</h2>

            <div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'1.5rem', flexWrap:'wrap'}}>
              <button className="btn btn-success" id="btnTelecharger">Télécharger XML</button>
              <button className="btn btn-primary" id="btnPayer">💳 Payer</button>
              <button className="btn btn-secondary" id="btnNouveau">Nouvelle facture</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ STRIPE SCRIPT AJOUTÉ */}
      <script src="https://js.stripe.com/v3/"></script>

      <script dangerouslySetInnerHTML={{__html: `

        const stripe = Stripe("TA_CLE_PUBLIQUE_STRIPE");

        document.getElementById('btnPayer').addEventListener('click', async () => {
          try {
            const response = await fetch('/api/create-checkout-session', {
              method: 'POST',
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
              sessionId: session.id,
            });

            if (result.error) {
              alert(result.error.message);
            }
          } catch (err) {
            alert("Erreur paiement : " + err.message);
          }
        });

      `}} />
    </>
  );
}
