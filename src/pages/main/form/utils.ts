import dayjs from 'dayjs'

import type { ActionContext } from '@components/multiStepForm/types'


export const parseCurrency = (value: unknown): number => {
  if (typeof value !== 'string') return 0
  const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.')
  const parsedNumber = parseFloat(cleanValue)
  return Number.isNaN(parsedNumber) ? 0 : parsedNumber
}

export const formatCurrency = (value: number): string => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export const calcularValorBruto = (context: ActionContext, changedField?: string, newValue?: unknown): void => {
  const formValues = context.getValues()
  const getValue = (field: string) => (changedField === field ? newValue : formValues[field])

  const principal = parseCurrency(getValue('valorPrincipalCorrigido'))
  const jurosMoratorios = getValue('haJurosMoratorios') === 'Sim' ? parseCurrency(getValue('valorJurosMoratorios')) : 0
  const jurosCompensatorios = getValue('haJurosCompensatorios') === 'Sim' ? parseCurrency(getValue('valorJurosCompensatorios')) : 0
  const custasDespesas = getValue('haCustasDespesasMulta') === 'Sim' ? parseCurrency(getValue('valorCustasDespesasMulta')) : 0

  const valorTotal = principal + jurosMoratorios + jurosCompensatorios + custasDespesas
  context.setMultipleValues({ valorBruto: formatCurrency(valorTotal) })
}

export const calcularMesesRRA = (context: ActionContext): void => {
  const { dataInicialRRA, dataFinalRRA } = context.getValues()
  if (!dataInicialRRA || !dataFinalRRA) {
    context.setMultipleValues({ numeroMesesRRA: '' })
    return
  }
  const start = dayjs(String(dataInicialRRA))
  const end = dayjs(String(dataFinalRRA))
  if (!start.isValid() || !end.isValid()) {
    context.setMultipleValues({ numeroMesesRRA: '' })
    return
  }
  const diff = end.diff(start, 'month')
  context.setMultipleValues({ numeroMesesRRA: Math.max(0, diff) })
}