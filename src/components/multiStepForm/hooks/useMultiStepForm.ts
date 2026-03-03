import { useForm, type FieldValues } from 'react-hook-form';
import { useState, useMemo, useCallback } from 'react';

import type { MultiStepFormProps } from '../types';

export const useMultiStepForm = ({ config, initialData, onSubmit }: MultiStepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { control, handleSubmit, watch, trigger, getValues } = useForm<FieldValues>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const steps = useMemo(() => config.steps, [config]);
  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentValues = watch();

  const isCurrentStepValid = useMemo(() => {
    return currentStep.fields.every((field) => {
      if (!field.required) return true;
      const value = currentValues[field.name];
      return value !== undefined && value !== null && value !== '';
    });
  }, [currentStep, currentValues]);

  const handleNext = useCallback(async () => {
    const isStepValid = await trigger(currentStep.fields.map((f) => f.name));
    if (isStepValid && !isLastStep) setCurrentStepIndex((prev) => prev + 1);
  }, [trigger, currentStep, isLastStep]);

  const handlePrev = useCallback(() => {
    if (!isFirstStep) setCurrentStepIndex((prev) => prev - 1);
  }, [isFirstStep]);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    steps,
    control,
    getValues,
    currentStep,
    currentStepIndex,
    isCurrentStepValid,
    handleNext,
    handlePrev,
    handleFormSubmit
  };
};