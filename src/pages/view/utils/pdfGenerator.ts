import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

import { FIELD_LABELS } from './labels';

type AutoTableDoc = jsPDF & { lastAutoTable: { finalY: number } };

const PAGE_HEIGHT = 842;
const MAX_WIDTH = 515;
const MARGIN_X = 40;

const formatBool = (val: unknown): string => {
  if (val === true || val === 'Sim' || val === 'S' || val === 'SIM') return '( X ) Sim  (   ) Não';
  if (val === false || val === 'Não' || val === 'N' || val === 'NÃO') return '(   ) Sim  ( X ) Não';
  return '(   ) Sim  (   ) Não';
};

const formatVal = (val: unknown): string => val ? String(val) : 'NÃO INFORMADO';

export const generatePDF = (data: Record<string, unknown>): void => {
  const doc = new jsPDF('p', 'pt', 'a4');
  const usedKeys = new Set<string>(['listaProcuradoresAdicionados']);
  let currentY = 50;

  const getVal = (key: string): unknown => {
    usedKeys.add(key);
    return data[key];
  };

  const writeText = (text: string, size = 10, bold = false, align: 'left' | 'center' = 'left'): void => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, MAX_WIDTH);
    const lineHeight = size * 1.5;

    lines.forEach((line: string) => {
      if (currentY + lineHeight > PAGE_HEIGHT - 40) {
        doc.addPage();
        currentY = 50;
      }
      doc.text(line, align === 'center' ? 595 / 2 : MARGIN_X, currentY, { align });
      currentY += lineHeight;
    });
  };

  writeText('Poder Judiciário do Estado de Minas Gerais', 12, true, 'center');
  writeText('Tribunal de Justiça', 12, true, 'center');
  currentY += 10;
  writeText(`OFÍCIO PRECATÓRIO n. ${formatVal(getVal('numeroProcesso'))}`, 12, true, 'center');
  writeText('VERSÃO 20-02-2020', 10, false, 'center');
  currentY += 10;
  writeText('* De acordo com a Resolução nº 303/2019 do Conselho Nacional de Justiça', 9, false, 'center');
  currentY += 20;
  writeText(`Juiz(a) da Execução: ${formatVal(getVal('nomeMagistrado'))}`, 10, true);
  writeText(`Vara/Cartório: ${formatVal(getVal('nomeVaraRequisicao'))}`, 10, true);
  currentY += 20;
  writeText('Exmo(a). Senhor(a) Presidente do Tribunal de Justiça do Estado de Minas Gerais,', 10);
  writeText('Requisito o pagamento em favor do(s) beneficiário(s), no(s) valor(es) individualizado(s), em virtude de decisão transitada em julgado, segundo as informações abaixo indicadas. Informo, outrossim, que não existe qualquer recurso pendente quanto aos valores contidos na presente Requisição.', 10);
  currentY += 15;
  writeText('REQUISIÇÃO PARA PAGAMENTO DE PRECATÓRIO', 12, true, 'center');
  currentY += 15;
  
  writeText('1. INFORMAÇÕES PROCESSUAIS', 10, true);
  writeText(`1.1 Numeração única do processo judicial (Art. 60, I): ${formatVal(getVal('numeroUnicoCnj'))}`);
  writeText(`1.2 Número originário anterior, se houver: ${formatVal(getVal('numeroProcessoOriginario'))}`);
  writeText(`1.3 Houve processo de conhecimento? ${formatBool(getVal('houveProcessoConhecimento'))}`);
  writeText(`1.4 Houve embargos à execução ou impugnação ao cálculo? ${formatBool(getVal('houveEmbargosExecucao'))}`);
  writeText(`1.4.1 Data do decurso de prazo para apresentação: ${formatVal(getVal('dataDecursoPrazoEmbargos'))}`);
  currentY += 10;
  
  writeText('2. INFORMAÇÕES PERTINENTES À REQUISIÇÃO', 10, true);
  writeText(`2.1 NATUREZA DO CRÉDITO: ${formatVal(getVal('naturezaCredito'))}`);
  writeText(`2.2 Assunto a que se refere a requisição: ${formatVal(getVal('codigoAssuntoProcesso'))} - ${formatVal(getVal('descricaoAssuntoProcesso'))}`);
  writeText(`2.3 Ação de natureza salarial? ${formatBool(getVal('possuiNaturezaSalarial'))}`);
  writeText(`2.4 Requisição: ${formatVal(getVal('tipoRequisicao'))}`);
  writeText(`2.5 Data da intimação das partes: ${formatVal(getVal('dataIntimacaoPartes'))}`);
  writeText(`2.6 O crédito foi objeto de cessão? ${formatBool(getVal('houveCessaoCreditoPrincipal'))}`);
  writeText(`2.7 O crédito foi objeto de penhora? ${formatBool(getVal('houvePenhoraCreditoPrincipal'))}`);
  writeText(`2.8 O crédito principal foi objeto de sucessão? ${formatBool(getVal('houveSucessaoCreditoPrincipal'))}`);
  currentY += 10;
  
  writeText('3. INFORMAÇÕES SOBRE O DEVEDOR', 10, true);
  writeText(`3.1 ENTIDADE DEVEDORA: ${formatVal(getVal('entidadeDevedora'))}`);
  writeText(`3.2 CNPJ: ${formatVal(getVal('cnpjEntidadeDevedora'))}`);
  currentY += 10;
  
  writeText('4. INFORMAÇÕES SOBRE O BENEFICIÁRIO PRINCIPAL', 10, true);
  writeText(`4.1 Nome do beneficiário principal: ${formatVal(getVal('nomeBeneficiario'))}`);
  writeText(`4.2 Nome social: ${formatVal(getVal('nomeSocialBeneficiario'))}`);
  writeText(`4.3 CPF/CNPJ ou RNE Nº: ${formatVal(getVal('numeroDocumentoBeneficiario'))}`);
  writeText(`4.4 PIS/PASEP ou NIT Nº: ${formatVal(getVal('numeroInscricaoSocial'))}`);
  writeText(`4.5 Data de nascimento: ${formatVal(getVal('dataNascimentoBeneficiario'))}`);
  writeText(`4.6 Doença Grave? ${formatBool(getVal('possuiDoencaGrave'))} | Pessoa com Deficiência? ${formatBool(getVal('possuiDeficiencia'))}`);
  writeText(`4.7 Capacidade: ${formatVal(getVal('condicaoCapacidadeBeneficiario'))}`);
  writeText(`    4.7.1 Nome do representante legal: ${formatVal(getVal('nomeRepresentanteLegal'))}`);
  writeText(`    4.7.2 CPF/CNPJ ou RNE Nº: ${formatVal(getVal('cpfRepresentanteLegal') || getVal('cnpjRepresentanteLegal') || getVal('rneRepresentanteLegal'))}`);
  writeText(`    4.7.3 OAB Nº: ${formatVal(getVal('numeroOabRepresentanteLegal'))}`);
  writeText(`4.8 Deseja informar dados bancários: ${formatBool(getVal('codigoBancoTitular'))}`);
  writeText(`    4.8.1 Titular da conta: ${formatVal(getVal('titularContaBancaria'))}`);
  writeText(`    4.8.2 CPF/CNPJ: ${formatVal(getVal('cpfTitularBancario') || getVal('cnpjTitularBancario'))}`);
  writeText(`    4.8.3 Banco: ${formatVal(getVal('codigoBancoTitular'))}`);
  writeText(`    4.8.4 Agência: ${formatVal(getVal('agenciaBancariaTitular'))}`);
  writeText(`    4.8.5 Conta Nº: ${formatVal(getVal('numeroContaBancariaTitular'))}`);
  currentY += 10;
  
  writeText('4.9 Procuradores:');
  
  const procuradores = data.listaProcuradoresAdicionados as Array<Record<string, unknown>> | undefined;
  
  if (Array.isArray(procuradores) && procuradores.length > 0) {
    const procBody = procuradores.map((proc) => [
      String(proc.nome ?? ''),
      String(proc.cpf ?? proc.cnpj ?? proc.rne ?? proc.documento ?? ''),
      String(proc.oab ?? '')
    ]);
    autoTable(doc, {
      startY: currentY,
      head: [['Nome', 'CPF/CNPJ/RNE', 'OAB']],
      body: procBody,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: [51, 51, 51], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 3 }
    });
    currentY = (doc as AutoTableDoc).lastAutoTable.finalY + 15;
  } else {
    writeText('Nenhum procurador adicionado.', 9);
    currentY += 10;
  }

  writeText('4.10 Valor Devido ao Beneficiário Principal', 10, true);
  writeText(`4.10.1 Valor Bruto: ${formatVal(getVal('valorBrutoTotal'))}`);
  writeText(`4.10.2 Valor principal corrigido: ${formatVal(getVal('valorPrincipalCorrigido'))}`);
  writeText(`4.10.3 Data-base: ${formatVal(getVal('dataLiquidacaoCalculo'))}`);
  writeText(`4.10.4 Haverá incidência de contribuições (Previdenciário)? ${formatBool(getVal('possuiDescontoPrevidenciario'))}`);
  writeText(`4.10.5 Existe incidência de juros moratórios? ${formatBool(getVal('possuiJurosMoratorios'))}`);
  writeText(`4.10.6 Existe Incidência de juros compensatórios? ${formatBool(getVal('possuiJurosCompensatorios'))}`);
  writeText(`4.10.7 Haverá Incidência de ITCD? ${formatBool(getVal('possuiIncidenciaItcd'))} | Alíquota: ${formatVal(getVal('percentualAliquotaItcd'))}`);
  writeText(`4.10.8 Há tributação RRA? ${formatBool(getVal('possuiTributacaoRra'))}`);
  writeText(`4.10.9 Custas/Multas: ${formatVal(getVal('valorCustasDespesasMulta'))}`);
  currentY += 15;

  const unusedKeys = Object.keys(data).filter(key => !usedKeys.has(key) && data[key] !== null && data[key] !== undefined && data[key] !== '');
  if (unusedKeys.length > 0) {
    if (currentY > PAGE_HEIGHT - 100) {
      doc.addPage();
      currentY = 50;
    }
    writeText('5. OUTRAS INFORMAÇÕES CADASTRADAS', 10, true);
    const otherBody = unusedKeys.map(key => [FIELD_LABELS[key] ?? key, String(data[key])]);
    autoTable(doc, {
      startY: currentY,
      head: [['Campo', 'Valor']],
      body: otherBody,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: [51, 51, 51], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 3 }
    });
  }

  doc.save('resumo-formulario.pdf');
};