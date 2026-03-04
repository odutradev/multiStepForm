import { FormContainer, StepContainer, LoadingOverlay } from './styles';
import ActionButtons from './subcomponents/actionButtons';
import FieldRenderer from './subcomponents/fieldRenderer';
import StepIndicator from './subcomponents/stepIndicator';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import Loading from '../loading';

import type { MultiStepFormProps } from './types';
import type { FormEvent } from 'react';

const MultiStepForm = (props: MultiStepFormProps) => {
  const {
    steps,
    control,
    formMethods,
    currentStep,
    executeAction,
    isActionLoading,
    currentStepIndex,
    isCurrentStepValid
  } = useMultiStepForm(props);

  if (!currentStep) return null;

  const actionContext = { data: formMethods.getValues(), ...formMethods };

  return (
    <FormContainer onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      <StepIndicator steps={steps} currentStepIndex={currentStepIndex} />
      <StepContainer>
        <FieldRenderer
          groups={currentStep.groups}
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