import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

export const ActionButton = styled(Button)({});