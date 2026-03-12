import { fetchSubjects, fetchCourts, fetchUsers } from '../mocks';

import type { FormConfig } from '@components/multiStepForm/types';

export const step2: FormConfig['steps'][number] = {
  id: 'step-2',
  title: 'Informações Gerais',
  groups: [
    {
      title: 'Magistrado Responsável',
      gridColumns: 2,
      fields: [
        {
          name: 'matriculaMagistrado',
          label: 'Matrícula do magistrado',
          type: 'text',
          required: true,
          mask: 'a-0000000',
          icon: 'Search',
          validation: {
            pattern: '^[A-Z]-\\d{7}$',
            message: 'Matrícula inválida'
          },
          searchConfig: {
            title: 'Buscar Magistrado',
            initialFilterName: 'registration',
            pagination: true,
            fields: [
              { name: 'name', label: 'Nome do Magistrado', type: 'text' },
              {
                name: 'registration',
                label: 'Matrícula',
                type: 'text',
                mask: 'a-0000000'
              }
            ],
            columns: [
              { header: 'Matrícula', key: 'registration' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchUsers,
            onSelect: (item, context) =>
              context.setMultipleValues(
                {
                  matriculaMagistrado: item.registration,
                  nomeMagistrado: item.name
                },
                true
              )
          }
        },
        {
          name: 'nomeMagistrado',
          label: 'Nome do magistrado',
          type: 'text',
          required: true,
          readOnly: true
        }
      ]
    },
    {
      title: 'Selecione o Gerente da Secretaria',
      gridColumns: 2,
      fields: [
        {
          name: 'matriculaGerenteSecretaria',
          label: 'Matrícula do gerente da secretaria',
          type: 'text',
          required: true,
          mask: 'a-0000000',
          icon: 'Search',
          validation: {
            pattern: '^[A-Z]-\\d{7}$',
            message: 'Matrícula inválida'
          },
          searchConfig: {
            title: 'Buscar Gerente da Secretaria',
            initialFilterName: 'registration',
            pagination: true,
            fields: [
              { name: 'name', label: 'Nome do Gerente', type: 'text' },
              {
                name: 'registration',
                label: 'Matrícula',
                type: 'text',
                mask: 'a-0000000'
              }
            ],
            columns: [
              { header: 'Matrícula', key: 'registration' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchUsers,
            onSelect: (item, context) =>
              context.setMultipleValues(
                {
                  matriculaGerenteSecretaria: item.registration,
                  nomeGerenteSecretaria: item.name
                },
                true
              )
          }
        },
        {
          name: 'nomeGerenteSecretaria',
          label: 'Nome do gerente da secretaria',
          type: 'text',
          readOnly: true,
          required: true
        }
      ]
    },
    {
      title: 'Dados da Requisição',
      gridColumns: 2,
      fields: [
        {
          name: 'codigoVara',
          label: 'Código da vara',
          type: 'text',
          required: true,
          icon: 'Search',
          mask: '000000000',
          validation: {
            pattern: '^\\d{9}$',
            message: 'O código deve conter exatamente 9 dígitos numéricos'
          },
          searchConfig: {
            title: 'Buscar Vara',
            initialFilterName: 'code',
            pagination: true,
            fields: [
              { name: 'name', label: 'Nome da Vara', type: 'text' },
              {
                name: 'code',
                label: 'Código da Vara',
                type: 'text',
                mask: '000000000'
              }
            ],
            columns: [
              { header: 'Código', key: 'code' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchCourts,
            onSelect: (item, context) =>
              context.setMultipleValues(
                { codigoVara: item.code, nomeVara: item.name },
                true
              )
          }
        },
        {
          name: 'nomeVara',
          label: 'Nome da vara',
          type: 'text',
          required: true,
          readOnly: true
        }
      ]
    },
    {
      title: 'Informações Processuais',
      gridColumns: 3,
      fields: [
        {
          name: 'numeroUnicoProcessoJudicialCnj',
          label: 'Numeração única do processo judicial (CNJ)',
          type: 'text',
          required: true,
          readOnly: true,
          mask: '0000000-00.0000.0.00.0000'
        },
        {
          name: 'numeroOriginarioAnterior',
          label: 'Número originário anterior (se houver)',
          type: 'text',
          mask: '0000000-00.0000.0.00.0000'
        },
        {
          name: 'houveProcessoConhecimento',
          label: 'Houve processo de conhecimento?',
          type: 'select',
          required: true,
          options: [
            { label: 'Sim', value: 'Sim' },
            { label: 'Não', value: 'Não' }
          ]
        }
      ]
    },
    {
      title: 'Processo de Conhecimento',
      highlight: true,
      gridColumns: 2,
      conditionalRender: ({ data }) => data.houveProcessoConhecimento === 'Sim',
      fields: [
        {
          name: 'dataAjuizamentoProcessoConhecimento',
          label: 'Data de ajuizamento do processo de conhecimento',
          type: 'date',
          required: true
        },
        {
          name: 'dataCitacaoProcessoConhecimento',
          label: 'Data da citação do processo de conhecimento',
          type: 'date',
          required: true
        },
        {
          name: 'tipoDataTransitoJulgado',
          label: 'Data do trânsito em julgado',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Data do trânsito em julgado da sentença',
              value: 'Sentença'
            },
            {
              label: 'Data do trânsito em julgado do acórdão',
              value: 'Acórdão'
            }
          ]
        },
        {
          name: 'dataTransitoJulgadoSentenca',
          label: 'Data do trânsito em julgado da sentença da fase de conhecimento',
          type: 'date',
          required: true,
          conditionalRender: ({ data }) => data.tipoDataTransitoJulgado === 'Sentença'
        },
        {
          name: 'dataTransitoJulgadoAcordao',
          label: 'Data do trânsito em julgado do acórdão lavrado na fase de conhecimento',
          type: 'date',
          required: true,
          conditionalRender: ({ data }) => data.tipoDataTransitoJulgado === 'Acórdão'
        }
      ]
    },
    {
      gridColumns: 2,
      fields: [
        {
          name: 'houveEmbargosOuImpugnacao',
          label: 'Houve embargos à execução ou impugnação ao cálculo no cumprimento de sentença?',
          type: 'select',
          required: true,
          options: [
            { label: 'Sim', value: 'Sim' },
            { label: 'Não', value: 'Não' }
          ]
        },
        {
          name: 'dataTransitoJulgadoEmbargos',
          label: 'Data do trânsito em julgado dos embargos à execução',
          type: 'date',
          required: false,
          conditionalRender: ({ data }) => data.houveEmbargosOuImpugnacao === 'Sim'
        },
        {
          name: 'dataDecursoPrazoEmbargos',
          label: 'Data do decurso de prazo para apresentação dos embargos à execução',
          type: 'date',
          required: false,
          conditionalRender: ({ data }) => data.houveEmbargosOuImpugnacao === 'Não'
        }
      ]
    },
    {
      title: 'Informações sobre a Requisição',
      gridColumns: 2,
      fields: [
        {
          name: 'naturezaCredito',
          label: 'Natureza do crédito',
          type: 'select',
          required: true,
          options: [
            { label: 'Alimentar', value: 'Alimentar' },
            { label: 'Comum', value: 'Comum' }
          ]
        },
        {
          name: 'dataIntimacaoFormulario',
          label: 'Data da intimação das partes quanto ao inteiro teor do Formulário Ofício Precatório',
          type: 'date',
          mask: '00/00/0000',
          validation: {
            pattern: '^\\d{2}/\\d{2}/\\d{4}$',
            message: 'Data inválida. Use o formato DD/MM/AAAA'
          },
          required: false,
          disabled: false,
          icon: 'CalendarToday'
        }
      ]
    },
    {
      gridColumns: 3,
      fields: [
        {
          type: 'select',
          name: 'acaoNaturezaSalarial',
          label: 'Ação de natureza salarial?',
          required: true,
          options: [
            { label: 'Sim', value: 'Sim' },
            { label: 'Não', value: 'Não' }
          ],
          colSpan: 1
        },
        {
          type: 'select',
          name: 'condicaoNaturezaSalarial',
          label: 'Condição',
          required: true,
          colSpan: 1,
          options: [
            { label: 'Ativo', value: 'Ativo' },
            { label: 'Inativo', value: 'Inativo' },
            { label: 'Pensionista', value: 'Pensionista' }
          ],
          conditionalRender: ({ data }) => data.acaoNaturezaSalarial === 'Sim'
        },
        {
          type: 'text',
          name: 'orgaoVinculadoEmpregado',
          label: 'Órgão a que estiver vinculado o empregado ou servidor publico, civil ou militar, da administração direta',
          required: true,
          colSpan: 1,
          conditionalRender: ({ data }) => data.acaoNaturezaSalarial === 'Sim'
        }
      ]
    },
    {
      gridColumns: 2,
      fields: [
        {
          name: 'codigoAssunto',
          label: 'Código do assunto',
          type: 'text',
          required: true,
          mask: '00000000',
          icon: 'Search',
          validation: {
            pattern: '^\\d{1,8}$',
            message: 'Máximo 8 dígitos'
          },
          searchConfig: {
            title: 'Buscar Assunto',
            viewMode: 'tree',
            treeConfig: {
              labelKey: 'description',
              valueKey: 'code',
              childrenKey: 'children'
            },
            initialFilterName: 'code',
            pagination: false,
            fields: [
              { name: 'code', label: 'Código do Assunto', type: 'text' },
              { name: 'description', label: 'Descrição', type: 'text' }
            ],
            columns: [],
            onSearch: fetchSubjects,
            onSelect: (item, context) =>
              context.setMultipleValues(
                {
                  codigoAssunto: item.code,
                  descricaoAssunto: item.description
                },
                true
              )
          }
        },
        {
          name: 'descricaoAssunto',
          label: 'Descrição do assunto',
          type: 'text',
          required: true,
          readOnly: true
        }
      ]
    },
    {
      title: 'Informações sobre o(s) Beneficiário(s) do Precatório',
      gridColumns: 3,
      fields: [
        {
          type: 'select',
          name: 'tipoBeneficiarioRequisicao',
          label: 'A requisição será expedida em favor de qual beneficiário?',
          required: true,
          options: [
            { label: 'Beneficiário Principal', value: 'Beneficiário Principal' },
            { label: 'Honorários Sucumbenciais', value: 'Honorários Sucumbenciais' },
            { label: 'Honorários Periciais', value: 'Honorários Periciais' }
          ],
          colSpan: 1
        },
        {
          type: 'select',
          name: 'previsaoDestaqueHonorarios',
          label: 'Existe a previsão de destaque de honorários contratuais?',
          options: [
            { label: 'Sim', value: 'Sim' },
            { label: 'Não', value: 'Não' }
          ],
          required: true,
          disabled: false,
          colSpan: 2,
          conditionalRender: ({ data }) => data.tipoBeneficiarioRequisicao === 'Beneficiário Principal'
        }
      ]
    }
  ],
  actions: [
    { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
    { label: 'Avançar', actionType: 'next' }
  ]
};