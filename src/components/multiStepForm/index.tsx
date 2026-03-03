import { FormContainer, StepContainer, LoadingOverlay } from './styles';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import ActionButtons from './subcomponents/actionButtons';
import StepIndicator from './subcomponents/stepIndicator';
import FieldRenderer from './subcomponents/fieldRenderer';
import Loading from '../loading';

import type { MultiStepFormProps } from './types';
import type { FormEvent } from 'react';

const MultiStepForm = (props: MultiStepFormProps) => {
  const {
    steps,
    control,
    currentStep,
    executeAction,
    isActionLoading,
    currentStepIndex,
    isCurrentStepValid
  } = useMultiStepForm(props);

  if (!currentStep) return null;

  return (
    <FormContainer onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      <StepIndicator steps={steps} currentStepIndex={currentStepIndex} />
      <StepContainer>
        <FieldRenderer fields={currentStep.fields} control={control} />
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