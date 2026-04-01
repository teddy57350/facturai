import { PDFDocument, StandardFonts } from "pdf-lib";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { facture } = req.body;

    const client =
      facture?.client ||
      facture?.customer ||
      facture?.buyer ||
      "N/A";

    const total =
      facture?.total ||
      facture?.amount ||
      facture?.grandTotal ||
      "0";

    const date =
      facture?.date ||
      facture?.invoiceDate ||
      "N/A";

    const invoiceNumber =
      facture?.invoiceNumber ||
      facture?.number ||
      facture?.invoice_no ||
      "N/A";

    const currency =
      facture?.currency || "EUR";

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText("FACTURE FACTUR-X", {
      x: 50,
      y: 780,
      size: 24,
      font: bold,
    });

    page.drawText(`Numéro : ${invoiceNumber}`, {
      x: 50,
      y: 730,
      size: 14,
      font,
    });

    page.drawText(`Client : ${client}`, {
      x: 50,
      y: 700,
      size: 14,
      font,
    });

    page.drawText(`Date : ${date}`, {
      x: 50,
      y: 670,
      size: 14,
      font,
    });

    page.drawText(`Total : ${total} ${currency}`, {
      x: 50,
      y: 640,
      size: 16,
      font: bold,
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");

    return res.status(200).send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("Erreur /api/invoice/generate:", err);
    return res.status(500).json({ error: "Erreur génération PDF" });
  }
}
