import { fetchMagistrates } from './mock';

import type { FormConfig } from '@components/multiStepForm/types';

const MOCK_SUBMIT_DELAY_MS = 2000;
const MOCK_DELAY_MS = 1500;

export const mockFormConfig: FormConfig = {
  steps: [
    {
      id: 'step-1',
      title: 'Cadastrar Processo',
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
            message: 'Número do processo inválido',
          },
        },
        {
          name: 'tipoJustica',
          label: 'Instância',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Justiça Comum 1ª Instância',
              value: 'JUSTICA_COMUM_1_INSTANCIA',
            },
            {
              label: 'Justiça Comum 2ª Instância',
              value: 'JUSTICA_COMUM_2_INSTANCIA',
            },
          ],
        },
      ],
      actions: [
        {
          label: 'Buscar e Avançar',
          actionType: 'next',
          onClick: async () => {
            await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
          },
        },
      ],
    },
    {
      id: 'step-2',
      title: 'Informações Gerais',
      gridColumns: 2,
      fields: [
        {
          name: 'subtitleMagistrado',
          label: 'Magistrado Responsável',
          type: 'subtitle',
        },
        {
          name: 'matriculaMagistrado',
          label: 'Matrícula do magistrado',
          type: 'text',
          required: true,
          mask: 'a-0000000',
          icon: 'Search',
          validation: {
            pattern: '^[A-Z]-\\d{7}$',
            message: 'Matrícula inválida',
          },
          searchConfig: {
            title: 'Buscar Magistrado',
            initialFilterName: 'matricula',
            pagination: true,
            fields: [
              { name: 'nome', label: 'Nome do Magistrado', type: 'text' },
              {
                name: 'matricula',
                label: 'Matrícula',
                type: 'text',
                mask: 'a-0000000',
              },
            ],
            columns: [
              { header: 'Matrícula', key: 'matricula' },
              { header: 'Nome', key: 'nome' },
            ],
            onSearch: fetchMagistrates,
            onSelect: (item, context) => {
              context.setValue('matriculaMagistrado', item.matricula as string);
              context.setValue('nomeMagistrado', item.nome as string);
              context.clearErrors(['matriculaMagistrado', 'nomeMagistrado']);
            },
          },
        },
        {
          name: 'nomeMagistrado',
          label: 'Nome do magistrado',
          type: 'text',
          required: true,
          readOnly: true,
        },
      ],
      actions: [
        { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
        {
          label: 'Confirmar e Enviar',
          actionType: 'submit',
          onClick: async () => {
            await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
          },
        },
      ],
    }
  ],
};