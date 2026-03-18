import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import { FIELD_LABELS } from './labels';

export const generatePDF = (data: Record<string, unknown>): void => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  const validEntries = Object.entries(data).filter(([key, value]) => key !== 'listaProcuradoresAdicionados' && value !== null && value !== undefined && value !== '');

  const tableBody = validEntries.map(([key, value]) => [FIELD_LABELS[key] ?? key, String(value)]);

  pdf.setFontSize(16);
  pdf.text('Resumo da Requisição', 40, 40);

  autoTable(pdf, {
    startY: 50,
    head: [['Campo', 'Valor']],
    body: tableBody,
    theme: 'grid',
    headStyles: { fillColor: [245, 245, 245], textColor: [51, 51, 51], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: { 0: { cellWidth: 200 } }
  });

  const procuradores = data.listaProcuradoresAdicionados as Array<Record<string, unknown>> | undefined;
  const hasProcuradores = Array.isArray(procuradores) && procuradores.length > 0;

  if (hasProcuradores) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (pdf as any).lastAutoTable.finalY || 50;
    pdf.setFontSize(14);
    pdf.text('Procuradores Adicionados', 40, finalY + 30);

    const procBody = procuradores.map((proc) => [
      String(proc.nome ?? ''),
      String(proc.documento ?? ''),
      String(proc.oab ?? ''),
      String(proc.categoria ?? ''),
      String(proc.secao ?? '')
    ]);

    autoTable(pdf, {
      startY: finalY + 40,
      head: [['Nome', 'Documento', 'OAB', 'Categoria', 'Seção']],
      body: procBody,
      theme: 'grid',
      headStyles: { fillColor: [245, 245, 245], textColor: [51, 51, 51], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 }
    });
  }

  pdf.save('resumo-formulario.pdf');
};
