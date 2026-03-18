import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

export const TableContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media print': {
    boxShadow: 'none',
    padding: 0
  }
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(4),
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
  '&:first-of-type': {
    marginTop: 0
  }
}));

export const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: theme.spacing(3),
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.875rem'
}));

export const Th = styled('th')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  textAlign: 'left',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
  fontWeight: 600,
  width: '40%'
}));

export const Td = styled('td')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  color: theme.palette.text.secondary
}));