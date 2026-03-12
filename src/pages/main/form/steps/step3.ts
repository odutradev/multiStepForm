import { beneficiariesOptions, beneficiariesMock, MOCK_SUBMIT_DELAY_MS } from '../mocks';

import type { FormConfig } from '@components/multiStepForm/types';

export const step3: FormConfig['steps'][number] = {
  id: 'step-3',
  title: 'Beneficiário',
  groups: [
    {
      gridColumns: 2,
      fields: [
        {
          name: 'tipoBeneficiarioRequisicao',
          label: 'Tipo de beneficiário selecionado',
          type: 'text',
          readOnly: true,
          required: true
        },
        {
          name: 'beneficiarioSelecionado',
          label: 'Selecione o Beneficiário',
          type: 'select',
          required: true,
          options: beneficiariesOptions,
          onChange: (value, context) => {
            const selected = beneficiariesMock.find((b) => b.id === String(value));
            if (!selected) return;
            context.setMultipleValues({
              nomeBeneficiario: selected.nome,
              tipoDocumentoBeneficiario: selected.tipoDocumento,
              numeroDocumentoBeneficiario: selected.documento,
              dataNascimentoBeneficiario: selected.dataNascimento ?? '',
              idadeBeneficiario: selected.idade ?? ''
            });
          }
        }
      ]
    },
    {
      title: 'Informações Básicas',
      gridColumns: 6,
      fields: [
        {
          name: 'nomeBeneficiario',
          label: 'Nome',
          type: 'text',
          colSpan: 3
        },
        {
          name: 'nomeSocialBeneficiario',
          label: 'Nome Social',
          type: 'text',
          colSpan: 3
        },
        {
          name: 'dataNascimentoBeneficiario',
          label: 'Data de Nascimento',
          required: true,
          type: 'date',
          colSpan: 3,
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiario === 'CPF'
        },
        {
          name: 'idadeBeneficiario',
          label: 'Idade',
          type: 'number',
          colSpan: 3,
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiario === 'CPF'
        },
        {
          name: 'tipoDocumentoBeneficiario',
          label: 'Tipo de Documento',
          type: 'text',
          readOnly: true,
          required: true,
          colSpan: 2
        },
        {
          name: 'numeroDocumentoBeneficiario',
          label: 'Número do Documento',
          type: 'text',
          readOnly: true,
          required: true,
          colSpan: 2
        },
        {
          name: 'numeroPixPasepNit',
          label: 'Número PIX / PASEP ou NIT',
          type: 'text',
          colSpan: 2
        },
        {
          name: 'doencaGrave',
          label: 'Doença Grave?',
          type: 'select',
          options: [
            { label: 'Sim', value: 'S' },
            { label: 'Não', value: 'N' }
          ],
          colSpan: 2
        },
        {
          name: 'pessoaDeficiencia',
          label: 'Pessoa com Deficiência?',
          type: 'select',
          options: [
            { label: 'Sim', value: 'S' },
            { label: 'Não', value: 'N' }
          ],
          colSpan: 2
        },
        {
          name: 'beneficiarioCreditoPreferencial',
          label: 'Beneficiário de crédito preferencial por decisão jurídica?',
          type: 'select',
          options: [
            { label: 'Sim', value: 'S' },
            { label: 'Não', value: 'N' }
          ],
          colSpan: 2
        }
      ]
    },
    {
      title: 'Representante do Beneficiário',
      gridColumns: 1,
      fields: [
        {
          name: 'condicaoBeneficiario',
          label: 'O beneficiário é',
          type: 'select',
          required: true,
          options: [
            { label: 'Não se aplica', value: 'NaoSeAplica' },
            { label: 'Incapaz', value: 'Incapaz' },
            { label: 'Espólio', value: 'Espolio' },
            { label: 'Massa Falida', value: 'MassaFalida' },
            { label: 'Menor', value: 'Menor' }
          ]
        }
      ]
    },
    {
      title: 'Dados do Representante Legal',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => !!data.condicaoBeneficiario && data.condicaoBeneficiario !== 'NaoSeAplica',
      fields: [
        {
          name: 'nomeRepresentanteLegal',
          label: 'Nome do Representante Legal',
          type: 'text',
          required: true
        },
        {
          name: 'tipoDocumentoRepresentante',
          label: 'Tipo de Documento',
          type: 'select',
          required: true,
          options: [
            { label: 'CPF', value: 'CPF' },
            { label: 'CNPJ', value: 'CNPJ' },
            { label: 'RNE N°', value: 'RNE' }
          ]
        },
        {
          name: 'numeroDocumentoRepresentanteCPF',
          label: 'Número do Documento (CPF)',
          type: 'text',
          required: true,
          mask: '000.000.000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoRepresentanteCNPJ',
          label: 'Número do Documento (CNPJ)',
          type: 'text',
          required: true,
          mask: '00.000.000/0000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoRepresentanteRNE',
          label: 'Número do Documento (RNE N°)',
          type: 'text',
          required: true,
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'RNE'
        },
        {
          name: 'numeroOABRepresentante',
          label: 'Número da OAB (se for o caso)',
          type: 'text'
        },
        {
          name: 'categoriaOABRepresentante',
          label: 'Categoria',
          type: 'select',
          required: true,
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'E', value: 'E' },
            { label: 'N', value: 'N' }
          ]
        },
        {
          name: 'secaoOABRepresentante',
          label: 'Seção',
          type: 'select',
          required: true,
          options: [
            { label: 'AC', value: 'AC' },
            { label: 'AL', value: 'AL' },
            { label: 'AP', value: 'AP' },
            { label: 'AM', value: 'AM' },
            { label: 'BA', value: 'BA' },
            { label: 'CE', value: 'CE' },
            { label: 'DF', value: 'DF' },
            { label: 'ES', value: 'ES' },
            { label: 'GO', value: 'GO' },
            { label: 'MA', value: 'MA' },
            { label: 'MT', value: 'MT' },
            { label: 'MS', value: 'MS' },
            { label: 'MG', value: 'MG' },
            { label: 'PA', value: 'PA' },
            { label: 'PB', value: 'PB' },
            { label: 'PR', value: 'PR' },
            { label: 'PE', value: 'PE' },
            { label: 'PI', value: 'PI' },
            { label: 'RJ', value: 'RJ' },
            { label: 'RN', value: 'RN' },
            { label: 'RS', value: 'RS' },
            { label: 'RO', value: 'RO' },
            { label: 'RR', value: 'RR' },
            { label: 'SC', value: 'SC' },
            { label: 'SP', value: 'SP' },
            { label: 'SE', value: 'SE' },
            { label: 'TO', value: 'TO' }
          ]
        }
      ]
    },
    {
      title: 'Dados Bancários',
      gridColumns: 2,
      fields: [
        {
          name: 'titularConta',
          label: 'Titular da Conta',
          type: 'select',
          required: true,
          colSpan: 2,
          options: [
            { label: 'Beneficiário do crédito', value: 'BeneficiarioCredito' },
            { label: 'Representante legal', value: 'RepresentanteLegal' }
          ]
        }
      ]
    },
    {
      title: 'Beneficiário de Crédito',
      highlight: true,
      gridColumns: 2,
      conditionalRender: ({ data }) => data.titularConta === 'BeneficiarioCredito',
      fields: [
        {
          name: 'tipoDocumentoTitularCredito',
          label: 'Tipo de Documento',
          type: 'select',
          required: true,
          options: [
            { label: 'CPF', value: 'CPF' },
            { label: 'CNPJ', value: 'CNPJ' },
            { label: 'RNE N°', value: 'RNE' }
          ]
        },
        {
          name: 'numeroDocumentoTitularCreditoCPF',
          label: 'Número do Documento (CPF)',
          type: 'text',
          required: true,
          mask: '000.000.000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoTitularCreditoCNPJ',
          label: 'Número do Documento (CNPJ)',
          type: 'text',
          required: true,
          mask: '00.000.000/0000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoTitularCreditoRNE',
          label: 'Número do Documento (RNE N°)',
          type: 'text',
          required: true,
          mask: 'a000000-a',
          validation: {
            pattern: '^[A-Z]\\d{6}[A-Z]$',
            message: 'RNE inválido'
          },
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'RNE'
        }
      ]
    },
    {
      gridColumns: 2,
      fields: [
        {
          name: 'bancoTitular',
          label: 'Banco do Titular',
          type: 'select',
          required: true,
          options: [
            { label: '001 - Banco do Brasil S.A.', value: '001' },
            { label: '033 - Banco Santander (Brasil) S.A.', value: '033' },
            { label: '077 - Banco Inter S.A.', value: '077' },
            { label: '104 - Caixa Econômica Federal', value: '104' },
            { label: '237 - Banco Bradesco S.A.', value: '237' },
            { label: '260 - Nubank', value: '260' },
            { label: '341 - Itaú Unibanco S.A.', value: '341' }
          ]
        },
        {
          name: 'tipoConta',
          label: 'Tipo de Conta',
          type: 'select',
          required: true,
          options: [
            { label: 'Conta Corrente', value: 'Corrente' },
            { label: 'Conta Poupança', value: 'Poupanca' }
          ]
        },
        {
          name: 'agenciaConta',
          label: 'Agência',
          type: 'text',
          required: true,
          validation: {
            pattern: '^\\d{1,20}$',
            message: 'Apenas números (máximo 20 dígitos)'
          }
        },
        {
          name: 'numeroConta',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          validation: {
            pattern: '^\\d{1,20}$',
            message: 'Apenas números (máximo 20 dígitos)'
          }
        }
      ]
    }
  ],
  actions: [
    { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
    {
      label: 'Confirmar e Enviar',
      actionType: 'submit',
      onClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
      }
    }
  ]
};