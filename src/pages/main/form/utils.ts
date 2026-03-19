import dayjs from 'dayjs';

import type { ActionContext } from '@components/multiStepForm/types';

export const parseCurrency = (value: unknown): number => {
  if (typeof value !== 'string') return 0;
  const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.');
  const parsedNumber = parseFloat(cleanValue);
  return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const formatCurrency = (value: number): string => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const calculateGrossValue = (context: ActionContext, changedField?: string, newValue?: unknown): void => {
  const formValues = context.getValues();
  const getValue = (field: string) => (changedField === field ? newValue : formValues[field]);
  const principal = parseCurrency(getValue('valorPrincipalCorrigido'));
  const defaultInterest = getValue('possuiJurosMoratorios') === 'Sim' ? parseCurrency(getValue('valorJurosMoratorios')) : 0;
  const compensatoryInterest = getValue('possuiJurosCompensatorios') === 'Sim' ? parseCurrency(getValue('valorJurosCompensatorios')) : 0;
  const costsAndFines = getValue('possuiCustasDespesasMulta') === 'Sim' ? parseCurrency(getValue('valorCustasDespesasMulta')) : 0;
  const totalValue = principal + defaultInterest + compensatoryInterest + costsAndFines;
  context.setMultipleValues({ valorBrutoTotal: formatCurrency(totalValue) });
};

export const calculateRRAMonths = (context: ActionContext): void => {
  const { dataInicialTributacaoRra, dataFinalTributacaoRra } = context.getValues();
  if (!dataInicialTributacaoRra || !dataFinalTributacaoRra) return context.setMultipleValues({ quantidadeMesesTributacaoRra: '' });
  const start = dayjs(String(dataInicialTributacaoRra));
  const end = dayjs(String(dataFinalTributacaoRra));
  if (!start.isValid() || !end.isValid()) return context.setMultipleValues({ quantidadeMesesTributacaoRra: '' });
  const diff = end.diff(start, 'month');
  context.setMultipleValues({ quantidadeMesesTributacaoRra: Math.max(0, diff) });
};