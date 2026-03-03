import type { SearchConfig, ActionContext } from '../../types';
import type { InputBaseComponentProps } from '@mui/material';

export interface MaskedInputProps extends Omit<InputBaseComponentProps, 'onChange'> {
  onChange: (event: { target: { name: string; value: string } }) => void;
  maskPattern: string;
  name: string;
}

export interface SearchModalProps {
  onClose: () => void;
  context: ActionContext;
  config: SearchConfig;
}