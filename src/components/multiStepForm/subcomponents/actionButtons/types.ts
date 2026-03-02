import type { FormAction } from '../../types';

export interface ActionButtonsProps {
  actions: FormAction[];
  data: Record<string, unknown>;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}