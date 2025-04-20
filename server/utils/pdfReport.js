// server/utils/pdfReport.js
import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDFReport = async (data) => {
  const { name, disease, confidence, date } = data;
  const doc = new PDFDocument();
  const filePath = `reports/${name}_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text(`Skin Disease Prediction Report`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Disease: ${disease}`);
  doc.text(`Confidence: ${confidence}%`);
  doc.text(`Date: ${date}`);
  doc.end();

  return filePath;
};
