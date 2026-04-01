import Stripe from "stripe";
import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Webhook error" });
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
  const rawBody = await req.text();

    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🎯 paiement réussi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;

    if (!email) {
      return res.status(400).json({ error: "No email found" });
    }

    // 🔥 upgrade user en PRO
    const { error } = await supabase
      .from("users")
      .update({ plan: "pro" })
      .eq("email", email);

    if (error) {
      console.log("Supabase error:", error.message);
    }
  }

  res.json({ received: true });
}
