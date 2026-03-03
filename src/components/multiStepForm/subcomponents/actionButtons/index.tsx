import { ActionsContainer, ActionButton } from './styles';

import type { ActionButtonsProps } from './types';

const ActionButtons = ({ actions, isNextDisabled, isActionLoading, onExecuteAction }: ActionButtonsProps) => {
  if (!actions?.length) return null;

  return (
    <ActionsContainer>
      {actions.map((action) => {
        const isNext = action.actionType === 'next';
        const isDisabled = (isNext && isNextDisabled) || isActionLoading;

        return (
          <ActionButton
            key={`${action.label}-${action.actionType}`}
            variant={action.variant || 'contained'}
            type="button"
            disabled={isDisabled}
            onClick={() => onExecuteAction(action)}
          >
            {action.label}
          </ActionButton>
        );
      })}
    </ActionsContainer>
  );
};

export default ActionButtons;