import { Box, TableContainer, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const MODAL_MIN_HEIGHT = '75vh';
const BUTTON_MIN_WIDTH = 180;
const BUTTON_HEIGHT = 56;

export const ModalContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: MODAL_MIN_HEIGHT
});

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3)
}));

export const SearchButton = styled(Button)({
  height: BUTTON_HEIGHT,
  minWidth: BUTTON_MIN_WIDTH
});

export const TableContainerWrapper = styled(TableContainer)(({ theme }) => ({
  flex: 1,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius
}));

export const CenterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.text.secondary
}));