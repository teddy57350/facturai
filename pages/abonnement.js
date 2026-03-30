import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TGRHH567jEq7M8FSeNdZhGdAGCQy9yjXmHJRC78Npt07GLPQPnr52hDHIjDNxLeJDqGOtRgNhdVawWtdKbceITf00WFKo61ji');

function SubscriptionButton() {

  const handleSubscribe = async () => {
    const stripe = await stripePromise;

    // Appel à votre API pour créer une session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const data = await response.json();

    if (data.sessionId) {
      // Rediriger vers Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Erreur lors de la création de la session');
    }
  };

  return (
    <button onClick={handleSubscribe}>
      S’abonner
    </button>
  );
}

export default function AbonnementPage() {
  return (
    <div>
      <h1>Abonnement</h1>
      <SubscriptionButton />
    </div>
  );
}
