import { useState, useCallback, useMemo } from 'react';

import { FormContainer, StepContainer, StepTitle } from './styles';
import FieldRenderer from './subcomponents/fieldRenderer';
import ActionButtons from './subcomponents/actionButtons';
import StepIndicator from './subcomponents/stepIndicator';

import type { MultiStepFormProps } from './types';

const MultiStepForm = ({ config, initialData = {}, onSubmit }: MultiStepFormProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = useMemo(() => config.steps, [config]);
  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleFieldChange = useCallback((name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (!isLastStep) setCurrentStepIndex((prev) => prev + 1);
  }, [isLastStep]);

  const handlePrev = useCallback(() => {
    if (!isFirstStep) setCurrentStepIndex((prev) => prev - 1);
  }, [isFirstStep]);

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
  }, [onSubmit, formData]);

  if (!currentStep) return null;

  return (
    <FormContainer>
      <StepIndicator currentStepIndex={currentStepIndex} steps={steps} />

      <StepContainer>
        <StepTitle variant="h5">{currentStep.title}</StepTitle>

        <FieldRenderer
          formData={formData}
          fields={currentStep.fields}
          onChange={handleFieldChange}
        />

        <ActionButtons
          data={formData}
          actions={currentStep.actions}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </StepContainer>
    </FormContainer>
  );
};

export default MultiStepForm;