import { ActionsContainer, ActionButton } from './styles';

import type { ActionButtonsProps } from './types';

const ActionButtons = ({ actions, isNextDisabled, getValues, onNext, onPrev }: ActionButtonsProps) => {
  if (!actions?.length) return null;

  return (
    <ActionsContainer>
      {actions.map((action) => {
        const isNext = action.actionType === 'next';
        const isSubmit = action.actionType === 'submit';
        const isDisabled = isNext && isNextDisabled;

        const handleClick = () => {
          if (action.actionType === 'next') return onNext();
          if (action.actionType === 'prev') return onPrev();
          if (action.onClick) return action.onClick(getValues());
        };

        return (
          <ActionButton
            key={`${action.label}-${action.actionType}`}
            variant={action.variant || 'contained'}
            type={isSubmit ? 'submit' : 'button'}
            disabled={isDisabled}
            onClick={isSubmit ? undefined : handleClick}
          >
            {action.label}
          </ActionButton>
        );
      })}
    </ActionsContainer>
  );
};

export default ActionButtons;