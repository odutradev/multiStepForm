import { stepOneAutoFillMock, fetchSubjects, fetchCourts, fetchUsers } from "./mock";

import type { FormConfig } from "@components/multiStepForm/types";

const MOCK_SUBMIT_DELAY_MS = 2000;
const MOCK_DELAY_MS = 1500;

export const mockFormConfig: FormConfig = {
  steps: [
    {
      id: "step-1",
      title: "Cadastrar Processo",
      groups: [
        {
          gridColumns: 2,
          fields: [
            {
              name: "numeroProcesso",
              label: "Número do processo",
              type: "text",
              required: true,
              mask: "0000000-00.0000.0.00.0000",
              validation: {
                pattern: "^\\d{7}-\\d{2}\\.\\d{4}\\.\\d\\.\\d{2}\\.\\d{4}$",
                message: "Número do processo inválido",
              },
            },
            {
              name: "tipoJustica",
              label: "Instância",
              type: "select",
              required: true,
              options: [
                {
                  label: "Justiça Comum 1ª Instância",
                  value: "JUSTICA_COMUM_1_INSTANCIA",
                },
                {
                  label: "Justiça Comum 2ª Instância",
                  value: "JUSTICA_COMUM_2_INSTANCIA",
                },
              ],
            },
          ],
        },
      ],
      actions: [
        {
          label: "Buscar e Avançar",
          actionType: "next",
          onClick: async (context) => {
            await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
            context.setMultipleValues(stepOneAutoFillMock, true);
          },
        },
      ],
    },
    {
      id: "step-2",
      title: "Informações Gerais",
      groups: [
        {
          title: "Magistrado Responsável",
          gridColumns: 2,
          fields: [
            {
              name: "matriculaMagistrado",
              label: "Matrícula do magistrado",
              type: "text",
              required: true,
              mask: "a-0000000",
              icon: "Search",
              validation: {
                pattern: "^[A-Z]-\\d{7}$",
                message: "Matrícula inválida",
              },
              searchConfig: {
                title: "Buscar Magistrado",
                initialFilterName: "registration",
                pagination: true,
                fields: [
                  { name: "name", label: "Nome do Magistrado", type: "text" },
                  {
                    name: "registration",
                    label: "Matrícula",
                    type: "text",
                    mask: "a-0000000",
                  },
                ],
                columns: [
                  { header: "Matrícula", key: "registration" },
                  { header: "Nome", key: "name" },
                ],
                onSearch: fetchUsers,
                onSelect: (item, context) =>
                  context.setMultipleValues(
                    {
                      matriculaMagistrado: item.registration,
                      nomeMagistrado: item.name,
                    },
                    true,
                  ),
              },
            },
            {
              name: "nomeMagistrado",
              label: "Nome do magistrado",
              type: "text",
              required: true,
              readOnly: true,
            },
          ],
        },
        {
          title: "Selecione o Gerente da Secretaria",
          gridColumns: 2,
          fields: [
            {
              name: "matriculaGerenteDaSecretaria",
              label: "Matrícula do gerente da secretaria",
              type: "text",
              required: true,
              mask: "a-0000000",
              icon: "Search",
              validation: {
                pattern: "^[A-Z]-\\d{7}$",
                message: "Matrícula inválida",
              },
              searchConfig: {
                title: "Buscar Gerente da Secretaria",
                initialFilterName: "registration",
                pagination: true,
                fields: [
                  { name: "name", label: "Nome do Gerente", type: "text" },
                  {
                    name: "registration",
                    label: "Matrícula",
                    type: "text",
                    mask: "a-0000000",
                  },
                ],
                columns: [
                  { header: "Matrícula", key: "registration" },
                  { header: "Nome", key: "name" },
                ],
                onSearch: fetchUsers,
                onSelect: (item, context) =>
                  context.setMultipleValues(
                    {
                      matriculaGerenteDaSecretaria: item.registration,
                      nomeGerenteDaSecretaria: item.name,
                    },
                    true,
                  ),
              },
            },
            {
              name: "nomeGerenteDaSecretaria",
              label: "Nome do gerente da secretaria",
              type: "text",
              readOnly: true,
              required: true,
            },
          ],
        },
        {
          title: "Dados da Requisição",
          gridColumns: 2,
          fields: [
            {
              name: "codigoDaVara",
              label: "Código da vara",
              type: "text",
              required: true,
              icon: "Search",
              mask: "000000000",
              validation: {
                pattern: "^\\d{9}$",
                message: "O código deve conter exatamente 9 dígitos numéricos",
              },
              searchConfig: {
                title: "Buscar Vara",
                initialFilterName: "code",
                pagination: true,
                fields: [
                  { name: "name", label: "Nome da Vara", type: "text" },
                  {
                    name: "code",
                    label: "Código da Vara",
                    type: "text",
                    mask: "000000000",
                  },
                ],
                columns: [
                  { header: "Código", key: "code" },
                  { header: "Nome", key: "name" },
                ],
                onSearch: fetchCourts,
                onSelect: (item, context) =>
                  context.setMultipleValues(
                    { codigoDaVara: item.code, nomeDaVara: item.name },
                    true,
                  ),
              },
            },
            {
              name: "nomeDaVara",
              label: "Nome da vara",
              type: "text",
              required: true,
              readOnly: true,
            },
          ],
        },
        {
          title: "Informações Processuais",
          gridColumns: 3,
          fields: [
            {
              name: "numeroUnicoProcessoJudicialCNJ",
              label: "Numeração única do processo judicial (CNJ)",
              type: "text",
              required: true,
              readOnly: true,
              mask: "0000000-00.0000.0.00.0000",
            },
            {
              name: "numeroOriginarioAnterior",
              label: "Número originário anterior (se houver)",
              type: "text",
              mask: "0000000-00.0000.0.00.0000",
            },
            {
              name: "houveProcessoDeConhecimento",
              label: "Houve processo de conhecimento?",
              type: "select",
              required: true,
              options: [
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
              ],
            },
          ],
        },
        {
          title: "Processo de Conhecimento",
          highlight: true,
          gridColumns: 2,
          conditionalRender: (context) =>
            context.data.houveProcessoDeConhecimento === "sim",
          fields: [
            {
              name: "dataAjuizamentoDoProcessoDeConhecimento",
              label: "Data de ajuizamento do processo de conhecimento",
              type: "date",
              required: true,
            },
            {
              name: "dataCitacaoDoProcessoDeConhecimento",
              label: "Data da citação do processo de conhecimento",
              type: "date",
              required: true,
            },
            {
              name: "dataTransitoJulgadoDoProcessoDeConhecimento",
              label: "Data do trânsito em julgado",
              type: "select",
              required: true,
              options: [
                {
                  label: "Data do trânsito em julgado da sentença",
                  value: "dataTransitoSentenca",
                },
                {
                  label: "Data do trânsito em julgado do acórdão",
                  value: "dataTransitoAcordao",
                },
              ],
            },
            {
              name: "dataTransitoEmJulgadoDaSentenca",
              label:
                "Data do trânsito em julgado da sentença da fase de conhecimento",
              type: "date",
              required: true,
              conditionalRender: (context) =>
                context.data.dataTransitoJulgadoDoProcessoDeConhecimento ===
                "dataTransitoSentenca",
            },
            {
              name: "dataTransitoEmJulgadoDoAcordao",
              label:
                "Data do trânsito em julgado do acórdão lavrado na fase de conhecimento",
              type: "date",
              required: true,
              conditionalRender: (context) =>
                context.data.dataTransitoJulgadoDoProcessoDeConhecimento ===
                "dataTransitoAcordao",
            },
          ],
        },
        {
          gridColumns: 2,
          fields: [
            {
              name: "houveEmbargosOuImpugnacao",
              label:
                "Houve embargos à execução ou impugnação ao cálculo no cumprimento de sentença?",
              type: "select",
              required: true,
              options: [
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
              ],
            },
            {
              name: "dataTransitoEmJulgadoDosEmbargos",
              label: "Data do trânsito em julgado dos embargos à execução",
              type: "date",
              required: false,
              conditionalRender: (context) =>
                context.data.houveEmbargosOuImpugnacao === "sim",
            },
            {
              name: "dataDecursoDePrazoDosEmbargos",
              label:
                "Data do decurso de prazo para apresentação dos embargos à execução",
              type: "date",
              required: false,
              conditionalRender: (context) =>
                context.data.houveEmbargosOuImpugnacao === "nao",
            },
          ],
        },
        {
          title: "Informações sobre a Requisição",
          gridColumns: 2,
          fields: [
            {
              name: "naturezaCredito",
              label: "Natureza do crédito",
              type: "select",
              required: true,
              options: [
                { label: "Alimentar", value: "alimentar" },
                { label: "Comum", value: "comum" },
              ],
            },
            {
              name: "dataIntimacao",
              label:
                "Data da intimação das partes quanto ao inteiro teor do Formulário Ofício Precatório",
              type: "date",
              mask: "00/00/0000",
              validation: {
                pattern: "^\\d{2}/\\d{2}/\\d{4}$",
                message: "Data inválida. Use o formato DD/MM/AAAA",
              },
              required: false,
              disabled: false,
              icon: "CalendarToday",
            },
          ],
        },
        {
          gridColumns: 3,
          fields: [
            {
              type: "select",
              name: "naturezaSalarial",
              label: "Ação de natureza salarial?",
              required: true,
              options: [
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ],
              colSpan: 1,
            },
            {
              type: "select",
              name: "condicaoNaturezaSalarial",
              label: "Condição",
              required: true,
              colSpan: 1,
              options: [
                { label: "Ativo", value: "Ativo" },
                { label: "Inativo", value: "Inativo" },
                { label: "Pensionista", value: "Pensionista" },
              ],
              conditionalRender: (context) =>
                context.data?.naturezaSalarial === "Sim",
            },
            {
              type: "text",
              name: "orgaoVinculado",
              label:
                "Órgão a que estiver vinculado o empregado ou servidor publico, civil ou militar, da administração direta",
              required: true,
              colSpan: 1,
              conditionalRender: (context) =>
                context.data?.naturezaSalarial === "Sim",
            },
          ],
        },
        {
          gridColumns: 2,
          fields: [
            {
              name: "assuntoCod",
              label: "Código do assunto",
              type: "text",
              required: true,
              mask: "00000000",
              icon: "Search",
              validation: {
                pattern: "^\\d{1,8}$",
                message: "Máximo 8 dígitos",
              },
              searchConfig: {
                title: "Buscar Assunto",
                viewMode: "tree",
                treeConfig: {
                  labelKey: "description",
                  valueKey: "code",
                  childrenKey: "children"
                },
                initialFilterName: "code",
                pagination: false,
                fields: [
                  { name: "code", label: "Código do Assunto", type: "text" },
                  { name: "description", label: "Descrição", type: "text" },
                ],
                columns: [],
                onSearch: fetchSubjects,
                onSelect: (item, context) =>
                  context.setMultipleValues(
                    {
                      assuntoCod: item.code,
                      assuntoDescricao: item.description,
                    },
                    true,
                  ),
              },
            },
            {
              name: "assuntoDescricao",
              label: "Descrição do assunto",
              type: "text",
              required: true,
              readOnly: true,
            },
          ],
        },
        {
          title: "Informações sobre o(s) Beneficiário(s) do Precatório",
          gridColumns: 3,
          fields: [
            {
              type: "select",
              name: "beneficiario",
              label: "A requisição será expedida em favor de qual beneficiário?",
              required: true,
              options: [
                { label: "Beneficiário Principal", value: "Beneficiário Principal" },
                { label: "Honorários Sucumbenciais", value: "Honorários Sucumbenciais" },
                { label: "Honorários Periciais", value: "Honorários Periciais" }
              ],
              colSpan: 1
            },
            {
              type: "select",
              name: "existeDestaque",
              label: "Existe a previsão de destaque de honorários contratuais?",
              options: [
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" }
              ],
              required: true,
              disabled: false,
              colSpan: 2,
              conditionalRender: (context) => context.data?.beneficiario === "Beneficiário Principal"
            }
          ]
        }
      ],
      actions: [
        { label: "Voltar", actionType: "prev", variant: "outlined" },
        {
          label: "Confirmar e Enviar",
          actionType: "submit",
          onClick: async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, MOCK_SUBMIT_DELAY_MS),
            );
          },
        },
      ],
    },
  ],
};