import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormContainer = styled('form')(({ theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
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

export const StepTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(2)
}));