import { ActionsContainer, ActionButton } from './styles';

import type { ActionButtonsProps } from './types';

const ActionButtons = ({ actions, data, onNext, onPrev, onSubmit }: ActionButtonsProps) => {
  if (!actions?.length) return null;

  return (
    <ActionsContainer>
      {actions.map((action) => {
        const handleClick = () => {
          if (action.actionType === 'next') return onNext();
          if (action.actionType === 'prev') return onPrev();
          if (action.actionType === 'submit') return onSubmit();
          if (action.onClick) return action.onClick(data);
        };

        return (
          <ActionButton
            key={`${action.label}-${action.actionType}`}
            variant={action.variant || 'contained'}
            onClick={handleClick}
          >
            {action.label}
          </ActionButton>
        );
      })}
    </ActionsContainer>
  );
};

export default ActionButtons;