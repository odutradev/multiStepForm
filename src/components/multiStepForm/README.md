# MultiStepForm Component

O `MultiStepForm` é um componente robusto e orientado a configuração (config-driven) para criação de formulários complexos, divididos em etapas (steps), com suporte a renderização condicional, máscaras, validações customizadas, buscas modais (tabela e árvore) e tabelas dinâmicas.

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
| `type` | `string` | Tipo: `'text' \| 'number' \| 'email' \| 'select' \| 'info' \| 'date' \| 'button' \| 'table' \| 'currency' \| 'percentage'`. |
| `required` | `boolean` | Torna o preenchimento obrigatório. |
| `disabled` | `boolean` | Desabilita a interação com o campo. |
| `readOnly` | `boolean` | Torna o campo apenas leitura (útil para campos auto-preenchidos). |
| `colSpan` | `number` | Quantidade de colunas que o campo ocupa no grid do grupo. |
| `preSet` | `string` | Chave referenciando um objeto em `FormConfig.fieldPreSets` para herdar configurações. |
| `mask` | `string \| RegExp` | Padrão de máscara usando `react-imask` (ex: `'000.000.000-00'`). |
| `options` | `FieldOption[]` | Usado quando `type: 'select'`. Array contendo `{ label: string, value: string }`. |
| `validation` | `FieldValidation` | Objeto contendo `pattern` (Regex string) e `message` para validação customizada. |
| `icon` | `string` | Nome de um ícone do Material UI para exibir no campo (ex: `'Search'`). |
| `disableFuture` | `boolean` | Impede seleção de datas futuras (usado apenas se `type: 'date'`). |
| `disablePast` | `boolean` | Impede seleção de datas passadas (usado apenas se `type: 'date'`). |
| `minDate` | `string` | Data mínima permitida (formato YYYY-MM-DD). |
| `maxDate` | `string` | Data máxima permitida (formato YYYY-MM-DD). |
| `buttonVariant` | `string` | Variante do botão (`'contained' \| 'outlined' \| 'text'`) quando `type: 'button'`. |
| `onButtonClick` | `(context: ActionContext) => void` | Ação executada quando `type: 'button'`. |
| `onChange` | `(value: unknown, ctx: ActionContext) => void` | Hook acionado na alteração do valor. Ideal para atualizar outros campos dinamicamente. |
| `conditionalRender` | `(context: ActionContext) => boolean` | Função que determina se o campo específico deve ser renderizado. |
| `searchConfig` | `SearchConfig` | Configuração para abrir um Modal de Busca associado ao campo. |
| `tableColumns` | `TableColumn[]` | Usado quando `type: 'table'`. Define as colunas da tabela interna. |
| `tableData` | `Record<string, unknown>[]` | Dados estáticos da tabela (ignorado se o campo já tiver dados no state). |
| `tableActions` | `TableAction[]` | Ações por linha da tabela (gera um menu "MoreVert"). |

### SearchConfig (Modal de Busca)
Configuração para campos que abrem um modal de pesquisa ao clicar na lupa ou pressionar Enter.

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `title` | `string` | Título exibido no topo do modal. |
| `fields` | `FormField[]` | Campos de filtro renderizados no topo do modal de busca. |
| `columns` | `SearchResultColumn[]` | Configuração das colunas exibidas na listagem (quando `viewMode: 'table'`). |
| `viewMode` | `'table' \| 'tree'` | Define se a exibição dos resultados será em tabela convencional ou em estrutura de árvore. (Padrão: `table`) |
| `pagination` | `boolean` | Habilita a paginação na visualização em tabela. |
| `autoSearchOnOpen` | `boolean` | Se `true`, executa a busca automaticamente ao abrir o modal, mesmo sem filtros iniciais. (Padrão: `true`) |
| `treeConfig` | `TreeConfig` | Obrigatório se `viewMode: 'tree'`. Configura as chaves de leitura da ��rvore. |
| `initialFilterName` | `string` | Nome do campo de filtro que receberá o valor inicialmente digitado no input antes de abrir o modal. |
| `onSearch` | `(filters: Record<string, unknown>) => Promise<Record<string, unknown>[]>` | Função que realiza a busca na API e retorna os dados. |
| `onSelect` | `(item: Record<string, unknown>, context: ActionContext) => void` | Ação executada ao selecionar um item na lista de resultados. |

### TreeConfig (Para SearchConfig com viewMode 'tree')
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `valueKey` | `string` | Chave no objeto de dados que representa o ID/Valor do nó. |
| `labelKey` | `string` | Chave no objeto de dados que representa o texto/nome a ser exibido. |
| `childrenKey` | `string` | Chave no objeto de dados que contém o array de filhos recursivos. |

### TableColumn & TableAction (Para type 'table')
| Entidade | Campo | Tipo | Descrição |
| :--- | :--- | :--- | :--- |
| `TableColumn` | `header` | `string` | Título da coluna. |
| `TableColumn` | `key` | `string` | Chave de leitura no objeto de dados. |
| `TableAction` | `label` | `string` | Rótulo da ação. |
| `TableAction` | `icon` | `string` | Ícone do Material UI. |
| `TableAction` | `onClick` | `Function` | Ação executada ao clicar no item do menu da tabela. |

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