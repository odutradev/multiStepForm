import type { FieldValues } from 'react-hook-form';
import type { FormAction } from '../../types';

export interface ActionButtonsProps {
  actions: FormAction[];
  isNextDisabled: boolean;
  getValues: () => FieldValues;
  onNext: () => void;
  onPrev: () => void;
}