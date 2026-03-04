import type { InputBaseComponentProps } from '@mui/material';
import type { Control, FieldValues } from 'react-hook-form';
import type { FormField, ActionContext } from '../../types';

export interface MaskedInputProps extends Omit<InputBaseComponentProps, 'onChange'> {
  onChange: (event: { target: { name: string; value: string } }) => void;
  maskPattern: string | RegExp;
  name: string;
}

export interface FieldRendererProps {
  control: Control<FieldValues>;
  context: ActionContext;
  gridColumns?: number;
  fields: FormField[];
}