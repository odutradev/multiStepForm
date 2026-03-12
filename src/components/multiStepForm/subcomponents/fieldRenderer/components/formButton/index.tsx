import { Button } from '@mui/material';
import * as MuiIcons from '@mui/icons-material';

import { ButtonContainer } from './styles';

import type { FormButtonProps } from './types';

const FormButton = ({ field, context }: FormButtonProps) => {
  const SelectedIcon = field.icon ? MuiIcons[field.icon as keyof typeof MuiIcons] : null;

  return (
    <ButtonContainer>
      <Button
        variant={field.buttonVariant || 'contained'}
        disabled={field.disabled}
        startIcon={SelectedIcon ? <SelectedIcon /> : null}
        onClick={() => field.onButtonClick?.(context)}
        fullWidth
      >
        {field.label}
      </Button>
    </ButtonContainer>
  );
};

export default FormButton;