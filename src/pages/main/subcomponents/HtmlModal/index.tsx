import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useRef } from 'react';

export interface HtmlModalProps {
  htmlContent: string;
  onClose: () => void;
  isOpen: boolean;
}

export const MODAL_CONSTANTS = {
  PRINT_STYLE_INJECTION: '<style>@media print { @page { size: A4; margin: 15mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #ffffff !important; } main { box-shadow: none !important; padding: 0 !important; margin: 0 !important; } }</style></head>',
  SUCCESS_COPY: 'Documento copiado com sucesso! Pode colar no seu editor.',
  ERROR_PDF_NATIVE: 'Erro ao acionar a geração nativa de PDF.',
  ERROR_PDF: 'Erro ao acessar o documento para geração de PDF.',
  DOWNLOAD_FILE_NAME: 'oficio-precatorio.html',
  PRINT_STYLE_TARGET: '</head>',
  ERROR_COPY: 'Erro ao copiar o documento.',
  MIME_TYPE: 'text/html;charset=utf-8'
} as const;

export const ModalTitle = styled(DialogTitle)({
  borderBottom: '1px solid #e2e8f0',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b'
});

export const ModalContent = styled(DialogContent)({
  backgroundColor: '#f8fafc',
  padding: '24px'
});

export const PreviewWrapper = styled(Box)({
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  height: '60vh',
  width: '100%'
});

export const PreviewFrame = styled('iframe')({
  height: '100%',
  width: '100%',
  border: 'none'
});

export const ActionsContainer = styled(DialogActions)({
  padding: '16px 24px'
});

export const ActionButton = styled(Button)<{ $spaced?: boolean }>(({ $spaced }) => ({
  ...( $spaced && { marginLeft: '16px' })
}));

const HtmlModal = ({ isOpen, htmlContent, onClose }: HtmlModalProps) => {
  const iframeReference = useRef<HTMLIFrameElement>(null);

  const handleCopyToClipboard = () => {
    const temporaryContainer = document.createElement('div');
    temporaryContainer.innerHTML = htmlContent;
    temporaryContainer.style.position = 'fixed';
    temporaryContainer.style.left = '-9999px';
    document.body.appendChild(temporaryContainer);

    const windowSelection = window.getSelection();
    const documentRange = document.createRange();
    documentRange.selectNodeContents(temporaryContainer);

    windowSelection?.removeAllRanges();
    windowSelection?.addRange(documentRange);

    try {
      document.execCommand('copy');
      toast.success(MODAL_CONSTANTS.SUCCESS_COPY);
    } catch {
      toast.error(MODAL_CONSTANTS.ERROR_COPY);
    } finally {
      windowSelection?.removeAllRanges();
      document.body.removeChild(temporaryContainer);
    }
  };

  const handleHtmlDownload = () => {
    const documentBlob = new Blob([htmlContent], { type: MODAL_CONSTANTS.MIME_TYPE });
    const objectUrl = URL.createObjectURL(documentBlob);
    const downloadLink = document.createElement('a');

    downloadLink.href = objectUrl;
    downloadLink.download = MODAL_CONSTANTS.DOWNLOAD_FILE_NAME;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(objectUrl);
  };

  const handlePdfDownload = () => {
    if (!iframeReference.current?.contentWindow) return void toast.error(MODAL_CONSTANTS.ERROR_PDF);

    try {
      iframeReference.current.contentWindow.print();
    } catch {
      toast.error(MODAL_CONSTANTS.ERROR_PDF_NATIVE);
    }
  };

  if (!isOpen) return null;

  const printableHtmlContent = htmlContent.replace(
    MODAL_CONSTANTS.PRINT_STYLE_TARGET,
    MODAL_CONSTANTS.PRINT_STYLE_INJECTION
  );

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
        <ActionButton onClick={handleCopyToClipboard} color="primary" variant="outlined" $spaced>
          Copiar HTML (Rich Text)
        </ActionButton>
        <ActionButton onClick={handleHtmlDownload} color="primary" variant="outlined" $spaced>
          Baixar HTML
        </ActionButton>
        <ActionButton onClick={handlePdfDownload} color="primary" variant="contained" $spaced>
          Salvar como PDF
        </ActionButton>
      </ActionsContainer>
    </Dialog>
  );
};

export default HtmlModal;
