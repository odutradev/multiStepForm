import { forwardRef } from 'react';

import { TableContainer, StyledTable, Th, Td, SectionTitle } from './styles';
import { FIELD_LABELS } from '../../utils/labels';

interface Props {
  data: Record<string, unknown>;
}

const DocumentViewer = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const validEntries = Object.entries(data).filter(([key, value]) => {
    if (key === 'listaProcuradoresAdicionados') return false;
    if (value === null || value === undefined || value === '') return false;
    return true;
  });

  const procuradores = data.listaProcuradoresAdicionados as Array<Record<string, unknown>> | undefined;
  const hasProcuradores = Array.isArray(procuradores) && procuradores.length > 0;

  return (
    <TableContainer ref={ref} id="document-content">
      <SectionTitle>Resumo da Requisição</SectionTitle>
      <StyledTable>
        <tbody>
          {validEntries.map(([key, value]) => (
            <tr key={key}>
              <Th>{FIELD_LABELS[key] ?? key}</Th>
              <Td>{String(value)}</Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {hasProcuradores && (
        <>
          <SectionTitle>Procuradores Adicionados</SectionTitle>
          <StyledTable>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Documento</Th>
                <Th>OAB</Th>
                <Th>Categoria</Th>
                <Th>Seção</Th>
              </tr>
            </thead>
            <tbody>
              {procuradores.map((proc, idx) => (
                <tr key={idx}>
                  <Td>{String(proc.nome ?? '')}</Td>
                  <Td>{String(proc.documento ?? '')}</Td>
                  <Td>{String(proc.oab ?? '')}</Td>
                  <Td>{String(proc.categoria ?? '')}</Td>
                  <Td>{String(proc.secao ?? '')}</Td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </TableContainer>
  );
});

DocumentViewer.displayName = 'DocumentViewer';
export default DocumentViewer;