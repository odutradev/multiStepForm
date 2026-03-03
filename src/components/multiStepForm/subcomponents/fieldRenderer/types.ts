import type { Control, FieldValues } from 'react-hook-form';
import type { FormField } from '../../types';

export interface FieldRendererProps {
  fields: FormField[];
  control: Control<FieldValues>;
}