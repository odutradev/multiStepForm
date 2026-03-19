import { Dialog, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { StyledDialogContent, StyledDialogTitle, PreviewContainer } from './styles';

import type { HtmlModalProps } from './types';

const HtmlModal = ({ isOpen, htmlContent, onClose }: HtmlModalProps) => {
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
      toast.success('Documento copiado com sucesso! Pode colar no seu editor.');
    } catch {
      toast.error('Erro ao copiar o documento.');
    } finally {
      selection?.removeAllRanges();
      document.body.removeChild(tempContainer);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oficio-precatorio.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>Pré-visualização do Documento</StyledDialogTitle>
      <StyledDialogContent>
        <PreviewContainer>
          <iframe
            srcDoc={htmlContent}
            title="Preview Precatório"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </PreviewContainer>
      </StyledDialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Fechar
        </Button>
        <Button onClick={handleCopy} color="primary" variant="outlined" sx={{ ml: 2 }}>
          Copiar HTML (Rich Text)
        </Button>
        <Button onClick={handleDownload} color="primary" variant="contained" sx={{ ml: 2 }}>
          Baixar HTML
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HtmlModal;