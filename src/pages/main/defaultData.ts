import type { FormConfig } from "@components/multiStepForm/types";

export const mockFormConfig: FormConfig = {
  steps: [
    {
      id: "step-1",
      title: "Cadastrar Processo",
      fields: [
        {
          name: "processNumber",
          label: "Número do processo",
          type: "text",
          required: true,
        },
        {
          name: "instance",
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
      actions: [{ label: "Avançar", actionType: "next" }],
    },
    {
      id: "step-2",
      title: "Detalhes do Ofício",
      fields: [
        {
          name: "processNumber",
          label: "Número do Processo",
          type: "text",
          required: true,
        },
        { name: "value", label: "Valor (R$)", type: "number", required: true },
        {
          name: "court",
          label: "Tribunal",
          type: "select",
          required: true,
          options: [
            { label: "TJSP", value: "TJSP" },
            { label: "TJMG", value: "TJMG" },
            { label: "TRF1", value: "TRF1" },
          ],
        },
      ],
      actions: [
        { label: "Voltar", actionType: "prev", variant: "outlined" },
        { label: "Avançar", actionType: "next" },
      ],
    },
    {
      id: "step-3",
      title: "Revisão e Envio",
      fields: [
        { name: "observations", label: "Observações Adicionais", type: "text" },
      ],
      actions: [
        { label: "Voltar", actionType: "prev", variant: "outlined" },
        { label: "Confirmar e Enviar", actionType: "submit" },
      ],
    },
  ],
};
