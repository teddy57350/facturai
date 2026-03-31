import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  try {
    console.log("📩 API HIT");

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("FORM ERROR", err);
        return res.status(500).json({ error: "Form error" });
      }

      console.log("FILES:", files);

      const uploadedFile = files.file;

      if (!uploadedFile) {
        return res.status(400).json({ error: "No file received" });
      }

      const buffer = fs.readFileSync(uploadedFile.filepath);

      const pdfData = await pdfParse(buffer);

      const text = pdfData.text;

      console.log("PDF TEXT LENGTH:", text.length);

      if (!text || text.length < 10) {
        return res.status(400).json({
          error: "PDF vide ou illisible",
        });
      }

      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `
Tu es une IA de facturation.

Analyse STRICTEMENT cette facture réelle :

${text}

Retourne UNIQUEMENT un JSON valide.
            `,
          },
        ],
      });

      const resultText = message.content[0].text;

      console.log("IA RESPONSE:", resultText);

      res.status(200).json({
        success: true,
        data: resultText,
      });
    });
  } catch (e) {
    console.error("GLOBAL ERROR", e);
    res.status(500).json({ error: "Server error" });
  }
}
