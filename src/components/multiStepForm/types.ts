export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  pattern: string;
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select';
  required?: boolean;
  mask?: string;
  options?: FieldOption[];
  validation?: FieldValidation;
}

export interface FormAction {
  label: string;
  actionType: 'next' | 'prev' | 'submit' | 'custom';
  variant?: 'contained' | 'outlined' | 'text';
  onClick?: (data: Record<string, unknown>) => void;
}

export interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
  actions: FormAction[];
}

export interface FormConfig {
  steps: FormStep[];
}

export interface MultiStepFormProps {
  config: FormConfig;
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
}