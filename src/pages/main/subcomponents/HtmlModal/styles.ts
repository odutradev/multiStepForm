import { DialogContent, DialogTitle, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialogTitle = styled(DialogTitle)({
  fontWeight: 600,
  fontSize: '1.25rem',
  color: '#1e293b',
  borderBottom: '1px solid #e2e8f0'
});

export const StyledDialogContent = styled(DialogContent)({
  padding: '24px',
  backgroundColor: '#f8fafc'
});

export const PreviewContainer = styled(Box)({
  width: '100%',
  height: '60vh',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  backgroundColor: '#ffffff'
});

export const StyledIframe = styled('iframe')({
  width: '100%',
  height: '100%',
  border: 'none'
});