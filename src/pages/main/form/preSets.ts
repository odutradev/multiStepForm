import type { FormConfig } from '@components/multiStepForm/types';

export const formPreSets: FormConfig['fieldPreSets'] = {
  cpf: {
    type: 'text',
    mask: '000.000.000-00',
    validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
  },
  cnpj: {
    type: 'text',
    mask: '00.000.000/0000-00',
    validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
  },
  rne: {
    type: 'text',
    mask: 'a000000-a',
    validation: { pattern: '^[A-Z]\\d{6}-[A-Z]$', message: 'RNE inválido' }
  },
  matricula: {
    type: 'text',
    mask: 'a-0000000',
    validation: { pattern: '^[A-Z]-\\d{7}$', message: 'Matrícula inválida' }
  },
  simNao: {
    type: 'select',
    options: [
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' }
    ]
  },
  simNaoSN: {
    type: 'select',
    options: [
      { label: 'Sim', value: 'S' },
      { label: 'Não', value: 'N' }
    ]
  },
  estados: {
    type: 'select',
    options: [
      { label: 'AC', value: 'AC' }, { label: 'AL', value: 'AL' }, { label: 'AP', value: 'AP' }, { label: 'AM', value: 'AM' }, { label: 'BA', value: 'BA' }, { label: 'CE', value: 'CE' }, { label: 'DF', value: 'DF' }, { label: 'ES', value: 'ES' }, { label: 'GO', value: 'GO' }, { label: 'MA', value: 'MA' }, { label: 'MT', value: 'MT' }, { label: 'MS', value: 'MS' }, { label: 'MG', value: 'MG' }, { label: 'PA', value: 'PA' }, { label: 'PB', value: 'PB' }, { label: 'PR', value: 'PR' }, { label: 'PE', value: 'PE' }, { label: 'PI', value: 'PI' }, { label: 'RJ', value: 'RJ' }, { label: 'RN', value: 'RN' }, { label: 'RS', value: 'RS' }, { label: 'RO', value: 'RO' }, { label: 'RR', value: 'RR' }, { label: 'SC', value: 'SC' }, { label: 'SP', value: 'SP' }, { label: 'SE', value: 'SE' }, { label: 'TO', value: 'TO' }
    ]
  },
  bancos: {
    type: 'select',
    options: [
      { label: '001 - Banco do Brasil S.A.', value: '001' }, { label: '033 - Banco Santander (Brasil) S.A.', value: '033' }, { label: '077 - Banco Inter S.A.', value: '077' }, { label: '104 - Caixa Econômica Federal', value: '104' }, { label: '237 - Banco Bradesco S.A.', value: '237' }, { label: '260 - Nubank', value: '260' }, { label: '341 - Itaú Unibanco S.A.', value: '341' }
    ]
  },
  regimePrevidenciario: {
    type: 'select',
    options: [
      { label: 'Geral/INSS', value: 'GeralINSS' },
      { label: 'Próprio', value: 'Proprio' }
    ]
  },
  categoriaOab: {
    type: 'select',
    options: [
      { label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'E', value: 'E' }, { label: 'N', value: 'N' }
    ]
  },
  tipoDocumento: {
    type: 'select',
    options: [
      { label: 'CPF', value: 'CPF' }, { label: 'CNPJ', value: 'CNPJ' }, { label: 'RNE N°', value: 'RNE' }
    ]
  },
  tipoConta: {
    type: 'select',
    options: [
      { label: 'Conta Corrente', value: 'Corrente' }, { label: 'Conta Poupança', value: 'Poupanca' }
    ]
  },
  titularAdvogado: {
    type: 'select',
    options: [
      { label: 'Procurador', value: 'Procurador' }, { label: 'Escritório de Advocacia', value: 'Escritorio' }
    ]
  }
};