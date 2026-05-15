const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E78" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: "bullet", text: "•", alignment: "left",
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
      ]}
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("GUIDA COMPLETA: DEPLOY SU VERCEL")] }),
      new Paragraph({ children: [new TextRun("Sistema Prenotazioni Online per Parrucchieri - Istruzioni di Vendita")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({ children: [new TextRun("STEP 1: Installa Vercel CLI")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Apri CMD")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Digita: npm install -g vercel")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Attendi completamento")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({ children: [new TextRun("STEP 2: Login a Vercel")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Digita: vercel login")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Completa il login nel browser")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({ children: [new TextRun("STEP 3: Naviga alla Cartella")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Digita il percorso della cartella del sito")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({ children: [new TextRun("STEP 4: Deploy")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Digita: vercel deploy --prod")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Rispondi alle domande con i valori consigliati")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Attendi il completamento")] }),
      new Paragraph({ children: [new TextRun("")] }),
      new Paragraph({ children: [new TextRun("CREDENZIALI:")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Email: demo@parrucchiererossi.it")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Password: demo2026")] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("ISTRUZIONI_VENDITA_COMPLETO.docx", buffer);
  console.log("✅ Documento creato!");
});
