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
        <FieldRenderer fields={currentStep.fields} control={control} gridColumns={currentStep.gridColumns} />
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