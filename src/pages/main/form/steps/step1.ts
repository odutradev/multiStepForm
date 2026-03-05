import { stepOneAutoFillMock, MOCK_DELAY_MS } from '../mocks';

import type { FormConfig } from '@components/multiStepForm/types';

export const step1: FormConfig['steps'][number] = {
  id: 'step-1',
  title: 'Cadastrar Processo',
  groups: [
    {
      gridColumns: 2,
      fields: [
        {
          name: 'numeroProcesso',
          label: 'Número do processo',
          type: 'text',
          required: true,
          mask: '0000000-00.0000.0.00.0000',
          validation: {
            pattern: '^\\d{7}-\\d{2}\\.\\d{4}\\.\\d\\.\\d{2}\\.\\d{4}$',
            message: 'Número do processo inválido'
          }
        },
        {
          name: 'instanciaJustica',
          label: 'Instância',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Justiça Comum 1ª Instância',
              value: 'Justiça Comum 1ª Instância'
            },
            {
              label: 'Justiça Comum 2ª Instância',
              value: 'Justiça Comum 2ª Instância'
            }
          ]
        }
      ]
    }
  ],
  actions: [
    {
      label: 'Buscar e Avançar',
      actionType: 'next',
      onClick: async (context) => {
        await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
        context.setMultipleValues(stepOneAutoFillMock, true);
      }
    }
  ]
};
