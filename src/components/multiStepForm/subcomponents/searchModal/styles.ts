import { Box, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(3)
}));

export const TableContainerWrapper = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius
}));