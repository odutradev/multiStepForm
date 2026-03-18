import { fetchSubjects, fetchCourts, fetchUsers } from '../mocks';
import { step2TestData } from '../../tests/step2';

import type { FormConfig } from '@components/multiStepForm/types';

export const step2: FormConfig['steps'][number] = {
  id: 'step-2',
  title: 'Informações Gerais',
  testData: step2TestData,
  groups: [
    {
      title: 'Dados do Magistrado',
      gridColumns: 2,
      fields: [
        {
          name: 'matriculaMagistrado',
          label: 'Matrícula do magistrado',
          required: true,
          preSet: 'matricula',
          icon: 'Search',
          searchConfig: {
            title: 'Buscar Magistrado',
            initialFilterName: 'registration',
            pagination: true,
            fields: [
              { name: 'name', label: 'Nome do Magistrado', type: 'text' },
              { name: 'registration', label: 'Matrícula', preSet: 'matricula' }
            ],
            columns: [
              { header: 'Matrícula', key: 'registration' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchUsers,
            onSelect: (item, context) => context.setMultipleValues({ matriculaMagistrado: item.registration, nomeMagistrado: item.name }, true)
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
      title: 'Dados do Gerente de Secretaria',
      gridColumns: 2,
      fields: [
        {
          name: 'matriculaGerenteSecretaria',
          label: 'Matrícula do gerente da secretaria',
          required: true,
          preSet: 'matricula',
          icon: 'Search',
          searchConfig: {
            title: 'Buscar Gerente da Secretaria',
            initialFilterName: 'registration',
            pagination: true,
            fields: [
              { name: 'name', label: 'Nome do Gerente', type: 'text' },
              { name: 'registration', label: 'Matrícula', preSet: 'matricula' }
            ],
            columns: [
              { header: 'Matrícula', key: 'registration' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchUsers,
            onSelect: (item, context) => context.setMultipleValues({ matriculaGerenteSecretaria: item.registration, nomeGerenteSecretaria: item.name }, true)
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
          name: 'codigoVaraRequisicao',
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
              { name: 'code', label: 'Código da Vara', type: 'text', mask: '000000000' }
            ],
            columns: [
              { header: 'Código', key: 'code' },
              { header: 'Nome', key: 'name' }
            ],
            onSearch: fetchCourts,
            onSelect: (item, context) => context.setMultipleValues({ codigoVaraRequisicao: item.code, nomeVaraRequisicao: item.name }, true)
          }
        },
        {
          name: 'nomeVaraRequisicao',
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
          name: 'numeroUnicoCnj',
          label: 'Numeração única do processo judicial (CNJ)',
          preSet: 'numeroProcesso',
          required: true,
          readOnly: true
        },
        {
          name: 'numeroProcessoOriginario',
          label: 'Número originário anterior (se houver)',
          preSet: 'numeroProcesso'
        },
        {
          name: 'houveProcessoConhecimento',
          label: 'Houve processo de conhecimento?',
          required: true,
          preSet: 'simNao'
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
          name: 'dataAjuizamentoConhecimento',
          label: 'Data de ajuizamento do processo de conhecimento',
          type: 'date',
          required: true,
          disableFuture: true
        },
        {
          name: 'dataCitacaoConhecimento',
          label: 'Data da citação do processo de conhecimento',
          type: 'date',
          required: true,
          disableFuture: true
        },
        {
          name: 'tipoTransitoJulgado',
          label: 'Data do trânsito em julgado',
          type: 'select',
          required: true,
          options: [
            { label: 'Data do trânsito em julgado da sentença', value: 'Sentença' },
            { label: 'Data do trânsito em julgado do acórdão', value: 'Acórdão' }
          ]
        },
        {
          name: 'dataTransitoJulgadoSentenca',
          label: 'Data do trânsito em julgado da sentença da fase de conhecimento',
          type: 'date',
          required: true,
          disableFuture: true,
          conditionalRender: ({ data }) => data.tipoTransitoJulgado === 'Sentença'
        },
        {
          name: 'dataTransitoJulgadoAcordao',
          label: 'Data do trânsito em julgado do acórdão lavrado na fase de conhecimento',
          type: 'date',
          required: true,
          disableFuture: true,
          conditionalRender: ({ data }) => data.tipoTransitoJulgado === 'Acórdão'
        }
      ]
    },
    {
      title: 'Embargos e Impugnações',
      gridColumns: 2,
      fields: [
        {
          name: 'houveEmbargosExecucao',
          label: 'Houve embargos à execução ou impugnação ao cálculo no cumprimento de sentença?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'dataTransitoJulgadoEmbargos',
          label: 'Data do trânsito em julgado dos embargos à execução',
          type: 'date',
          disableFuture: true,
          conditionalRender: ({ data }) => data.houveEmbargosExecucao === 'Sim'
        },
        {
          name: 'dataDecursoPrazoEmbargos',
          label: 'Data do decurso de prazo para apresentação dos embargos à execução',
          type: 'date',
          disableFuture: true,
          conditionalRender: ({ data }) => data.houveEmbargosExecucao === 'Não'
        }
      ]
    },
    {
      title: 'Natureza da Requisição',
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
          name: 'dataIntimacaoPartes',
          label: 'Data da intimação das partes quanto ao inteiro teor do Formulário Ofício Precatório',
          type: 'date',
          disableFuture: true,
          icon: 'CalendarToday'
        }
      ]
    },
    {
      title: 'Tipo de Requisição',
      gridColumns: 2,
      fields: [
        {
          name: 'tipoRequisicao',
          label: 'Requisição',
          type: 'select',
          required: true,
          options: [
            { label: 'Original', value: 'Original' },
            { label: 'Complementar', value: 'Complementar' },
            { label: 'Parcial', value: 'Parcial' },
            { label: 'Suplementar', value: 'Suplementar' }
          ]
        },
        {
          name: 'dataReconhecimentoParcela',
          label: 'Data do reconhecimento da parcela incontroversa',
          type: 'date',
          required: true,
          disableFuture: true,
          conditionalRender: ({ data }) => data.tipoRequisicao === 'Parcial'
        }
      ]
    },
    {
      title: 'Ação Salarial',
      gridColumns: 3,
      fields: [
        {
          name: 'possuiNaturezaSalarial',
          label: 'Ação de natureza salarial?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'condicaoServidor',
          label: 'Condição',
          type: 'select',
          required: true,
          options: [
            { label: 'Ativo', value: 'Ativo' },
            { label: 'Inativo', value: 'Inativo' },
            { label: 'Pensionista', value: 'Pensionista' }
          ],
          conditionalRender: ({ data }) => data.possuiNaturezaSalarial === 'Sim'
        },
        {
          name: 'orgaoVinculacaoServidor',
          label: 'Órgão a que estiver vinculado o empregado ou servidor publico, civil ou militar, da administração direta',
          type: 'text',
          required: true,
          conditionalRender: ({ data }) => data.possuiNaturezaSalarial === 'Sim'
        }
      ]
    },
    {
      title: 'Assunto do Processo',
      gridColumns: 2,
      fields: [
        {
          name: 'codigoAssuntoProcesso',
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
            onSelect: (item, context) => context.setMultipleValues({ codigoAssuntoProcesso: item.code, descricaoAssuntoProcesso: item.description }, true)
          }
        },
        {
          name: 'descricaoAssuntoProcesso',
          label: 'Descrição do assunto',
          type: 'text',
          required: true,
          readOnly: true
        }
      ]
    },
    {
      title: 'Tipo de Beneficiário',
      gridColumns: 3,
      fields: [
        {
          name: 'tipoBeneficiarioRequisicao',
          label: 'A requisição será expedida em favor de qual beneficiário?',
          type: 'select',
          required: true,
          options: [
            { label: 'Beneficiário Principal', value: 'Beneficiário Principal' },
            { label: 'Honorários Sucumbenciais', value: 'Honorários Sucumbenciais' },
            { label: 'Honorários Periciais', value: 'Honorários Periciais' }
          ]
        },
        {
          name: 'possuiDestaqueHonorarios',
          label: 'Existe a previsão de destaque de honorários contratuais?',
          required: true,
          colSpan: 2,
          preSet: 'simNao',
          conditionalRender: ({ data }) => data.tipoBeneficiarioRequisicao === 'Beneficiário Principal'
        }
      ]
    },
    {
      title: 'Beneficiário Principal',
      highlight: true,
      gridColumns: 4,
      conditionalRender: ({ data }) => data.tipoBeneficiarioRequisicao === 'Beneficiário Principal',
      fields: [
        {
          name: 'houveCessaoCreditoPrincipal',
          label: 'O crédito foi objeto de cessão?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houveSucessaoCreditoPrincipal',
          label: 'O crédito principal foi objeto de sucessão?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'tipoCessaoCreditoPrincipal',
          label: 'Tipo de cessão do crédito principal',
          type: 'select',
          options: [
            { label: 'Total', value: 'Total' },
            { label: 'Parcial', value: 'Parcial' }
          ]
        },
        {
          name: 'houvePenhoraCreditoPrincipal',
          label: 'O crédito foi objeto de penhora?',
          required: true,
          conditionalRender: ({ data }) => data.houveCessaoCreditoPrincipal === 'Sim',
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Sucessão do Beneficiário Principal',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.houveSucessaoCreditoPrincipal === 'Sim',
      fields: [
        {
          name: 'nomeBeneficiarioOriginario',
          label: 'Beneficiário Originário',
          type: 'text',
          required: true
        },
        {
          name: 'tipoDocumentoBeneficiarioOriginario',
          label: 'Tipo do documento',
          required: true,
          preSet: 'tipoDocumento'
        },
        {
          name: 'cpfBeneficiarioOriginario',
          label: 'Número do documento',
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginario === 'CPF'
        },
        {
          name: 'cnpjBeneficiarioOriginario',
          label: 'Número do documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginario === 'CNPJ'
        },
        {
          name: 'rneBeneficiarioOriginario',
          label: 'Número do documento',
          required: true,
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginario === 'RNE'
        }
      ]
    },
    {
      title: 'Honorários Contratuais',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.possuiDestaqueHonorarios === 'Sim',
      fields: [
        {
          name: 'houveCessaoHonorariosContratuais',
          label: 'Os honorários contratuais foram objeto de cessão?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houvePenhoraHonorariosContratuais',
          label: 'Os honorários contratuais foram objeto de penhora?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houveSucessaoHonorariosContratuais',
          label: 'Os honorários contratuais foram objeto de sucessão?',
          required: true,
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Beneficiário Originário (Honorários Contratuais)',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.houveSucessaoHonorariosContratuais === 'Sim',
      fields: [
        {
          name: 'nomeBeneficiarioOriginarioHonorarios',
          label: 'Beneficiário Originário',
          type: 'text',
          required: true,
          validation: {
            pattern: '^.{1,255}$',
            message: 'O nome do beneficiário deve ter no máximo 255 caracteres'
          }
        },
        {
          name: 'tipoDocumentoBeneficiarioOriginarioHonorarios',
          label: 'Tipo do documento',
          required: true,
          preSet: 'tipoDocumento'
        },
        {
          name: 'cpfBeneficiarioOriginarioHonorarios',
          label: 'Número do documento',
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginarioHonorarios === 'CPF'
        },
        {
          name: 'cnpjBeneficiarioOriginarioHonorarios',
          label: 'Número do documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginarioHonorarios === 'CNPJ'
        },
        {
          name: 'rneBeneficiarioOriginarioHonorarios',
          label: 'Número do documento',
          required: true,
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoBeneficiarioOriginarioHonorarios === 'RNE'
        }
      ]
    },
    {
      title: 'Honorários Sucumbenciais',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.tipoBeneficiarioRequisicao === 'Honorários Sucumbenciais',
      fields: [
        {
          name: 'houveCessaoHonorariosSucumbenciais',
          label: 'O crédito foi objeto de cessão?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houvePenhoraHonorariosSucumbenciais',
          label: 'O crédito foi objeto de penhora?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houveSucessaoHonorariosSucumbenciais',
          label: 'Os honorários sucumbenciais foram objeto de sucessão?',
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Honorários Periciais',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.tipoBeneficiarioRequisicao === 'Honorários Periciais',
      fields: [
        {
          name: 'houveCessaoHonorariosPericiais',
          label: 'O crédito foi objeto de cessão?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houvePenhoraHonorariosPericiais',
          label: 'O crédito foi objeto de penhora?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'houveSucessaoHonorariosPericiais',
          label: 'O crédito principal foi objeto de sucessão?',
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Entidade Devedora / Ente Devedor',
      gridColumns: 2,
      fields: [
        {
          name: 'entidadeDevedora',
          label: 'Entidade Devedora / Ente Devedor',
          type: 'select',
          options: [
            { label: 'JD COMARCA EXTREMA', value: 'JD COMARCA EXTREMA' },
            { label: 'ESTADO DE MINAS GERAIS', value: 'ESTADO DE MINAS GERAIS' }
          ],
          onChange: (value, context) => {
            if (value === 'ESTADO DE MINAS GERAIS') {
              context.setMultipleValues({ cnpjEntidadeDevedora: '18.715.615/0001-60' });
            } else {
              context.setMultipleValues({ cnpjEntidadeDevedora: '' });
            }
          }
        },
        {
          name: 'cnpjEntidadeDevedora',
          label: 'CNPJ',
          preSet: 'cnpj',
          readOnly: true,
          conditionalRender: ({ data }) => !!data.entidadeDevedora
        }
      ]
    }
  ],
  actions: [
    { label: 'Voltar', actionType: 'prev', variant: 'outlined' },
    { label: 'Avançar', actionType: 'next' }
  ]
};