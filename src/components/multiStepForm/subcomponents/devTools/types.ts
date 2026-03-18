import type { ActionContext, FormStep } from '../../types';

export interface DevToolsProps {
  context: ActionContext;
  steps: FormStep[];
  isOpen: boolean;
}