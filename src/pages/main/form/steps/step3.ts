import { beneficiariesMock, beneficiariesOptions, YES_NO_OPTIONS } from '../mocks/beneficiaries';
import { MOCK_SUBMIT_DELAY_MS } from '../mocks';

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
          options: YES_NO_OPTIONS,
          colSpan: 2
        },
        {
          name: 'pessoaDeficiencia',
          label: 'Pessoa com Deficiência?',
          type: 'select',
          options: YES_NO_OPTIONS,
          colSpan: 2
        },
        {
          name: 'beneficiarioCreditoPreferencial',
          label: 'Beneficiário de crédito preferencial por decisão jurídica?',
          type: 'select',
          options: YES_NO_OPTIONS,
          colSpan: 2
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