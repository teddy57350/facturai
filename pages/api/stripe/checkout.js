import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: "price_1TGzLJLcn25N5LCHtJGUeLa4",
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?canceled=true`,
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("STRIPE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
