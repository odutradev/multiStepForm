import type { FormField } from '../../types';

export interface FieldRendererProps {
  fields: FormField[];
  formData: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
}