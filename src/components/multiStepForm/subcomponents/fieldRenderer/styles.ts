import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GroupsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4)
}));

export const GroupContainer = styled(Box)<{ $highlight?: boolean }>(({ theme, $highlight }) => ({
  width: '100%',
  ...($highlight && {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.action.hover
  })
}));

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

export const SubtitleText = styled(Typography)<{ $highlight?: boolean }>(({ theme, $highlight }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: $highlight ? theme.palette.primary.main : theme.palette.text.secondary,
  marginBottom: theme.spacing(2)
}));