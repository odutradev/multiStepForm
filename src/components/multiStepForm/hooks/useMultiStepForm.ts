import { useState, useEffect, useMemo, useCallback } from 'react';
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

  const allData = watch();

  const setMultipleValues = useCallback((values: Record<string, unknown>, shouldClearErrors: boolean = true) => {
    Object.entries(values).forEach(([key, value]) => setValue(key, value));
    if (shouldClearErrors) clearErrors(Object.keys(values));
  }, [setValue, clearErrors]);

  const formMethods = useMemo(() => ({
    setMultipleValues,
    clearErrors,
    getValues,
    setError,
    setValue
  }), [setMultipleValues, clearErrors, getValues, setError, setValue]);

  const actionContext = useMemo(() => ({ data: allData, ...formMethods }), [allData, formMethods]);

  const visibleSteps = useMemo(() => config.steps.filter((s) => (s.conditionalRender ? s.conditionalRender(actionContext) : true)), [config.steps, actionContext]);

  useEffect(() => {
    if (currentStepIndex >= visibleSteps.length && visibleSteps.length > 0) {
      setCurrentStepIndex(visibleSteps.length - 1);
    }
  }, [visibleSteps.length, currentStepIndex]);

  const currentStep = useMemo(() => visibleSteps[currentStepIndex] || visibleSteps[0], [visibleSteps, currentStepIndex]);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  const visibleGroups = useMemo(() => {
    if (!currentStep) return [];
    return currentStep.groups
      .filter((g) => (g.conditionalRender ? g.conditionalRender(actionContext) : true))
      .map((g) => ({
        ...g,
        fields: g.fields.filter((f) => (f.conditionalRender ? f.conditionalRender(actionContext) : true))
      }));
  }, [currentStep, actionContext]);

  const currentFieldsToValidate = useMemo(() => visibleGroups.flatMap((g) => g.fields).filter((f) => f.type !== 'info'), [visibleGroups]);
  const currentFieldNames = useMemo(() => currentFieldsToValidate.map((f) => f.name), [currentFieldsToValidate]);

  const isCurrentStepValid = useMemo(() => {
    const hasErrors = currentFieldNames.some((name) => !!errors[name]);
    const hasMissingRequired = currentFieldsToValidate.some((field) => {
      const value = allData[field.name];
      const isEmpty = value === undefined || value === null || value === '';
      return field.required && isEmpty;
    });
    return !hasErrors && !hasMissingRequired;
  }, [currentFieldsToValidate, currentFieldNames, allData, errors]);

  const executeAction = useCallback(async (action: FormAction) => {
    if (action.actionType === 'next') {
      const isStepValid = await trigger(currentFieldNames);
      if (!isStepValid) return;
    }

    setIsActionLoading(true);
    try {
      if (action.onClick) {
        const result = await action.onClick(actionContext);
        if (result === false) return;
      }

      if (action.actionType === 'next' && !isLastStep) setCurrentStepIndex((prev) => prev + 1);
      if (action.actionType === 'prev' && !isFirstStep) setCurrentStepIndex((prev) => Math.max(0, prev - 1));
      if (action.actionType === 'submit') await handleSubmit((data) => onSubmit(data))();
    } finally {
      setIsActionLoading(false);
    }
  }, [trigger, currentFieldNames, actionContext, isLastStep, isFirstStep, handleSubmit, onSubmit]);

  return {
    control,
    currentStep,
    actionContext,
    visibleSteps,
    visibleGroups,
    executeAction,
    isActionLoading,
    currentStepIndex,
    isCurrentStepValid
  };
};
