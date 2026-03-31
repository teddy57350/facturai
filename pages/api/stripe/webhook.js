import Stripe from "stripe";
import { buffer } from "micro";
import { supabase } from "@/lib/supabase";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🎯 paiement réussi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;

    if (!email) return res.status(400).json({ error: "no email" });

    await supabase
      .from("users")
      .update({ plan: "pro" })
      .eq("email", email);
  }

  res.json({ received: true });
}
