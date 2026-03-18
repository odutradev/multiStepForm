import type { FormConfig } from '@components/multiStepForm/types';

export const formPreSets: FormConfig['fieldPreSets'] = {
  cpf: {
    mask: '000.000.000-00',
    validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
  },
  cnpj: {
    mask: '00.000.000/0000-00',
    validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
  },
  rne: {
    mask: 'a000000-a',
    validation: { pattern: '^[A-Z]\\d{6}-[A-Z]$', message: 'RNE inválido' }
  },
  matricula: {
    mask: 'a-0000000',
    validation: { pattern: '^[A-Z]-\\d{7}$', message: 'Matrícula inválida' }
  }
};