import { FormContainer, StepContainer, StepTitle } from './styles';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import ActionButtons from './subcomponents/actionButtons';
import FieldRenderer from './subcomponents/fieldRenderer';
import StepIndicator from './subcomponents/stepIndicator';

import type { MultiStepFormProps } from './types';

const MultiStepForm = (props: MultiStepFormProps) => {
  const {
    steps,
    control,
    getValues,
    currentStep,
    currentStepIndex,
    isCurrentStepValid,
    handleNext,
    handlePrev,
    handleFormSubmit
  } = useMultiStepForm(props);

  if (!currentStep) return null;

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <StepIndicator steps={steps} currentStepIndex={currentStepIndex} />
      <StepContainer>
        <StepTitle variant="h5">{currentStep.title}</StepTitle>
        <FieldRenderer fields={currentStep.fields} control={control} />
        <ActionButtons
          actions={currentStep.actions}
          isNextDisabled={!isCurrentStepValid}
          getValues={getValues}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </StepContainer>
    </FormContainer>
  );
};

export default MultiStepForm;