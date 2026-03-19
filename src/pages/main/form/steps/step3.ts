import { beneficiariesOptions, beneficiariesMock, procuradoresOptions, procuradoresMock, MOCK_SUBMIT_DELAY_MS } from '../mocks';
import { calculateGrossValue, calculateRRAMonths } from '../utils';
import { step3TestData } from '../tests/step3';

import type { FormConfig } from '@components/multiStepForm/types';

export const step3: FormConfig['steps'][number] = {
  id: 'step-3',
  title: 'Beneficiário',
  testData: step3TestData,
  groups: [
    {
      title: 'Seleção de Beneficiário',
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
          name: 'idBeneficiarioSelecionado',
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
      title: 'Dados Pessoais do Beneficiário',
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
          disableFuture: true,
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
          name: 'numeroInscricaoSocial',
          label: 'Número PIX / PASEP ou NIT',
          type: 'text',
          colSpan: 2
        },
        {
          name: 'possuiDoencaGrave',
          label: 'Doença Grave?',
          colSpan: 2,
          preSet: 'simNao'
        },
        {
          name: 'possuiDeficiencia',
          label: 'Pessoa com Deficiência?',
          colSpan: 2,
          preSet: 'simNao'
        },
        {
          name: 'possuiCreditoPreferencial',
          label: 'Beneficiário de crédito preferencial por decisão jurídica?',
          colSpan: 2,
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Condição do Beneficiário',
      gridColumns: 1,
      fields: [
        {
          name: 'condicaoCapacidadeBeneficiario',
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
      conditionalRender: ({ data }) => !!data.condicaoCapacidadeBeneficiario && data.condicaoCapacidadeBeneficiario !== 'NaoSeAplica',
      fields: [
        {
          name: 'nomeRepresentanteLegal',
          label: 'Nome do Representante Legal',
          type: 'text',
          required: true
        },
        {
          name: 'tipoDocumentoRepresentanteLegal',
          label: 'Tipo de Documento',
          required: true,
          preSet: 'tipoDocumento'
        },
        {
          name: 'documentoRepresentanteLegalPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoRepresentanteLegal
        },
        {
          name: 'cpfRepresentanteLegal',
          label: 'Número do Documento',
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentanteLegal === 'CPF'
        },
        {
          name: 'cnpjRepresentanteLegal',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentanteLegal === 'CNPJ'
        },
        {
          name: 'rneRepresentanteLegal',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoRepresentanteLegal === 'RNE'
        },
        {
          name: 'numeroOabRepresentanteLegal',
          label: 'Número da OAB (se for o caso)',
          type: 'text'
        },
        {
          name: 'categoriaOabRepresentanteLegal',
          label: 'Categoria',
          required: true,
          preSet: 'categoriaOab'
        },
        {
          name: 'secaoOabRepresentanteLegal',
          label: 'Seção',
          required: true,
          preSet: 'estados'
        }
      ]
    },
    {
      title: 'Titularidade Bancária do Beneficiário',
      gridColumns: 2,
      fields: [
        {
          name: 'titularContaBancaria',
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
      title: 'Dados Bancários do Titular',
      highlight: true,
      gridColumns: 2,
      conditionalRender: ({ data }) => data.titularContaBancaria === 'BeneficiarioCredito',
      fields: [
        {
          name: 'tipoDocumentoTitularBancario',
          label: 'Tipo de Documento',
          required: true,
          preSet: 'tipoDocumento'
        },
        {
          name: 'documentoTitularBancarioPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoTitularBancario
        },
        {
          name: 'cpfTitularBancario',
          label: 'Número do Documento',
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancario === 'CPF'
        },
        {
          name: 'cnpjTitularBancario',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancario === 'CNPJ'
        },
        {
          name: 'rneTitularBancario',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancario === 'RNE'
        }
      ]
    },
    {
      title: 'Informações da Conta Bancária',
      gridColumns: 2,
      fields: [
        {
          name: 'codigoBancoTitular',
          label: 'Banco do Titular',
          required: true,
          preSet: 'bancos'
        },
        {
          name: 'tipoContaBancariaTitular',
          label: 'Tipo de Conta',
          required: true,
          preSet: 'tipoConta'
        },
        {
          name: 'agenciaBancariaTitular',
          label: 'Agência',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        },
        {
          name: 'numeroContaBancariaTitular',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        }
      ]
    },
    {
      title: 'Procuradores do Beneficiário',
      gridColumns: 3,
      fields: [
        {
          name: 'idProcuradorSelecionado',
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
              cpfProcurador: selected.documentoCPF,
              cnpjProcurador: selected.documentoCNPJ,
              rneProcurador: selected.documentoRNE,
              numeroOabProcurador: selected.oab,
              categoriaOabProcurador: selected.categoria,
              secaoOabProcurador: selected.secao
            });
          }
        },
        {
          name: 'nomeProcurador',
          label: 'Nome do Procurador',
          type: 'text',
        },
        {
          name: 'tipoDocumentoProcurador',
          label: 'Tipo de Documento',
          preSet: 'tipoDocumento'
        },
        {
          name: 'documentoProcuradorPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoProcurador
        },
        {
          name: 'cpfProcurador',
          label: 'Número do Documento',
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CPF'
        },
        {
          name: 'cnpjProcurador',
          label: 'Número do Documento',
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'CNPJ'
        },
        {
          name: 'rneProcurador',
          label: 'Número do Documento',
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoProcurador === 'RNE'
        },
        {
          name: 'numeroOabProcurador',
          label: 'Número da OAB',
          type: 'text',
        },
        {
          name: 'categoriaOabProcurador',
          label: 'Categoria',
          preSet: 'categoriaOab'
        },
        {
          name: 'secaoOabProcurador',
          label: 'Seção',
          preSet: 'estados'
        },
        {
          name: 'acaoLimparProcurador',
          label: 'Limpar Formulário',
          type: 'button',
          buttonVariant: 'outlined',
          onButtonClick: (context) => context.setMultipleValues({
            idProcuradorSelecionado: '',
            nomeProcurador: '',
            tipoDocumentoProcurador: '',
            cpfProcurador: '',
            cnpjProcurador: '',
            rneProcurador: '',
            numeroOabProcurador: '',
            categoriaOabProcurador: '',
            secaoOabProcurador: ''
          })
        },
        {
          name: 'acaoAdicionarProcurador',
          label: 'Adicionar Procurador',
          type: 'button',
          buttonVariant: 'contained',
          colSpan: 2,
          onButtonClick: (context) => {
            const formValues = context.getValues();
            const nome = String(formValues.nomeProcurador || '');
            const tipoDoc = String(formValues.tipoDocumentoProcurador || '');
            const docCpf = String(formValues.cpfProcurador || '');
            const docCnpj = String(formValues.cnpjProcurador || '');
            const docRne = String(formValues.rneProcurador || '');
            const oab = String(formValues.numeroOabProcurador || '');
            const categoria = String(formValues.categoriaOabProcurador || '');
            const secao = String(formValues.secaoOabProcurador || '');

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

            const currentList = Array.isArray(formValues.listaProcuradoresAdicionados) ? formValues.listaProcuradoresAdicionados : [];

            context.setMultipleValues({
              listaProcuradoresAdicionados: [...currentList, novoProcurador],
              idProcuradorSelecionado: '',
              nomeProcurador: '',
              tipoDocumentoProcurador: '',
              cpfProcurador: '',
              cnpjProcurador: '',
              rneProcurador: '',
              numeroOabProcurador: '',
              categoriaOabProcurador: '',
              secaoOabProcurador: ''
            });
          }
        },
        {
          name: 'listaProcuradoresAdicionados',
          label: 'Procuradores Adicionados',
          type: 'table',
          colSpan: 3,
          conditionalRender: ({ data }) => Array.isArray(data.listaProcuradoresAdicionados) && data.listaProcuradoresAdicionados.length > 0,
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
                const currentList = Array.isArray(formValues.listaProcuradoresAdicionados) ? formValues.listaProcuradoresAdicionados : [];
                const newList = currentList.filter((p) => p.id !== row.id);
                const rawData = row.rawData as Record<string, string>;

                context.setMultipleValues({
                  listaProcuradoresAdicionados: newList,
                  idProcuradorSelecionado: '',
                  nomeProcurador: String(row.nome || ''),
                  tipoDocumentoProcurador: rawData.tipoDoc,
                  cpfProcurador: rawData.docCpf,
                  cnpjProcurador: rawData.docCnpj,
                  rneProcurador: rawData.docRne,
                  numeroOabProcurador: String(row.oab !== '-' ? row.oab : ''),
                  categoriaOabProcurador: String(row.categoria !== '-' ? row.categoria : ''),
                  secaoOabProcurador: String(row.secao !== '-' ? row.secao : '')
                });
              }
            },
            {
              label: 'Remover',
              icon: 'Delete',
              onClick: (row, context) => {
                const formValues = context.getValues();
                const currentList = Array.isArray(formValues.listaProcuradoresAdicionados) ? formValues.listaProcuradoresAdicionados : [];
                const newList = currentList.filter((p) => p.id !== row.id);
                context.setMultipleValues({ listaProcuradoresAdicionados: newList });
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Dados Bancários dos Procuradores',
      gridColumns: 2,
      conditionalRender: ({ data }) => Array.isArray(data.listaProcuradoresAdicionados) && data.listaProcuradoresAdicionados.length > 0,
      fields: [
        {
          name: 'possuiDadosBancariosProcurador',
          label: 'Deseja informar dados bancários do advogado?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'titularContaBancariaProcurador',
          label: 'Titular da Conta',
          required: true,
          preSet: 'titularAdvogado',
          conditionalRender: ({ data }) => data.possuiDadosBancariosProcurador === 'Sim'
        }
      ]
    },
    {
      title: 'Dados Bancários do Titular (Procurador)',
      highlight: true,
      gridColumns: 3,
      conditionalRender: ({ data }) => data.possuiDadosBancariosProcurador === 'Sim' && !!data.titularContaBancariaProcurador,
      fields: [
        {
          name: 'nomeTitularBancarioProcurador',
          label: 'Nome do Titular',
          type: 'text',
          required: true
        },
        {
          name: 'tipoDocumentoTitularBancarioProcurador',
          label: 'Tipo de Documento',
          required: true,
          preSet: 'tipoDocumento'
        },
        {
          name: 'documentoTitularBancarioProcuradorPlaceholder',
          label: 'Número do Documento',
          type: 'text',
          disabled: true,
          conditionalRender: ({ data }) => !data.tipoDocumentoTitularBancarioProcurador
        },
        {
          name: 'cpfTitularBancarioProcurador',
          label: 'Número do Documento',
          required: true,
          preSet: 'cpf',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancarioProcurador === 'CPF'
        },
        {
          name: 'cnpjTitularBancarioProcurador',
          label: 'Número do Documento',
          required: true,
          preSet: 'cnpj',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancarioProcurador === 'CNPJ'
        },
        {
          name: 'rneTitularBancarioProcurador',
          label: 'Número do Documento',
          required: true,
          preSet: 'rne',
          conditionalRender: ({ data }) => data.tipoDocumentoTitularBancarioProcurador === 'RNE'
        }
      ]
    },
    {
      title: 'Informações da Conta Bancária (Procurador)',
      gridColumns: 2,
      conditionalRender: ({ data }) => data.possuiDadosBancariosProcurador === 'Sim',
      fields: [
        {
          name: 'codigoBancoProcurador',
          label: 'Banco do Titular',
          required: true,
          preSet: 'bancos'
        },
        {
          name: 'tipoContaBancariaProcurador',
          label: 'Tipo de Conta',
          required: true,
          preSet: 'tipoConta'
        },
        {
          name: 'agenciaBancariaProcurador',
          label: 'Agência',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        },
        {
          name: 'numeroContaBancariaProcurador',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' }
        }
      ]
    },
    {
      title: 'Valores e Deduções',
      gridColumns: 6,
      fields: [
        {
          name: 'valorPrincipalCorrigido',
          label: 'Valor Principal Corrigido',
          type: 'currency',
          required: true,
          colSpan: 3,
          onChange: (val, context) => calculateGrossValue(context, 'valorPrincipalCorrigido', val)
        },
        {
          name: 'dataLiquidacaoCalculo',
          label: 'Data de Liquidação',
          type: 'date',
          required: true,
          disableFuture: true,
          colSpan: 3
        },
        {
          name: 'possuiJurosMoratorios',
          label: 'Há juros moratórios?',
          required: true,
          colSpan: 3,
          preSet: 'simNao',
          onChange: (val, context) => calculateGrossValue(context, 'possuiJurosMoratorios', val)
        },
        {
          name: 'valorJurosMoratorios',
          label: 'Valor dos Juros Moratórios',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiJurosMoratorios === 'Sim',
          onChange: (val, context) => calculateGrossValue(context, 'valorJurosMoratorios', val)
        },
        {
          name: 'espacadorJurosMoratorios',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiJurosMoratorios !== 'Sim'
        },
        {
          name: 'possuiJurosCompensatorios',
          label: 'Há incidência de juros compensatórios (remuneratórios)?',
          required: true,
          colSpan: 3,
          preSet: 'simNao',
          onChange: (val, context) => calculateGrossValue(context, 'possuiJurosCompensatorios', val)
        },
        {
          name: 'valorJurosCompensatorios',
          label: 'Valor dos Juros Compensatórios',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiJurosCompensatorios === 'Sim',
          onChange: (val, context) => calculateGrossValue(context, 'valorJurosCompensatorios', val)
        },
        {
          name: 'espacadorJurosCompensatorios',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiJurosCompensatorios !== 'Sim'
        },
        {
          name: 'possuiCustasDespesasMulta',
          label: 'Há custas/despesas antecipadas/multa?',
          required: true,
          colSpan: 3,
          preSet: 'simNao',
          onChange: (val, context) => calculateGrossValue(context, 'possuiCustasDespesasMulta', val)
        },
        {
          name: 'valorCustasDespesasMulta',
          label: 'Valor das Custas/Despesas/Multa',
          type: 'currency',
          required: true,
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiCustasDespesasMulta === 'Sim',
          onChange: (val, context) => calculateGrossValue(context, 'valorCustasDespesasMulta', val)
        },
        {
          name: 'espacadorCustasDespesasMulta',
          label: ' ',
          type: 'info',
          colSpan: 3,
          conditionalRender: ({ data }) => data.possuiCustasDespesasMulta !== 'Sim'
        },
        {
          name: 'possuiDescontoPrevidenciario',
          label: 'Há desconto previdenciário?',
          required: true,
          colSpan: 2,
          preSet: 'simNao'
        },
        {
          name: 'valorDescontoPrevidenciario',
          label: 'Valor do Desconto Previdenciário',
          type: 'currency',
          required: true,
          colSpan: 2,
          conditionalRender: ({ data }) => data.possuiDescontoPrevidenciario === 'Sim'
        },
        {
          name: 'tipoRegimePrevidenciario',
          label: 'Regime previdenciário',
          required: true,
          colSpan: 2,
          preSet: 'regimePrevidenciario',
          conditionalRender: ({ data }) => data.possuiDescontoPrevidenciario === 'Sim'
        },
        {
          name: 'espacadorDescontoPrevidenciario',
          label: ' ',
          type: 'info',
          colSpan: 4,
          conditionalRender: ({ data }) => data.possuiDescontoPrevidenciario !== 'Sim'
        }
      ]
    },
    {
      title: 'Detalhes do Regime Previdenciário Próprio',
      highlight: true,
      gridColumns: 6,
      conditionalRender: ({ data }) => data.tipoRegimePrevidenciario === 'Proprio' && data.possuiDescontoPrevidenciario === 'Sim',
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
          name: 'possuiDadosBancariosOrgaoPrevidenciario',
          label: 'Deseja informar os dados bancários do órgão previdenciário?',
          required: true,
          colSpan: 2,
          preSet: 'simNao'
        },
        {
          name: 'codigoBancoOrgaoPrevidenciario',
          label: 'Banco do Titular',
          required: true,
          colSpan: 3,
          preSet: 'bancos',
          conditionalRender: ({ data }) => data.possuiDadosBancariosOrgaoPrevidenciario === 'Sim'
        },
        {
          name: 'tipoContaBancariaOrgaoPrevidenciario',
          label: 'Tipo de Conta',
          required: true,
          colSpan: 3,
          preSet: 'tipoConta',
          conditionalRender: ({ data }) => data.possuiDadosBancariosOrgaoPrevidenciario === 'Sim'
        },
        {
          name: 'agenciaBancariaOrgaoPrevidenciario',
          label: 'Agência',
          type: 'text',
          required: true,
          colSpan: 3,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' },
          conditionalRender: ({ data }) => data.possuiDadosBancariosOrgaoPrevidenciario === 'Sim'
        },
        {
          name: 'numeroContaBancariaOrgaoPrevidenciario',
          label: 'Número da Conta',
          type: 'text',
          required: true,
          colSpan: 3,
          validation: { pattern: '^\\d{1,20}$', message: 'Apenas números (máximo 20 dígitos)' },
          conditionalRender: ({ data }) => data.possuiDadosBancariosOrgaoPrevidenciario === 'Sim'
        }
      ]
    },
    {
      title: 'Outras Deduções e Impostos',
      gridColumns: 2,
      fields: [
        {
          name: 'valorAssistenciaMedica',
          label: 'Valor da Assistência Médica',
          type: 'currency',
        },
        {
          name: 'valorFundoAposentadoria',
          label: 'Valor do Fundo de Aposentadoria',
          type: 'currency',
        },
        {
          name: 'possuiIncidenciaItcd',
          label: 'Há incidência de ITCD?',
          required: true,
          preSet: 'simNao'
        },
        {
          name: 'percentualAliquotaItcd',
          label: 'Percentual / Alíquota',
          type: 'percentage',
          required: true,
          conditionalRender: ({ data }) => data.possuiIncidenciaItcd === 'Sim'
        },
        {
          name: 'espacadorItcd',
          label: ' ',
          type: 'info',
          conditionalRender: ({ data }) => data.possuiIncidenciaItcd !== 'Sim'
        },
        {
          name: 'possuiTributacaoRra',
          label: 'Há tributação RRA a título de imposto de renda com incidência de imposto de renda?',
          required: true,
          colSpan: 2,
          preSet: 'simNao'
        }
      ]
    },
    {
      title: 'Detalhes da Tributação RRA',
      highlight: true,
      gridColumns: 2,
      conditionalRender: ({ data }) => data.possuiTributacaoRra === 'Sim',
      fields: [
        {
          name: 'dataInicialTributacaoRra',
          label: 'Período Inicial',
          type: 'date',
          required: true,
          disableFuture: true,
          onChange: (_, context) => calculateRRAMonths(context)
        },
        {
          name: 'dataFinalTributacaoRra',
          label: 'Período Final',
          type: 'date',
          required: true,
          disableFuture: true,
          onChange: (_, context) => calculateRRAMonths(context)
        },
        {
          name: 'quantidadeParcelasDecimoTerceiroRra',
          label: 'Número de parcelas do 13° (se houver)',
          type: 'number',
        },
        {
          name: 'quantidadeMesesTributacaoRra',
          label: 'Número de meses (NM) a que se refere a tributação RRA',
          type: 'number',
          readOnly: true,
        }
      ]
    },
    {
      title: 'Resumo Financeiro',
      gridColumns: 1,
      fields: [
        {
          name: 'valorBrutoTotal',
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