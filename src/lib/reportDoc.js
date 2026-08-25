import {
  Document, Packer, Paragraph, HeadingLevel, AlignmentType,
  PageBreak, TextRun, Footer, PageNumber,
} from 'docx';

function centeredLine(text, size = 22, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text, size, ...opts })],
  });
}

/**
 * Builds a pre-formatted, downloadable .docx for the selected report type.
 * meta: { title, studentName, studentNumber, programme, institution, courseCode, supervisor, date }
 * references: array of formatted reference-list strings (from the Citation tool), or empty.
 */
export async function buildReportDocx({ reportType, structure, meta, references }) {
  const children = [];
  const remaining = structure.filter((s) => s !== 'Cover Page');

  if (structure.includes('Cover Page')) {
    children.push(
      new Paragraph({ text: '', spacing: { after: 1600 } }),
      centeredLine(meta.institution || '[Institution Name]', 28, { bold: true }),
      new Paragraph({ text: '', spacing: { after: 400 } }),
      centeredLine(reportType, 24),
      new Paragraph({ text: '', spacing: { after: 200 } }),
      centeredLine(meta.title || '[Report Title]', 32, { bold: true }),
      new Paragraph({ text: '', spacing: { after: 500 } }),
      centeredLine(`By: ${meta.studentName || '[Student Name]'}`),
      ...(meta.studentNumber ? [centeredLine(`Student Number: ${meta.studentNumber}`)] : []),
      ...(meta.programme ? [centeredLine(meta.programme)] : []),
      ...(meta.courseCode ? [centeredLine(meta.courseCode)] : []),
      ...(meta.supervisor ? [centeredLine(`Supervisor: ${meta.supervisor}`)] : []),
      new Paragraph({ text: '', spacing: { after: 400 } }),
      centeredLine(meta.date || new Date().toLocaleDateString()),
      new Paragraph({ children: [new PageBreak()] }),
    );
  }

  for (const section of remaining) {
    if (section === 'Table of Contents') {
      children.push(new Paragraph({ text: 'Table of Contents', heading: HeadingLevel.HEADING_1 }));
      remaining
        .filter((s) => s !== 'Table of Contents')
        .forEach((s) => {
          children.push(new Paragraph({ text: s, spacing: { after: 80 } }));
        });
      children.push(new Paragraph({ children: [new PageBreak()] }));
      continue;
    }

    if (section === 'References') {
      children.push(new Paragraph({ text: 'References', heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }));
      if (references && references.length > 0) {
        references.forEach((ref) => {
          children.push(new Paragraph({ text: ref, spacing: { after: 120 } }));
        });
      } else {
        children.push(new Paragraph({
          children: [new TextRun({
            text: '[No references saved yet — add some in the Citation tool and they will appear here automatically next time you generate this document.]',
            italics: true,
          })],
        }));
      }
      continue;
    }

    children.push(new Paragraph({ text: section, heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }));
    children.push(new Paragraph({
      children: [new TextRun({ text: `[Write your ${section} here.]`, italics: true, color: '8B9698' })],
      spacing: { after: 200 },
    }));
  }

  const doc = new Document({
    sections: [{
      properties: {},
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT] })],
          })],
        }),
      },
      children,
    }],
  });

  return Packer.toBlob(doc);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
