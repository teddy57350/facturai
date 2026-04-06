import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const buf = await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(Buffer.from(data)));
    });

    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🎯 ICI C'EST IMPORTANT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("PAIEMENT OK:", session);

    const email = session.customer_details?.email;

    console.log("EMAIL:", email);

    // 👉 Ici tu actives le compte pro
    // exemple :
    // await db.user.update({ where: { email }, data: { isPro: true } });
  }

  res.status(200).json({ received: true });
}
