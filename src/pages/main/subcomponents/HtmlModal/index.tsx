import { Dialog, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRef } from 'react';

import { StyledDialogContent, StyledDialogTitle, PreviewContainer, StyledIframe } from './styles';
import { HTML_MODAL_CONSTANTS } from './constants';

import type { HtmlModalProps } from './types';

const HtmlModal = ({ isOpen, htmlContent, onClose }: HtmlModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleCopy = () => {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(tempContainer);
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    try {
      document.execCommand('copy');
      toast.success(HTML_MODAL_CONSTANTS.SUCCESS_COPY);
    } catch {
      toast.error(HTML_MODAL_CONSTANTS.ERROR_COPY);
    } finally {
      selection?.removeAllRanges();
      document.body.removeChild(tempContainer);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: HTML_MODAL_CONSTANTS.MIME_TYPE });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = HTML_MODAL_CONSTANTS.DOWNLOAD_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!iframeRef.current?.contentWindow) {
      toast.error(HTML_MODAL_CONSTANTS.ERROR_PDF);
      return;
    }
    try {
      iframeRef.current.contentWindow.print();
    } catch {
      toast.error(HTML_MODAL_CONSTANTS.ERROR_PDF_NATIVE);
    }
  };

  if (!isOpen) return null;

  const printReadyHtml = htmlContent.replace(
    HTML_MODAL_CONSTANTS.PRINT_STYLE_REPLACE_TARGET,
    HTML_MODAL_CONSTANTS.PRINT_STYLE_INJECTION
  );

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>Pré-visualização do Documento</StyledDialogTitle>
      <StyledDialogContent>
        <PreviewContainer>
          <StyledIframe ref={iframeRef} srcDoc={printReadyHtml} title="Preview Precatório" />
        </PreviewContainer>
      </StyledDialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Fechar
        </Button>
        <Button onClick={handleCopy} color="primary" variant="outlined" sx={{ ml: 2 }}>
          Copiar HTML (Rich Text)
        </Button>
        <Button onClick={handleDownloadHtml} color="primary" variant="outlined" sx={{ ml: 2 }}>
          Baixar HTML
        </Button>
        <Button onClick={handleDownloadPdf} color="primary" variant="contained" sx={{ ml: 2 }}>
          Salvar como PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HtmlModal;