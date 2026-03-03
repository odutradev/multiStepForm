import { useForm, type FieldValues } from 'react-hook-form';
import { useState, useMemo, useCallback } from 'react';

import type { MultiStepFormProps } from '../types';

export const useMultiStepForm = ({ config, initialData, onSubmit }: MultiStepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { control, handleSubmit, trigger, getValues, formState: { errors } } = useForm<FieldValues>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const steps = useMemo(() => config.steps, [config]);
  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const isCurrentStepValid = useMemo(() => {
    const fieldNames = currentStep.fields.map(f => f.name);
    const hasErrors = fieldNames.some(name => !!errors[name]);
    const values = getValues();
    const hasMissingRequired = currentStep.fields.some(f => f.required && !values[f.name]);
    return !hasErrors && !hasMissingRequired;
  }, [currentStep, errors, getValues]);

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