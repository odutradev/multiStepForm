# MultiStepForm Component

O `MultiStepForm` é um componente robusto e orientado a configuração (config-driven) para criação de formulários complexos, divididos em etapas (steps), com suporte a renderização condicional, máscaras, validações customizadas, buscas modais e tabelas dinâmicas.

## Integração Básica

```tsx
import MultiStepForm from '@components/multiStepForm';
import type { FormConfig } from '@components/multiStepForm/types';

const myFormConfig: FormConfig = {
  steps: [
    {
      id: 'step-1',
      title: 'Informações Básicas',
      actions: [
        { actionType: 'next', label: 'Próximo', variant: 'contained' }
      ],
      groups: [
        {
          title: 'Dados Pessoais',
          gridColumns: 2,
          fields: [
            { name: 'fullName', label: 'Nome Completo', type: 'text', required: true },
            { name: 'email', label: 'E-mail', type: 'email', required: true }
          ]
        }
      ]
    }
  ]
};

const MyPage = () => {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <MultiStepForm
      config={myFormConfig}
      onSubmit={handleSubmit}
      initialData={{ fullName: 'João Silva' }}
    />
  );
};
```

## Propriedades do Componente (MultiStepFormProps)

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `config` | `FormConfig` | Objeto de configuração principal contendo steps, grupos e campos. |
| `onSubmit` | `(data: Record<string, unknown>) => void` | Função disparada ao executar uma ação do tipo `submit`. |
| `initialData` | `Record<string, unknown>` | Objeto opcional para pré-preenchimento dos campos do formulário. |

## Estrutura de Configuração

### FormConfig
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `steps` | `FormStep[]` | Array de etapas do formulário. |
| `fieldPreSets` | `Record<string, Partial<FormField>>` | Dicionário de configurações pré-definidas para reutilização nos campos usando a prop `preSet`. |

### FormStep
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único da etapa. |
| `title` | `string` | Título exibido no indicador de progresso (Stepper). |
| `groups` | `FormGroup[]` | Agrupamentos lógicos de campos dentro desta etapa. |
| `actions` | `FormAction[]` | Botões de ação exibidos no final da etapa (ex: Próximo, Voltar, Enviar). |
| `conditionalRender` | `(context: ActionContext) => boolean` | Função que determina se a etapa inteira deve ser exibida. |

### FormGroup
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `title` | `string` | Título do grupo de campos. |
| `fields` | `FormField[]` | Lista de campos que compõem este grupo. |
| `gridColumns` | `number` | Número de colunas no grid (padrão responsivo se não informado). |
| `highlight` | `boolean` | Se `true`, adiciona um estilo de destaque (borda tracejada) ao grupo. |
| `conditionalRender` | `(context: ActionContext) => boolean` | Função que determina se o grupo deve ser exibido. |

### FormField (O Coração do Formulário)
Define o comportamento, aparência e regras de cada input.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `name` | `string` | Nome do campo no objeto de estado do `react-hook-form`. |
| `label` | `string` | Rótulo exibido para o usuário. |
| `type` | `string` | Tipo do campo: `'text' | 'number' | 'email' | 'select' | 'info' | 'date' | 'button' | 'table' | 'currency' | 'percentage'`. |
| `required` | `boolean` | Torna o preenchimento obrigatório. |
| `disabled` | `boolean` | Desabilita a interação com o campo. |
| `readOnly` | `boolean` | Torna o campo apenas leitura (útil para campos auto-preenchidos). |
| `colSpan` | `number` | Quantidade de colunas que o campo ocupa no grid do grupo. |
| `preSet` | `string` | Chave referenciando um objeto em `FormConfig.fieldPreSets` para herdar configurações. |
| `mask` | `string \| RegExp` | Padrão de máscara usando `react-imask` (ex: `'000.000.000-00'`). |
| `options` | `FieldOption[]` | Usado quando `type: 'select'`. Array contendo `{ label: string, value: string }`. |
| `validation` | `FieldValidation` | Objeto contendo `pattern` (Regex string) e `message` para validação customizada. |
| `icon` | `string` | Nome de um ícone do Material UI para exibir no campo (ex: `'Search'`). |
| `onChange` | `(value: unknown, ctx: ActionContext) => void` | Hook acionado na alteração do valor. Ideal para atualizar outros campos dinamicamente. |
| `conditionalRender` | `(context: ActionContext) => boolean` | Função que determina se o campo específico deve ser renderizado. |
| `searchConfig` | `SearchConfig` | Configuração para abrir um Modal de Busca associado ao campo. |
| `onButtonClick` | `(context: ActionContext) => void` | Ação executada quando `type: 'button'`. |
| `tableColumns` | `TableColumn[]` | Usado quando `type: 'table'`. Define as colunas da tabela interna. |
| `tableData` | `Record<string, unknown>[]` | Dados estáticos da tabela (ignorado se o campo já tiver dados no state). |
| `tableActions` | `TableAction[]` | Ações por linha da tabela (gera um menu "MoreVert"). |

### FormAction
Botões renderizados no rodapé do Step.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `label` | `string` | Texto do botão. |
| `actionType` | `'next' \| 'prev' \| 'submit' \| 'custom'` | Comportamento nativo do botão (Avançar step, recuar, submeter form). |
| `variant` | `'contained' \| 'outlined' \| 'text'` | Estilo visual do botão (MUI). |
| `onClick` | `(context: ActionContext) => Promise<boolean \| void>` | Ação customizada. Se retornar `false`, interrompe a execução do `actionType`. |

### ActionContext
Este objeto é injetado em todas as funções de callback (`conditionalRender`, `onChange`, `onClick`, `onSelect`). Ele permite interagir com o estado global do formulário de forma isolada e segura.

| Método / Propriedade | Descrição |
| :--- | :--- |
| `data` | Objeto contendo todos os valores atuais do formulário (reativo no `conditionalRender`). |
| `getValues` | `(payload?: string \| string[]) => unknown` - Retorna valores sem causar re-render. |
| `setValue` | `(name: string, value: unknown) => void` - Define o valor de um campo específico. |
| `setMultipleValues` | `(values: Record<string, unknown>, clearErrors?: boolean) => void` - Atualiza vários campos simultaneamente. |
| `setError` | Força um erro de validação em um campo. |
| `clearErrors` | Limpa erros de validação de um ou mais campos. |