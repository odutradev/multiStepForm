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

export interface TreeConfig {
  childrenKey: string;
  valueKey: string;
  labelKey: string;
}

export interface SearchConfig {
  onSearch: (filters: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
  onSelect: (item: Record<string, unknown>, context: ActionContext) => void;
  initialFilterName?: string;
  columns: SearchResultColumn[];
  autoSearchOnOpen?: boolean;
  viewMode?: 'table' | 'tree';
  pagination?: boolean;
  treeConfig?: TreeConfig;
  fields: FormField[];
  title: string;
}

export interface TableAction {
  onClick: (row: Record<string, unknown>, context: ActionContext) => void;
  label: string;
  icon?: string;
}

export interface TableColumn {
  header: string;
  key: string;
}

export interface FormField {
  type?: 'text' | 'number' | 'email' | 'select' | 'info' | 'date' | 'button' | 'table' | 'currency' | 'percentage';
  onButtonClick?: (context: ActionContext) => void;
  onChange?: (value: unknown, context: ActionContext) => void;
  conditionalRender?: (context: ActionContext) => boolean;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  tableData?: Record<string, unknown>[];
  tableActions?: TableAction[];
  tableColumns?: TableColumn[];
  searchConfig?: SearchConfig;
  validation?: FieldValidation;
  mask?: string | RegExp;
  options?: FieldOption[];
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  maxDate?: string;
  minDate?: string;
  colSpan?: number;
  preSet?: string;
  label?: string;
  icon?: string;
  name: string;
}

export interface FormGroup {
  conditionalRender?: (context: ActionContext) => boolean;
  gridColumns?: number;
  highlight?: boolean;
  fields: FormField[];
  title?: string;
}

export interface FormAction {
  onClick?: (context: ActionContext) => Promise<boolean | void>;
  actionType: 'next' | 'prev' | 'submit' | 'custom';
  variant?: 'contained' | 'outlined' | 'text';
  label: string;
}

export interface FormStep {
  conditionalRender?: (context: ActionContext) => boolean;
  testData?: Record<string, unknown>;
  actions: FormAction[];
  groups: FormGroup[];
  title: string;
  id: string;
}

export interface FormConfig {
  fieldPreSets?: Record<string, Partial<FormField>>;
  steps: FormStep[];
}

export interface MultiStepFormProps {
  onSubmit: (data: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
  config: FormConfig;
}