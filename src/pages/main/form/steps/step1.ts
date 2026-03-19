import { stepOneAutoFillMock, MOCK_DELAY_MS } from '../mocks';
import { step1TestData } from '../tests/step1';

import type { FormConfig } from '@components/multiStepForm/types';

export const step1: FormConfig['steps'][number] = {
  id: 'step-1',
  title: 'Cadastrar Processo',
  testData: step1TestData,
  groups: [
    {
      title: 'Dados Iniciais',
      gridColumns: 2,
      fields: [
        {
          name: 'numeroProcesso',
          label: 'Número do processo',
          preSet: 'numeroProcesso',
          required: true
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