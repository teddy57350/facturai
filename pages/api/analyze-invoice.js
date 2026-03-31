import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      const file = files.file;

      const dataBuffer = fs.readFileSync(file.filepath);
      const pdfData = await pdfParse(dataBuffer);

      const text = pdfData.text;

      const prompt = `
Tu es une IA spécialisée en facturation européenne (EN16931 / Factur-X).

Analyse cette facture et retourne UNIQUEMENT un JSON valide :

Texte facture :
${text}

Format attendu :
{
  "supplier": "",
  "customer": "",
  "total": "",
  "vat": "",
  "date": "",
  "items": [
    {
      "name": "",
      "price": ""
    }
  ]
}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const result = completion.choices[0].message.content;

      res.status(200).json({
        success: true,
        data: JSON.parse(result),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "IA error" });
    }
  });
}
