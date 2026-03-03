import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FieldsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  gridColumn: '1 / -1',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}));