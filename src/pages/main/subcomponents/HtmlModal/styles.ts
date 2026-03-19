import { DialogContent, DialogTitle, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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