import { jsPDF } from 'jspdf';
import { OfficialDocument } from '../data/officialDocuments';

export function generateOfficialDocumentPDF(doc: OfficialDocument): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const addHeader = (pageNum: number) => {
    // Top banner rule
    pdf.setDrawColor(197, 168, 128); // #C5A880 Gold
    pdf.setLineWidth(0.8);
    pdf.line(margin, 12, pageWidth - margin, 12);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(21, 46, 32); // #152E20 Green
    pdf.text('THE SYDNEY COLONIAL MUZZLE-LOADING CLUB INCORPORATED', margin, 9);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(120, 110, 95);
    pdf.text('EST. 1962 · NSW POLICE APPROVED RANGE · SACKVILLE NSW', pageWidth - margin, 9, { align: 'right' });

    // Footer rule
    pdf.setDrawColor(210, 195, 175);
    pdf.setLineWidth(0.4);
    pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    pdf.setFontSize(7.5);
    pdf.setTextColor(140, 130, 115);
    pdf.text(`Document: ${doc.shortTitle} · Version: ${doc.version}`, margin, pageHeight - 7);
    pdf.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  let currentPage = 1;
  addHeader(currentPage);
  cursorY = 22;

  // Document Title Header Box
  pdf.setFillColor(21, 46, 32); // #152E20
  pdf.roundedRect(margin, cursorY, contentWidth, 22, 1.5, 1.5, 'F');

  pdf.setFont('times', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(245, 238, 225);
  pdf.text(doc.title.toUpperCase(), margin + 6, cursorY + 8);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(197, 168, 128); // Gold
  pdf.text(`OFFICIAL CLUB INSTRUMENT · ${doc.category.toUpperCase()} · ${doc.updatedDate}`, margin + 6, cursorY + 16);

  cursorY += 28;

  // Description / Preamble
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8.5);
  pdf.setTextColor(70, 60, 50);
  const descLines = pdf.splitTextToSize(doc.description, contentWidth);
  pdf.text(descLines, margin, cursorY);
  cursorY += descLines.length * 4.5 + 4;

  pdf.setDrawColor(200, 185, 165);
  pdf.setLineWidth(0.4);
  pdf.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 6;

  // Render Sections
  doc.sections.forEach((sec) => {
    // Check page break for section header
    if (cursorY > pageHeight - 35) {
      pdf.addPage();
      currentPage++;
      addHeader(currentPage);
      cursorY = 22;
    }

    // Section title
    pdf.setFont('times', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(140, 58, 22); // #8C3A16 Rust
    pdf.text(sec.title, margin, cursorY);
    cursorY += 5.5;

    // Section contents
    if (sec.content) {
      const items = Array.isArray(sec.content) ? sec.content : [sec.content];

      items.forEach((item) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(40, 35, 30);

        // Highlight clause headers
        const isBoldPrefix = item.startsWith('1.') || item.startsWith('2.') || item.startsWith('3.') || item.startsWith('4.') || item.startsWith('5.') || item.startsWith('6.') || item.startsWith('7.') || item.startsWith('8.') || item.startsWith('9.') || item.startsWith('10.') || item.startsWith('RISK WARNING') || item.startsWith('IMPORTANT:') || item.startsWith('THE CONSTITUTION') || item.startsWith('THE BY LAWS') || item.startsWith('THE SAFE HANDLING') || item.startsWith('GENERAL CANNON');

        if (isBoldPrefix) {
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(21, 46, 32);
        }

        const lines = pdf.splitTextToSize(item, contentWidth);

        if (cursorY + lines.length * 3.8 > pageHeight - 20) {
          pdf.addPage();
          currentPage++;
          addHeader(currentPage);
          cursorY = 22;
        }

        pdf.text(lines, margin, cursorY);
        cursorY += lines.length * 3.8 + 2.2;
      });
    }

    cursorY += 3;
  });

  // Save the PDF file
  pdf.save(doc.fileName);
}
