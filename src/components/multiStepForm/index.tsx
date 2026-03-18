import { FormContainer, StepContainer, LoadingOverlay } from './styles';
import FieldRenderer from './subcomponents/fieldRenderer';
import ActionButtons from './subcomponents/actionButtons';
import StepIndicator from './subcomponents/stepIndicator';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import { useDevTools } from './hooks/useDevTools';
import DevTools from './subcomponents/devTools';
import Loading from '../loading';

import type { MultiStepFormProps } from './types';
import type { FormEvent } from 'react';

const MultiStepForm = (props: MultiStepFormProps) => {
  const {
    control,
    currentStep,
    actionContext,
    visibleSteps,
    visibleGroups,
    executeAction,
    isActionLoading,
    currentStepIndex,
    isCurrentStepValid
  } = useMultiStepForm(props);

  const { isDevToolsOpen } = useDevTools();

  if (!currentStep) return null;

  return (
    <FormContainer onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      <DevTools isOpen={isDevToolsOpen} config={props.config} context={actionContext} />
      <StepIndicator steps={visibleSteps} currentStepIndex={currentStepIndex} />
      <StepContainer>
        <FieldRenderer
          groups={visibleGroups}
          control={control}
          context={actionContext}
        />
        <ActionButtons
          actions={currentStep.actions}
          isActionLoading={isActionLoading}
          isNextDisabled={!isCurrentStepValid}
          onExecuteAction={executeAction}
        />
      </StepContainer>
      {isActionLoading && (
        <LoadingOverlay>
          <Loading showSpinner message="Processando" />
        </LoadingOverlay>
      )}
    </FormContainer>
  );
};

export default MultiStepForm;