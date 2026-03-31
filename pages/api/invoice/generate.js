const { genererFacturX } = require('../../src/lib/facturxGenerator');
const { PDFDocument, StandardFonts } = require('pdf-lib');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erreur: 'Méthode non autorisée' });
  }

  try {
    const { facture } = req.body;

    if (!facture) {
      return res.status(400).json({ erreur: 'Données de facture manquantes' });
    }

    // 🔥 1. XML Factur-X
    const xml = genererFacturX(facture);

    // 🔥 2. PDF simple (affichage facture)
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("FACTURE FACTUR-X", { x: 50, y: 750, size: 20, font });

    page.drawText(`Client: ${facture.client || "N/A"}`, { x: 50, y: 700, size: 12, font });
    page.drawText(`Total: ${facture.total || "N/A"} €`, { x: 50, y: 680, size: 12, font });

    const pdfBytes = await pdfDoc.save();

    // 🔥 3. Réponse SAAS complète
    return res.status(200).json({
      success: true,
      xml: xml,
      pdf: Buffer.from(pdfBytes).toString("base64")
    });

  } catch (error) {
    console.error('Erreur API /generer:', error);
    return res.status(500).json({
      erreur: error.message || 'Erreur génération Factur-X'
    });
  }
}
