import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FieldsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
}));