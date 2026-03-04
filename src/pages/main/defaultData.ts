import { fetchUsers, fetchVaras, stepOneAutoFillMock } from "./mock";

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
                initialFilterName: "matricula",
                pagination: true,
                fields: [
                  { name: "nome", label: "Nome do Magistrado", type: "text" },
                  {
                    name: "matricula",
                    label: "Matrícula",
                    type: "text",
                    mask: "a-0000000",
                  },
                ],
                columns: [
                  { header: "Matrícula", key: "matricula" },
                  { header: "Nome", key: "nome" },
                ],
                onSearch: fetchUsers,
                onSelect: (item, context) => {
                  context.setMultipleValues(
                    {
                      matriculaMagistrado: item.matricula,
                      nomeMagistrado: item.nome,
                    },
                    true,
                  );
                },
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
                initialFilterName: "matriculaGerenteDaSecretaria",
                pagination: true,
                fields: [
                  { name: "nome", label: "Nome do Gerente", type: "text" },
                  {
                    name: "matricula",
                    label: "Matrícula",
                    type: "text",
                    mask: "S0000000",
                  },
                ],
                columns: [
                  { header: "Matrícula", key: "matricula" },
                  { header: "Nome", key: "nome" },
                ],
                onSearch: fetchUsers,
                onSelect: (item, context) => {
                  context.setMultipleValues(
                    {
                      matriculaGerenteDaSecretaria: item.matricula,
                      nomeGerenteDaSecretaria: item.nome,
                    },
                    true,
                  );
                },
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
              searchConfig: {
                title: "Buscar Vara",
                initialFilterName: "codigo",
                pagination: true,
                fields: [
                  { name: "nome", label: "Nome da Vara", type: "text" },
                  {
                    name: "codigo",
                    label: "Código da Vara",
                    type: "text",
                    mask: "000000000",
                  },
                ],
                columns: [
                  { header: "Código", key: "codigo" },
                  { header: "Nome", key: "nome" },
                ],
                onSearch: fetchVaras,
                onSelect: (item, context) => {
                  context.setMultipleValues(
                    {
                      codigoDaVara: item.codigo,
                      nomeDaVara: item.nome,
                    },
                    true,
                  );
                },
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
              name: "processoConhecimento",
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
            context.data.processoConhecimento === "sim",
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
              type: "select",
              name: "dataTransitoJulgadoDoProcessoDeConhecimento",
              label: "Data do trânsito em julgado",
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
          ],
        },
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
