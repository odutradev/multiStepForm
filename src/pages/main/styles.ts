import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  display: 'flex'
}));
