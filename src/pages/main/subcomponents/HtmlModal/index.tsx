import { Dialog, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRef } from 'react';

import { ModalTitle, ModalContent, PreviewWrapper, PreviewFrame } from './styles';
import { MODAL_CONSTANTS } from './constants';

import type { HtmlModalProps } from './types';

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
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Fechar
        </Button>
        <Button onClick={handleCopyToClipboard} color="primary" variant="outlined" sx={{ ml: 2 }}>
          Copiar HTML (Rich Text)
        </Button>
        <Button onClick={handleHtmlDownload} color="primary" variant="outlined" sx={{ ml: 2 }}>
          Baixar HTML
        </Button>
        <Button onClick={handlePdfDownload} color="primary" variant="contained" sx={{ ml: 2 }}>
          Salvar como PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HtmlModal;