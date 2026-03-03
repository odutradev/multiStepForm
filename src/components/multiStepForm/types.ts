import type { UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, FieldValues } from 'react-hook-form';

export interface ActionContext {
  clearErrors: UseFormClearErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  data: FieldValues;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  pattern: string;
  message: string;
}

export interface FormField {
  type: 'text' | 'number' | 'email' | 'select' | 'subtitle';
  validation?: FieldValidation;
  options?: FieldOption[];
  required?: boolean;
  label: string;
  name: string;
  mask?: string;
}

export interface FormAction {
  actionType: 'next' | 'prev' | 'submit' | 'custom';
  onClick?: (context: ActionContext) => Promise<boolean | void>;
  variant?: 'contained' | 'outlined' | 'text';
  label: string;
}

export interface FormStep {
  actions: FormAction[];
  fields: FormField[];
  title: string;
  id: string;
}

export interface FormConfig {
  steps: FormStep[];
}

export interface MultiStepFormProps {
  onSubmit: (data: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
  config: FormConfig;
}