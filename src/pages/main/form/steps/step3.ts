import dayjs from 'dayjs';

import { beneficiariesOptions, beneficiariesMock, procuradoresOptions, procuradoresMock, MOCK_SUBMIT_DELAY_MS } from '../mocks';

import type { ActionContext, FormConfig } from '@components/multiStepForm/types';

const PARSE_NUMBER_REGEX = /[^\d,]/g;

const parseCurrency = (value: unknown): number => {
  if (typeof value !== 'string') return 0;
  const cleanValue = value.replace(PARSE_NUMBER_REGEX, '').replace(',', '.');
  const parsedNumber = parseFloat(cleanValue);
  return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
};

const formatCurrency = (value: number): string => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const calcularValorBruto = (context: ActionContext, changedField?: string, newValue?: unknown): void => {
  const formValues = context.getValues();
  const getValue = (field: string) => (changedField === field ? newValue : formValues[field]);

  const principal = parseCurrency(getValue('valorPrincipalCorrigido'));
  const jurosMoratorios = getValue('haJurosMoratorios') === 'S' ? parseCurrency(getValue('valorJurosMoratorios')) : 0;
  const jurosCompensatorios = getValue('haJurosCompensatorios') === 'S' ? parseCurrency(getValue('valorJurosCompensatorios')) : 0;
  const custasDespesas = getValue('haCustasDespesasMulta') === 'S' ? parseCurrency(getValue('valorCustasDespesasMulta')) : 0;

  const valorTotal = principal + jurosMoratorios + jurosCompensatorios + custasDespesas;
  context.setMultipleValues({ valorBruto: formatCurrency(valorTotal) });
};

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
          colSpan: 2,
          preSet: 'simNaoSN'
        },
        {
          name: 'pessoaDeficiencia',
          label: 'Pessoa com Deficiência?',
          colSpan: 2,
          preSet: 'simNaoSN'
        },
        {
          name: 'beneficiarioCreditoPreferencial',
          label: 'Beneficiário de crédito preferencial por decisão jurídica?',
          colSpan: 2,
          preSet: 'simNaoSN'
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
          required: true,
          preSet: 'tipoDocumento'
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
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CPF'
        },
        {
          name: 'numeroDocumentoRepresentanteCNPJ',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentante === 'CNPJ'
        },
        {
          name: 'numeroDocumentoRepresentanteRNE',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
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
          required: true,
          preSet: 'categoriaOab'
        },
        {
          name: 'secaoOABRepresentante',
          label: 'Seção',
          required: true,
          preSet: 'estados'
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
          required: true,
          preSet: 'tipoDocumento'
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
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CPF'
        },
        {
          name: 'numeroDocumentoTitularCreditoCNPJ',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularCredito === 'CNPJ'
        },
        {
          name: 'numeroDocumentoTitularCreditoRNE',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
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
          required: true,
          preSet: 'bancos'
        },
        {
          name: 'tipoConta',
          label: 'Tipo de Conta',
          required: true,
          preSet: 'tipoConta'
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
          colSpan: 1,
          preSet: 'tipoDocumento'
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
          preSet: 'cpf',
          colSpan: 1,
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CPF'
        },
        {
          name: 'numeroDocumentoProcuradorCNPJ',
          label: 'Número do Documento',
          preSet: 'cnpj',
          colSpan: 1,
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CNPJ'
        },
        {
          name: 'numeroDocumentoProcuradorRNE',
          label: 'Número do Documento',
          preSet: 'rne',
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
          colSpan: 1,
          preSet: 'categoriaOab'
        },
        {
          name: 'secaoOABProcurador',
          label: 'Seção',
          colSpan: 1,
          preSet: 'estados'
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
          required: true,
          preSet: 'simNaoSN'
        },
        {
          name: 'titularContaAdvogado',
          label: 'Titular da Conta',
          required: true,
          preSet: 'titularAdvogado',
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
          required: true,
          preSet: 'tipoDocumento'
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
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularAdvogado === 'CPF'
        },
        {
          name: 'numeroDocumentoTitularAdvogadoCNPJ',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularAdvogado === 'CNPJ'
        },
        {
          name: 'numeroDocumentoTitularAdvogadoRNE',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
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
          required: true,
          preSet: 'bancos'
        },
        {
          name: 'tipoContaAdvogado',
          label: 'Tipo de Conta',
          required: true,
          preSet: 'tipoConta'
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
          type: 'currency',
          required: true,
          colSpan: 3,
          onChange: (val, context) => calcularValorBruto(context, 'valorPrincipalCorrigido', val)
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
          required: true,
          colSpan: 3,
          preSet: 'simNaoSN',
          onChange: (val, context) => calcularValorBruto(context, 'haJurosMoratorios', val)
        },
        {
          name: 'valorJurosMoratorios',
          label: 'Valor dos Juros Moratórios',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.haJurosMoratorios === 'S',
          onChange: (val, context) => calcularValorBruto(context, 'valorJurosMoratorios', val)
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
          required: true,
          colSpan: 3,
          preSet: 'simNaoSN',
          onChange: (val, context) => calcularValorBruto(context, 'haJurosCompensatorios', val)
        },
        {
          name: 'valorJurosCompensatorios',
          label: 'Valor dos Juros Compensatórios',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.haJurosCompensatorios === 'S',
          onChange: (val, context) => calcularValorBruto(context, 'valorJurosCompensatorios', val)
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
          required: true,
          colSpan: 3,
          preSet: 'simNaoSN',
          onChange: (val, context) => calcularValorBruto(context, 'haCustasDespesasMulta', val)
        },
        {
          name: 'valorCustasDespesasMulta',
          label: 'Valor das Custas/Despesas/Multa',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.haCustasDespesasMulta === 'S',
          onChange: (val, context) => calcularValorBruto(context, 'valorCustasDespesasMulta', val)
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
          required: true,
          colSpan: 2,
          preSet: 'simNaoSN'
        },
        {
          name: 'valorDescontoPrevidenciario',
          label: 'Valor do Desconto Previdenciário',
          type: 'currency',
          required: true,
          colSpan: 2
        },
        {
          name: 'regimePrevidenciario',
          label: 'Regime previdenciário',
          required: true,
          colSpan: 2,
          preSet: 'regimePrevidenciario'
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
          required: true,
          preSet: 'cnpj',
          colSpan: 2
        },
        {
          name: 'informarDadosBancariosOrgao',
          label: 'Deseja informar os dados bancários do órgão previdenciário?',
          required: true,
          colSpan: 2,
          preSet: 'simNaoSN'
        },
        {
          name: 'bancoOrgao',
          label: 'Banco do Titular',
          required: true,
          colSpan: 3,
          preSet: 'bancos',
          conditionalRender: ({ data }) => data.informarDadosBancariosOrgao === 'S'
        },
        {
          name: 'tipoContaOrgao',
          label: 'Tipo de Conta',
          required: true,
          colSpan: 3,
          preSet: 'tipoConta',
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
          type: 'currency',
          colSpan: 1
        },
        {
          name: 'valorFundoAposentadoria',
          label: 'Valor do Fundo de Aposentadoria',
          type: 'currency',
          colSpan: 1
        },
        {
          name: 'haIncidenciaITCD',
          label: 'Há incidência de ITCD?',
          required: true,
          colSpan: 1,
          preSet: 'simNaoSN'
        },
        {
          name: 'percentualAliquotaITCD',
          label: 'Percentual / Alíquota',
          type: 'percentage',
          required: true,
          colSpan: 1,
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
          required: true,
          colSpan: 2,
          preSet: 'simNaoSN'
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
    },
    {
      gridColumns: 1,
      fields: [
        {
          name: 'valorBruto',
          label: 'Valor Bruto',
          type: 'text',
          readOnly: true
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