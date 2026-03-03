import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FormContainer = styled('form')(({ theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper
}));

export const StepContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4)
}));

export const LoadingOverlay = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8
}));