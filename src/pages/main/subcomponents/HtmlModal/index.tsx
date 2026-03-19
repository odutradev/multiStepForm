import { Dialog } from '@mui/material';

import { ModalTitle, ModalContent, PreviewWrapper, PreviewFrame, ActionsContainer, ActionButton } from './styles';

import type { HtmlModalProps } from './types';

const HtmlModal = ({ isOpen, printableHtmlContent, iframeReference, onClose, onCopy, onDownloadHtml, onDownloadPdf }: HtmlModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <ModalTitle>Pré-visualização do Documento</ModalTitle>
      <ModalContent>
        <PreviewWrapper>
          <PreviewFrame ref={iframeReference} srcDoc={printableHtmlContent} title="Preview Precatório" />
        </PreviewWrapper>
      </ModalContent>
      <ActionsContainer>
        <ActionButton onClick={onClose} color="inherit" variant="text">
          Fechar
        </ActionButton>
        <ActionButton onClick={onCopy} color="primary" variant="outlined" $spaced>
          Copiar HTML (Rich Text)
        </ActionButton>
        <ActionButton onClick={onDownloadHtml} color="primary" variant="outlined" $spaced>
          Baixar HTML
        </ActionButton>
        <ActionButton onClick={onDownloadPdf} color="primary" variant="contained" $spaced>
          Salvar como PDF
        </ActionButton>
      </ActionsContainer>
    </Dialog>
  );
};

export default HtmlModal;