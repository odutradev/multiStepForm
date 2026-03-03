import { Box, TableContainer, DialogContent, Button, TableCell } from '@mui/material';
import { SearchOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const BUTTON_MIN_WIDTH = 180;
const BUTTON_HEIGHT = 56;
const ICON_SIZE = 64;
const ICON_OPACITY = 0.5;

export const ModalContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const ContentContainer = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column'
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
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  maxHeight: '60vh'
}));

export const StyledTableCell = styled(TableCell)({
  borderBottom: 'none'
});

export const CenterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.text.secondary
}));

export const EmptyIcon = styled(SearchOff)({
  fontSize: ICON_SIZE,
  opacity: ICON_OPACITY
});
