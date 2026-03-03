import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import type { MultiStepFormProps, FormAction } from '../types';
import type { FieldValues } from 'react-hook-form';

export const useMultiStepForm = ({ config, initialData, onSubmit }: MultiStepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { watch, trigger, control, getValues, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const steps = useMemo(() => config.steps, [config]);
  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentFieldsToValidate = useMemo(() => currentStep.fields.filter((f) => f.type !== 'subtitle'), [currentStep]);
  const currentFieldNames = useMemo(() => currentFieldsToValidate.map((f) => f.name), [currentFieldsToValidate]);
  const currentValues = watch(currentFieldNames);

  const isCurrentStepValid = useMemo(() => {
    const hasErrors = currentFieldNames.some((name) => !!errors[name]);
    const hasMissingRequired = currentFieldsToValidate.some((field, index) => {
      const value = currentValues[index];
      const isEmpty = value === undefined || value === null || value === '';
      return field.required && isEmpty;
    });
    return !hasErrors && !hasMissingRequired;
  }, [currentFieldsToValidate, currentFieldNames, currentValues, errors]);

  const formMethods = useMemo(() => ({
    clearErrors,
    getValues,
    setError,
    setValue
  }), [clearErrors, getValues, setError, setValue]);

  const executeAction = useCallback(async (action: FormAction) => {
    if (action.actionType === 'next') {
      const isStepValid = await trigger(currentFieldNames);
      if (!isStepValid) return;
    }

    setIsActionLoading(true);
    try {
      if (action.onClick) {
        const context = { data: getValues(), ...formMethods };
        const result = await action.onClick(context);
        if (result === false) return;
      }

      if (action.actionType === 'next' && !isLastStep) setCurrentStepIndex((prev) => prev + 1);
      if (action.actionType === 'prev' && !isFirstStep) setCurrentStepIndex((prev) => prev - 1);
      if (action.actionType === 'submit') await handleSubmit((data) => onSubmit(data))();
    } finally {
      setIsActionLoading(false);
    }
  }, [trigger, currentFieldNames, getValues, formMethods, isLastStep, isFirstStep, handleSubmit, onSubmit]);

  return {
    steps,
    control,
    formMethods,
    currentStep,
    executeAction,
    isActionLoading,
    currentStepIndex,
    isCurrentStepValid
  };
};