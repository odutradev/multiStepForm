import { beneficiariesOptions, beneficiariesMock, procuradoresOptions, procuradoresMock, MOCK_SUBMIT_DELAY_MS } from '../mocks';

import type { FormConfig } from '@components/multiStepForm/types';

const TIPO_DOCUMENTO_OPTIONS = [{ label: 'CPF', value: 'CPF' }, { label: 'CNPJ', value: 'CNPJ' }, { label: 'RNE N°', value: 'RNE' }];
const SIM_NAO_OPTIONS = [{ label: 'Sim', value: 'S' }, { label: 'Não', value: 'N' }];
const CATEGORIA_OAB_OPTIONS = [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'E', value: 'E' }, { label: 'N', value: 'N' }];
const SECAO_OAB_OPTIONS = [{ label: 'AC', value: 'AC' }, { label: 'AL', value: 'AL' }, { label: 'AP', value: 'AP' }, { label: 'AM', value: 'AM' }, { label: 'BA', value: 'BA' }, { label: 'CE', value: 'CE' }, { label: 'DF', value: 'DF' }, { label: 'ES', value: 'ES' }, { label: 'GO', value: 'GO' }, { label: 'MA', value: 'MA' }, { label: 'MT', value: 'MT' }, { label: 'MS', value: 'MS' }, { label: 'MG', value: 'MG' }, { label: 'PA', value: 'PA' }, { label: 'PB', value: 'PB' }, { label: 'PR', value: 'PR' }, { label: 'PE', value: 'PE' }, { label: 'PI', value: 'PI' }, { label: 'RJ', value: 'RJ' }, { label: 'RN', value: 'RN' }, { label: 'RS', value: 'RS' }, { label: 'RO', value: 'RO' }, { label: 'RR', value: 'RR' }, { label: 'SC', value: 'SC' }, { label: 'SP', value: 'SP' }, { label: 'SE', value: 'SE' }, { label: 'TO', value: 'TO' }];

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
          options: SIM_NAO_OPTIONS,
          colSpan: 2
        },
        {
          name: 'pessoaDeficiencia',
          label: 'Pessoa com Deficiência?',
          type: 'select',
          options: SIM_NAO_OPTIONS,
          colSpan: 2
        },
        {
          name: 'beneficiarioCreditoPreferencial',
          label: 'Beneficiário de crédito preferencial por decisão jurídica?',
          type: 'select',
          options: SIM_NAO_OPTIONS,
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
          options: TIPO_DOCUMENTO_OPTIONS
        },
        {
          name: 'numeroDocumentoRepresentantePlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoRepresentante
        },
        {
          name: 'numeroDocumentoRepresentanteCPF',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '000.000.000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoRepresentanteCNPJ',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '00.000.000/0000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoRepresentanteRNE',
          label: 'Número do Documento',
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
          options: CATEGORIA_OAB_OPTIONS
        },
        {
          name: 'secaoOABRepresentante',
          label: 'Seção',
          type: 'select',
          required: true,
          options: SECAO_OAB_OPTIONS
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
          options: TIPO_DOCUMENTO_OPTIONS
        },
        {
          name: 'numeroDocumentoTitularCreditoPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoTitularCredito
        },
        {
          name: 'numeroDocumentoTitularCreditoCPF',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '000.000.000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoTitularCreditoCNPJ',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '00.000.000/0000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoTitularCreditoRNE',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: 'a000000-a',
          validation: { pattern: '^[A-Z]\\d{6}[A-Z]$', message: 'RNE inválido' },
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
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        },
        {
          name: 'numeroConta',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        }
      ]
    },
    {
      title: 'Procurador(es)',
      gridColumns: 3,
      fields: [
        {
          name: 'selecioneProcurador',
          label: 'Selecione o Procurador',
          type: 'select',
          colSpan: 3,
          options: procuradoresOptions,
          onChange: (value, context) => {
            const selected = procuradoresMock.find((p) => p.id === String(value));
            if (!selected) return;
            context.setMultipleValues({
              nomeProcurador: selected.nome,
              tipoDocumentoProcurador: selected.tipoDocumento,
              numeroDocumentoProcuradorCPF: selected.documentoCPF,
              numeroDocumentoProcuradorCNPJ: selected.documentoCNPJ,
              numeroDocumentoProcuradorRNE: selected.documentoRNE,
              numeroOABProcurador: selected.oab,
              categoriaOABProcurador: selected.categoria,
              secaoOABProcurador: selected.secao
            });
          }
        },
        {
          name: 'nomeProcurador',
          label: 'Nome do Procurador',
          type: 'text',
          colSpan: 1
        },
        {
          name: 'tipoDocumentoProcurador',
          label: 'Tipo de Documento',
          type: 'select',
          colSpan: 1,
          options: TIPO_DOCUMENTO_OPTIONS
        },
        {
          name: 'numeroDocumentoProcuradorPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          colSpan: 1,
          conditionalRender: ({ data }) => !data.tipoDocumentoProcurador
        },
        {
          name: 'numeroDocumentoProcuradorCPF',
          label: 'Número do Documento',
          type: 'text',
          mask: '000.000.000-00',
          colSpan: 1,
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoProcuradorCNPJ',
          label: 'Número do Documento',
          type: 'text',
          mask: '00.000.000/0000-00',
          colSpan: 1,
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoProcuradorRNE',
          label: 'Número do Documento',
          type: 'text',
          colSpan: 1,
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'RNE'
        },
        {
          name: 'numeroOABProcurador',
          label: 'Número da OAB',
          type: 'text',
          colSpan: 1
        },
        {
          name: 'categoriaOABProcurador',
          label: 'Categoria',
          type: 'select',
          colSpan: 1,
          options: CATEGORIA_OAB_OPTIONS
        },
        {
          name: 'secaoOABProcurador',
          label: 'Seção',
          type: 'select',
          colSpan: 1,
          options: SECAO_OAB_OPTIONS
        },
        {
          name: 'btnLimparProcurador',
          label: 'Limpar Formulário',
          type: 'button',
          buttonVariant: 'outlined',
          colSpan: 1,
          onButtonClick: (context) => context.setMultipleValues({
            selecioneProcurador: '',
            nomeProcurador: '',
            tipoDocumentoProcurador: '',
            numeroDocumentoProcuradorCPF: '',
            numeroDocumentoProcuradorCNPJ: '',
            numeroDocumentoProcuradorRNE: '',
            numeroOABProcurador: '',
            categoriaOABProcurador: '',
            secaoOABProcurador: ''
          })
        },
        {
          name: 'btnAdicionarProcurador',
          label: 'Adicionar Procurador',
          type: 'button',
          buttonVariant: 'contained',
          colSpan: 2,
          onButtonClick: (context) => {
            const formValues = context.getValues();
            const nome = String(formValues.nomeProcurador || '');
            const tipoDoc = String(formValues.tipoDocumentoProcurador || '');
            const docCpf = String(formValues.numeroDocumentoProcuradorCPF || '');
            const docCnpj = String(formValues.numeroDocumentoProcuradorCNPJ || '');
            const docRne = String(formValues.numeroDocumentoProcuradorRNE || '');
            const oab = String(formValues.numeroOABProcurador || '');
            const categoria = String(formValues.categoriaOABProcurador || '');
            const secao = String(formValues.secaoOABProcurador || '');

            if (!nome || !tipoDoc || (!docCpf && !docCnpj && !docRne)) return;

            const docNum = tipoDoc === 'CPF' ? docCpf : tipoDoc === 'CNPJ' ? docCnpj : docRne;
            const docFormatado = `${tipoDoc} - ${docNum}`;

            const novoProcurador = {
              id: Date.now().toString(),
              nome,
              documento: docFormatado,
              oab: oab || '-',
              categoria: categoria || '-',
              secao: secao || '-',
              rawData: { tipoDoc, docCpf, docCnpj, docRne }
            };

            const currentList = Array.isArray(formValues.tabelaProcuradores) ? formValues.tabelaProcuradores : [];

            context.setMultipleValues({
              tabelaProcuradores: [...currentList, novoProcurador],
              selecioneProcurador: '',
              nomeProcurador: '',
              tipoDocumentoProcurador: '',
              numeroDocumentoProcuradorCPF: '',
              numeroDocumentoProcuradorCNPJ: '',
              numeroDocumentoProcuradorRNE: '',
              numeroOABProcurador: '',
              categoriaOABProcurador: '',
              secaoOABProcurador: ''
            });
          }
        },
        {
          name: 'tabelaProcuradores',
          label: 'Procuradores Adicionados',
          type: 'table',
          colSpan: 3,
          conditionalRender: ({ data }) => Array.isArray(data.tabelaProcuradores) && data.tabelaProcuradores.length > 0,
          tableColumns: [
            { header: 'Nome', key: 'nome' },
            { header: 'Documento', key: 'documento' },
            { header: 'OAB', key: 'oab' },
            { header: 'Categoria', key: 'categoria' },
            { header: 'Seção', key: 'secao' }
          ],
          tableActions: [
            {
              label: 'Editar',
              icon: 'Edit',
              onClick: (row, context) => {
                const formValues = context.getValues();
                const currentList = Array.isArray(formValues.tabelaProcuradores) ? formValues.tabelaProcuradores : [];
                const newList = currentList.filter((p) => p.id !== row.id);
                const rawData = row.rawData as Record<string, string>;

                context.setMultipleValues({
                  tabelaProcuradores: newList,
                  selecioneProcurador: '',
                  nomeProcurador: String(row.nome || ''),
                  tipoDocumentoProcurador: rawData.tipoDoc,
                  numeroDocumentoProcuradorCPF: rawData.docCpf,
                  numeroDocumentoProcuradorCNPJ: rawData.docCnpj,
                  numeroDocumentoProcuradorRNE: rawData.docRne,
                  numeroOABProcurador: String(row.oab !== '-' ? row.oab : ''),
                  categoriaOABProcurador: String(row.categoria !== '-' ? row.categoria : ''),
                  secaoOABProcurador: String(row.secao !== '-' ? row.secao : '')
                });
              }
            },
            {
              label: 'Remover',
              icon: 'Delete',
              onClick: (row, context) => {
                const formValues = context.getValues();
                const currentList = Array.isArray(formValues.tabelaProcuradores) ? formValues.tabelaProcuradores : [];
                const newList = currentList.filter((p) => p.id !== row.id);
                context.setMultipleValues({ tabelaProcuradores: newList });
              }
            }
          ]
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