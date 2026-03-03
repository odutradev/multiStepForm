import type { InputBaseComponentProps } from '@mui/material';
import type { Control, FieldValues } from 'react-hook-form';

import type { FormField } from '../../types';

export interface MaskedInputProps extends Omit<InputBaseComponentProps, 'onChange'> {
  onChange: (event: { target: { name: string; value: string } }) => void;
  maskPattern: string;
  name: string;
}

export interface FieldRendererProps {
  control: Control<FieldValues>;
  fields: FormField[];
}