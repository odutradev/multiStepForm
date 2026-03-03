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
  required?: boolean;
  mask?: 'process';
  options?: FieldOption[];
  validation?: FieldValidation;
  type: 'text' | 'number' | 'email' | 'select';
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