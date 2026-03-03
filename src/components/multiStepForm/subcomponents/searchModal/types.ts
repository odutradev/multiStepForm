import type { SearchConfig, ActionContext } from '../../types';

export interface SearchModalProps {
  onClose: () => void;
  context: ActionContext;
  config: SearchConfig;
}