export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({
    ai: JSON.stringify({
      invoiceNumber: "TEST-001",
      client: "ACME Corp",
      total: "150.00",
      date: "2025-01-01",
      currency: "EUR",
    }),
  });
}
