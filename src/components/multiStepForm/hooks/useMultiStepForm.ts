import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import type { MultiStepFormProps } from '../types';
import type { FieldValues } from 'react-hook-form';

export const useMultiStepForm = ({ config, initialData, onSubmit }: MultiStepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { watch, trigger, control, getValues, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const steps = useMemo(() => config.steps, [config]);
  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentFieldNames = useMemo(() => currentStep.fields.map((f) => f.name), [currentStep]);
  const currentValues = watch(currentFieldNames);

  const isCurrentStepValid = useMemo(() => {
    const hasErrors = currentFieldNames.some((name) => !!errors[name]);
    const hasMissingRequired = currentStep.fields.some((field, index) => {
      const value = currentValues[index];
      const isEmpty = value === undefined || value === null || value === '';
      return field.required && isEmpty;
    });
    return !hasErrors && !hasMissingRequired;
  }, [currentStep, currentFieldNames, currentValues, errors]);

  const handleNext = useCallback(async () => {
    const isStepValid = await trigger(currentFieldNames);
    if (isStepValid && !isLastStep) setCurrentStepIndex((prev) => prev + 1);
  }, [trigger, currentFieldNames, isLastStep]);

  const handlePrev = useCallback(() => {
    if (!isFirstStep) setCurrentStepIndex((prev) => prev - 1);
  }, [isFirstStep]);

  const handleFormSubmit = handleSubmit((data) => onSubmit(data));

  return {
    steps,
    control,
    getValues,
    currentStep,
    handleNext,
    handlePrev,
    currentStepIndex,
    handleFormSubmit,
    isCurrentStepValid
  };
};