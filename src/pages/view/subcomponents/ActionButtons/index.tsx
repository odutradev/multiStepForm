import { PictureAsPdf, ContentCopy, Download, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { RefObject } from 'react';
import { Button } from '@mui/material';

import { downloadHTML } from '../../utils/htmlDownloader';
import { generatePDF } from '../../utils/pdfGenerator';
import { copyToClipboard } from '../../utils/clipboard';
import { ActionsContainer, ButtonGroup } from './styles';

interface Props {
  contentRef: RefObject<HTMLDivElement | null>;
  data: Record<string, unknown>;
}

const ActionButtons = ({ contentRef, data }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => navigate('/main');
  const handleCopy = () => copyToClipboard(contentRef.current);
  const handleDownloadHTML = () => downloadHTML(contentRef.current);
  const handleDownloadPDF = () => generatePDF(data);

  return (
    <ActionsContainer>
      <Button startIcon={<ArrowBack />} variant="text" onClick={handleBack}>
        Voltar
      </Button>
      <ButtonGroup>
        <Button startIcon={<ContentCopy />} variant="outlined" onClick={handleCopy}>
          Copiar HTML
        </Button>
        <Button startIcon={<Download />} variant="outlined" onClick={handleDownloadHTML}>
          Baixar HTML
        </Button>
        <Button startIcon={<PictureAsPdf />} variant="contained" onClick={handleDownloadPDF}>
          Gerar PDF
        </Button>
      </ButtonGroup>
    </ActionsContainer>
  );
};

export default ActionButtons;
