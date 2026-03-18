import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ViewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(4)
}));