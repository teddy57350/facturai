import formidable from "formidable";
import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Upload error" });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "No file received" });
    }

    try {
      const content = fs.readFileSync(file.filepath, "utf8");

      const ai = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `
Tu es une IA de conversion Factur-X (EN 16931).

Convertis cette facture en JSON structuré propre.

FACTURE:
${content}

Réponds uniquement en JSON valide :
{
  "invoice_number": "",
  "seller": "",
  "buyer": "",
  "date": "",
  "total": "",
  "currency": "",
  "lines": []
}
            `,
          },
        ],
      });

      res.status(200).json({
        success: true,
        result: ai.content[0].text,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "AI conversion failed" });
    }
  });
}
