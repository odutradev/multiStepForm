import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FieldsContainer = styled(Box)<{ $columns?: number }>(({ theme, $columns }) => ({
  width: '100%',
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: $columns ? `repeat(${Math.min(2, $columns)}, 1fr)` : 'repeat(auto-fit, minmax(250px, 1fr))',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: $columns ? `repeat(${$columns}, 1fr)` : 'repeat(auto-fit, minmax(250px, 1fr))',
  }
}));

export const FieldWrapper = styled(Box)<{ $colSpan?: number }>(({ $colSpan }) => ({
  width: '100%',
  gridColumn: $colSpan ? `span ${$colSpan}` : 'auto',
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  gridColumn: '1 / -1',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}));