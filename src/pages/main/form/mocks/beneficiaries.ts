export const YES_NO_OPTIONS = [
  { label: 'Sim', value: 'S' },
  { label: 'Não', value: 'N' }
];

export const beneficiariesMock = [
  {
    id: '1',
    nome: 'João da Silva',
    tipoDocumento: 'CPF',
    documento: '111.222.333-44',
    dataNascimento: '15/05/1980',
    idade: 45
  },
  {
    id: '2',
    nome: 'Empresa Tecnologia LTDA',
    tipoDocumento: 'CNPJ',
    documento: '12.345.678/0001-99'
  },
  {
    id: '3',
    nome: 'Maria Souza',
    tipoDocumento: 'CPF',
    documento: '555.666.777-88',
    dataNascimento: '20/10/1995',
    idade: 30
  }
];

export const beneficiariesOptions = beneficiariesMock.map((beneficiary) => ({
  label: beneficiary.nome,
  value: beneficiary.id
}));