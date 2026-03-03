import type { FormAction } from '../../types';

export interface ActionButtonsProps {
  onExecuteAction: (action: FormAction) => void;
  isActionLoading: boolean;
  isNextDisabled: boolean;
  actions: FormAction[];
}