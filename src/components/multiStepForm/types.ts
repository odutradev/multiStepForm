import type { UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, FieldValues } from 'react-hook-form';

export interface ActionContext {
  setMultipleValues: (values: Record<string, unknown>, shouldClearErrors?: boolean) => void;
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

export interface SearchResultColumn {
  header: string;
  key: string;
}

export interface SearchConfig {
  onSearch: (filters: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
  onSelect: (item: Record<string, unknown>, context: ActionContext) => void;
  columns: SearchResultColumn[];
  initialFilterName?: string;
  pagination?: boolean;
  fields: FormField[];
  title: string;
}

export interface FormField {
  type: 'text' | 'number' | 'email' | 'select' | 'info';
  conditionalRender?: (context: ActionContext) => boolean;
  searchConfig?: SearchConfig;
  mask?: string | RegExp;
  validation?: FieldValidation;
  options?: FieldOption[];
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  colSpan?: number;
  label: string;
  icon?: string;
  name: string;
}

export interface FormGroup {
  conditionalRender?: (context: ActionContext) => boolean;
  gridColumns?: number;
  fields: FormField[];
  title?: string;
}

export interface FormAction {
  actionType: 'next' | 'prev' | 'submit' | 'custom';
  onClick?: (context: ActionContext) => Promise<boolean | void>;
  variant?: 'contained' | 'outlined' | 'text';
  label: string;
}

export interface FormStep {
  conditionalRender?: (context: ActionContext) => boolean;
  actions: FormAction[];
  groups: FormGroup[];
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
