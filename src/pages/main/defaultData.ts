import { magistratesMock } from './mock';

import type { FormConfig } from '@components/multiStepForm/types';

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
            message: 'Número do processo inválido (0000000-00.0000.0.00.0000)'
          }
        },
        {
          name: 'tipoJustica',
          label: 'Instância',
          type: 'select',
          required: true,
          options: [
            { label: 'Justiça Comum 1ª Instância', value: 'JUSTICA_COMUM_1_INSTANCIA' },
            { label: 'Justiça Comum 2ª Instância', value: 'JUSTICA_COMUM_2_INSTANCIA' },
          ],
        },
      ],
      actions: [
        {
          label: 'Buscar e Avançar',
          actionType: 'next',
          onClick: async ({ data, setValue }) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (data.numeroProcesso) {
              setValue('value', 5000);
              setValue('court', 'TJSP');
            }
          }
        }
      ],
    },
    {
      id: 'step-2',
      title: 'Informações Gerais',
      gridColumns: 2,
      fields: [
        { name: 'subtitleMagistrado', label: 'Magistrado Responsável', type: 'subtitle' },
        {
          name: 'usernameMagistrado',
          label: 'Matrícula do magistrado',
          type: 'text',
          required: true,
          mask: 'a-0000000',
          icon: 'Search',
          searchConfig: {
            title: 'Buscar Magistrado',
            initialFilterName: 'matricula',
            pagination: true,
            fields: [
              { name: 'nome', label: 'Nome do Magistrado', type: 'text' },
              { name: 'matricula', label: 'Matrícula', type: 'text', mask: 'a-0000000' }
            ],
            columns: [
              { header: 'Matrícula', key: 'matricula' },
              { header: 'Nome', key: 'nome' }
            ],
            onSearch: async (filters) => {
              await new Promise((resolve) => setTimeout(resolve, 800));
              const searchName = (filters.nome as string)?.toLowerCase() || '';
              const searchMatricula = (filters.matricula as string)?.toLowerCase() || '';
              
              return magistratesMock.filter((item) => {
                const matchName = item.nome.toLowerCase().includes(searchName);
                const matchMatricula = item.matricula.toLowerCase().includes(searchMatricula);
                return matchName && matchMatricula;
              });
            },
            onSelect: (item, context) => {
              context.setValue('usernameMagistrado', item.matricula as string);
              context.setValue('nomeMagistrado', item.nome as string);
              context.clearErrors(['usernameMagistrado', 'nomeMagistrado']);
            }
          },
          validation: {
            pattern: '^[A-Z]-\\d{7}$',
            message: 'Matrícula inválida. Formato: 1 Letra e 7 Números (Ex: P-0000000)'
          }
        },
        {
          name: 'nomeMagistrado',
          label: 'Nome do magistrado',
          type: 'text',
          required: true,
          readOnly: true
        }
      ],
      actions: [
        { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
        { label: 'Avançar', actionType: 'next' },
      ],
    },
    {
      id: 'step-3',
      title: 'Revisão e Envio',
      fields: [
        { name: 'observations', label: 'Observações Adicionais', type: 'text' },
      ],
      actions: [
        { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
        {
          label: 'Confirmar e Enviar',
          actionType: 'submit',
          onClick: async () => {
             await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        },
      ],
    },
  ],
};