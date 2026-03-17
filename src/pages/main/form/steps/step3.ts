import dayjs from 'dayjs';

import { beneficiariesOptions, beneficiariesMock, procuradoresOptions, procuradoresMock, MOCK_SUBMIT_DELAY_MS } from '../mocks';

import type { ActionContext, FormConfig } from '@components/multiStepForm/types';

const SECAO_OAB_OPTIONS = [{ label: 'AC', value: 'AC' }, { label: 'AL', value: 'AL' }, { label: 'AP', value: 'AP' }, { label: 'AM', value: 'AM' }, { label: 'BA', value: 'BA' }, { label: 'CE', value: 'CE' }, { label: 'DF', value: 'DF' }, { label: 'ES', value: 'ES' }, { label: 'GO', value: 'GO' }, { label: 'MA', value: 'MA' }, { label: 'MT', value: 'MT' }, { label: 'MS', value: 'MS' }, { label: 'MG', value: 'MG' }, { label: 'PA', value: 'PA' }, { label: 'PB', value: 'PB' }, { label: 'PR', value: 'PR' }, { label: 'PE', value: 'PE' }, { label: 'PI', value: 'PI' }, { label: 'RJ', value: 'RJ' }, { label: 'RN', value: 'RN' }, { label: 'RS', value: 'RS' }, { label: 'RO', value: 'RO' }, { label: 'RR', value: 'RR' }, { label: 'SC', value: 'SC' }, { label: 'SP', value: 'SP' }, { label: 'SE', value: 'SE' }, { label: 'TO', value: 'TO' }];
const BANCOS_OPTIONS = [{ label: '001 - Banco do Brasil S.A.', value: '001' }, { label: '033 - Banco Santander (Brasil) S.A.', value: '033' }, { label: '077 - Banco Inter S.A.', value: '077' }, { label: '104 - Caixa Econômica Federal', value: '104' }, { label: '237 - Banco Bradesco S.A.', value: '237' }, { label: '260 - Nubank', value: '260' }, { label: '341 - Itaú Unibanco S.A.', value: '341' }];
const REGIME_PREVIDENCIARIO_OPTIONS = [{ label: 'Geral/INSS', value: 'GeralINSS' }, { label: 'Próprio', value: 'Proprio' }];
const CATEGORIA_OAB_OPTIONS = [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'E', value: 'E' }, { label: 'N', value: 'N' }];
const TIPO_DOCUMENTO_OPTIONS = [{ label: 'CPF', value: 'CPF' }, { label: 'CNPJ', value: 'CNPJ' }, { label: 'RNE N°', value: 'RNE' }];
const TIPO_CONTA_OPTIONS = [{ label: 'Conta Corrente', value: 'Corrente' }, { label: 'Conta Poupança', value: 'Poupanca' }];
const TITULAR_ADVOGADO_OPTIONS = [{ label: 'Procurador', value: 'Procurador' }, { label: 'Escritório de Advocacia', value: 'Escritorio' }];
const SIM_NAO_OPTIONS = [{ label: 'Sim', value: 'S' }, { label: 'Não', value: 'N' }];
const CURRENCY_MASK = 'R$ 000.000.000,00';

const calcularMesesRRA = (context: ActionContext): void => {
  const { dataInicialRRA, dataFinalRRA } = context.getValues();
  if (!dataInicialRRA || !dataFinalRRA) {
    context.setMultipleValues({ numeroMesesRRA: '' });
    return;
  }
  const start = dayjs(String(dataInicialRRA));
  const end = dayjs(String(dataFinalRRA));
  if (!start.isValid() || !end.isValid()) {
    context.setMultipleValues({ numeroMesesRRA: '' });
    return;
  }
  const diff = end.diff(start, 'month');
  context.setMultipleValues({ numeroMesesRRA: Math.max(0, diff) });
};

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
          options: BANCOS_OPTIONS
        },
        {
          name: 'tipoConta',
          label: 'Tipo de Conta',
          type: 'select',
          required: true,
          options: TIPO_CONTA_OPTIONS
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
    },
    {
      title: 'Dados Bancários do Advogado',
      gridColumns: 2,
      conditionalRender: ({ data }) => Array.isArray(data.tabelaProcuradores) && data.tabelaProcuradores.length > 0,
      fields: [
        {
          name: 'informarDadosBancariosAdvogado',
          label: 'Deseja informar dados bancários do advogado?',
          type: 'select',
          required: true,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'titularContaAdvogado',
          label: 'Titular da Conta',
          type: 'select',
          required: true,
          options: TITULAR_ADVOGADO_OPTIONS,
          conditionalRender: ({ data }) => data.informarDadosBancariosAdvogado === 'S'
        }
      ]
    },
    {
      title: 'Titular da Conta',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.informarDadosBancariosAdvogado === 'S' && !!data.titularContaAdvogado,
      fields: [
        {
          name: 'nomeTitularAdvogado',
          label: 'Nome do Titular',
          type: 'text',
          required: true
        },
        {
          name: 'tipoDocumentoTitularAdvogado',
          label: 'Tipo de Documento',
          type: 'select',
          required: true,
          options: TIPO_DOCUMENTO_OPTIONS
        },
        {
          name: 'numeroDocumentoTitularAdvogadoPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoTitularAdvogado
        },
        {
          name: 'numeroDocumentoTitularAdvogadoCPF',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '000.000.000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularAdvogado === 'CPF',
          validation: { pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$', message: 'CPF inválido' }
        },
        {
          name: 'numeroDocumentoTitularAdvogadoCNPJ',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: '00.000.000/0000-00',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularAdvogado === 'CNPJ',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'numeroDocumentoTitularAdvogadoRNE',
          label: 'Número do Documento',
          type: 'text',
          required: true,
          mask: 'a000000-a',
          validation: { pattern: '^[A-Z]\\d{6}[A-Z]$', message: 'RNE inválido' },
          conditionalRender: ({ data }) => data.tipoDocumentoTitularAdvogado === 'RNE'
        }
      ]
    },
    {
      gridColumns: 2,
      conditionalRender: ({ data }) => data.informarDadosBancariosAdvogado === 'S',
      fields: [
        {
          name: 'bancoTitularAdvogado',
          label: 'Banco do Titular',
          type: 'select',
          required: true,
          options: BANCOS_OPTIONS
        },
        {
          name: 'tipoContaAdvogado',
          label: 'Tipo de Conta',
          type: 'select',
          required: true,
          options: TIPO_CONTA_OPTIONS
        },
        {
          name: 'agenciaContaAdvogado',
          label: 'Agência',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        },
        {
          name: 'numeroContaAdvogado',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        }
      ]
    },
    {
      title: 'Valor Devido ao Titular',
      gridColumns: 6,
      fields: [
        {
          name: 'valorPrincipalCorrigido',
          label: 'Valor Principal Corrigido',
          type: 'text',
          required: true,
          colSpan: 3,
          mask: CURRENCY_MASK
        },
        {
          name: 'dataLiquidacao',
          label: 'Data de Liquidação',
          type: 'date',
          required: true,
          colSpan: 3
        },
        {
          name: 'haJurosMoratorios',
          label: 'Há juros moratórios?',
          type: 'select',
          required: true,
          colSpan: 3,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'valorJurosMoratorios',
          label: 'Valor dos Juros Moratórios',
          type: 'text',
          required: true,
          colSpan: 3,
          mask: CURRENCY_MASK,
          conditionalRender: ({ data }) => data.haJurosMoratorios === 'S'
        },
        {
          name: 'spacerJurosMoratorios',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.haJurosMoratorios !== 'S'
        },
        {
          name: 'haJurosCompensatorios',
          label: 'Há incidência de juros compensatórios (remuneratórios)?',
          type: 'select',
          required: true,
          colSpan: 3,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'valorJurosCompensatorios',
          label: 'Valor dos Juros Compensatórios',
          type: 'text',
          required: true,
          colSpan: 3,
          mask: CURRENCY_MASK,
          conditionalRender: ({ data }) => data.haJurosCompensatorios === 'S'
        },
        {
          name: 'spacerJurosCompensatorios',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.haJurosCompensatorios !== 'S'
        },
        {
          name: 'haCustasDespesasMulta',
          label: 'Há custas/despesas antecipadas/multa?',
          type: 'select',
          required: true,
          colSpan: 3,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'valorCustasDespesasMulta',
          label: 'Valor das Custas/Despesas/Multa',
          type: 'text',
          required: true,
          colSpan: 3,
          mask: CURRENCY_MASK,
          conditionalRender: ({ data }) => data.haCustasDespesasMulta === 'S'
        },
        {
          name: 'spacerCustasDespesasMulta',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.haCustasDespesasMulta !== 'S'
        },
        {
          name: 'haDescontoPrevidenciario',
          label: 'Há desconto previdenciário?',
          type: 'select',
          required: true,
          colSpan: 2,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'valorDescontoPrevidenciario',
          label: 'Valor do Desconto Previdenciário',
          type: 'text',
          required: true,
          colSpan: 2,
          mask: CURRENCY_MASK
        },
        {
          name: 'regimePrevidenciario',
          label: 'Regime previdenciário',
          type: 'select',
          required: true,
          colSpan: 2,
          options: REGIME_PREVIDENCIARIO_OPTIONS
        }
      ]
    },
    {
      title: 'Regime Previdenciário Próprio',
      highlight: true,
      gridColumns: 6,
      conditionalRender: ({ data }) => data.regimePrevidenciario === 'Proprio',
      fields: [
        {
          name: 'nomeOrgaoPrevidenciario',
          label: 'Nome do órgão previdenciário',
          type: 'text',
          required: true,
          colSpan: 2
        },
        {
          name: 'cnpjOrgaoPrevidenciario',
          label: 'CNPJ',
          type: 'text',
          required: true,
          colSpan: 2,
          mask: '00.000.000/0000-00',
          validation: { pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$', message: 'CNPJ inválido' }
        },
        {
          name: 'informarDadosBancariosOrgao',
          label: 'Deseja informar os dados bancários do órgão previdenciário?',
          type: 'select',
          required: true,
          colSpan: 2,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'bancoOrgao',
          label: 'Banco do Titular',
          type: 'select',
          required: true,
          colSpan: 3,
          options: BANCOS_OPTIONS,
          conditionalRender: ({ data }) => data.informarDadosBancariosOrgao === 'S'
        },
        {
          name: 'tipoContaOrgao',
          label: 'Tipo de Conta',
          type: 'select',
          required: true,
          colSpan: 3,
          options: TIPO_CONTA_OPTIONS,
          conditionalRender: ({ data }) => data.informarDadosBancariosOrgao === 'S'
        },
        {
          name: 'agenciaOrgao',
          label: 'Agência',
          type: 'text',
          required: true,
          colSpan: 3,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' },
          conditionalRender: ({ data }) => data.informarDadosBancariosOrgao === 'S'
        },
        {
          name: 'numeroContaOrgao',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          colSpan: 3,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' },
          conditionalRender: ({ data }) => data.informarDadosBancariosOrgao === 'S'
        }
      ]
    },
    {
      gridColumns: 2,
      fields: [
        {
          name: 'valorAssistenciaMedica',
          label: 'Valor da Assistência Médica',
          type: 'text',
          colSpan: 1,
          mask: CURRENCY_MASK
        },
        {
          name: 'valorFundoAposentadoria',
          label: 'Valor do Fundo de Aposentadoria',
          type: 'text',
          colSpan: 1,
          mask: CURRENCY_MASK
        },
        {
          name: 'haIncidenciaITCD',
          label: 'Há incidência de ITCD?',
          type: 'select',
          required: true,
          colSpan: 1,
          options: SIM_NAO_OPTIONS
        },
        {
          name: 'percentualAliquotaITCD',
          label: 'Percentual / Alíquota',
          type: 'text',
          required: true,
          colSpan: 1,
          mask: '0000,00%',
          conditionalRender: ({ data }) => data.haIncidenciaITCD === 'S'
        },
        {
          name: 'spacerITCD',
          label: ' ',
          type: 'info',
          colSpan: 1,
          conditionalRender: ({ data }) => data.haIncidenciaITCD !== 'S'
        },
        {
          name: 'haTributacaoRRA',
          label: 'Há tributação RRA a título de imposto de renda com incidência de imposto de renda?',
          type: 'select',
          required: true,
          colSpan: 2,
          options: SIM_NAO_OPTIONS
        }
      ]
    },
    {
      title: 'Tributação RRA a título de imposto de renda',
      highlight: true,
      gridColumns: 2,
      conditionalRender: ({ data }) => data.haTributacaoRRA === 'S',
      fields: [
        {
          name: 'dataInicialRRA',
          label: 'Período Inicial',
          type: 'date',
          required: true,
          colSpan: 1,
          onChange: (_, context) => calcularMesesRRA(context)
        },
        {
          name: 'dataFinalRRA',
          label: 'Período Final',
          type: 'date',
          required: true,
          colSpan: 1,
          onChange: (_, context) => calcularMesesRRA(context)
        },
        {
          name: 'parcelas13RRA',
          label: 'Número de parcelas do 13° (se houver)',
          type: 'number',
          colSpan: 1
        },
        {
          name: 'numeroMesesRRA',
          label: 'Número de meses (NM) a que se refere a tributação RRA',
          type: 'number',
          readOnly: true,
          colSpan: 1
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