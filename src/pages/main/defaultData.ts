import type { FormConfig } from '@components/multiStepForm/types';

export const mockFormConfig: FormConfig = {
  steps: [
    {
      id: 'step-1',
      title: 'Dados Iniciais',
      fields: [
        { name: 'document', label: 'CPF/CNPJ', type: 'text', required: true },
        { name: 'email', label: 'E-mail de Contato', type: 'email', required: true }
      ],
      actions: [
        { label: 'Avançar', actionType: 'next' }
      ]
    },
    {
      id: 'step-2',
      title: 'Detalhes do Ofício',
      fields: [
        { name: 'processNumber', label: 'Número do Processo', type: 'text', required: true },
        { name: 'value', label: 'Valor (R$)', type: 'number', required: true },
        {
          name: 'court',
          label: 'Tribunal',
          type: 'select',
          required: true,
          options: [
            { label: 'TJSP', value: 'TJSP' },
            { label: 'TJMG', value: 'TJMG' },
            { label: 'TRF1', value: 'TRF1' }
          ]
        }
      ],
      actions: [
        { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
        { label: 'Avançar', actionType: 'next' }
      ]
    },
    {
      id: 'step-3',
      title: 'Revisão e Envio',
      fields: [
        { name: 'observations', label: 'Observações Adicionais', type: 'text' }
      ],
      actions: [
        { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
        { label: 'Confirmar e Enviar', actionType: 'submit' }
      ]
    }
  ]
};