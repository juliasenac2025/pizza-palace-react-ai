
# Pizza Menu Manager

Um aplicativo React moderno para gerenciar itens de menu de pizza com operações CRUD completas, desenvolvido para demonstrar habilidades de programação apoiada por IA.

## 🚀 Funcionalidades

- **Listagem de Itens**: Visualize todos os itens do menu com filtros por categoria e busca
- **Detalhes do Item**: Visualização completa dos detalhes de cada item
- **Adicionar Item**: Formulário para adicionar novos itens ao menu
- **Editar Item**: Atualização de itens existentes
- **Remover Item**: Exclusão de itens do menu
- **Interface Responsiva**: Design moderno que funciona em todos os dispositivos
- **Feedback Visual**: Mensagens de sucesso/erro e estados de carregamento
- **Filtros Avançados**: Busca por nome/descrição e filtro por categoria

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **React Hook Form** - Gerenciamento de formulários
- **Fetch API** - Consumo da API REST

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- API backend2025-pizzademo rodando

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd pizza-menu-manager
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
   - Abra o arquivo `src/services/menuApi.ts`
   - Altere a variável `API_BASE_URL` para a URL da sua API backend2025-pizzademo

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse http://localhost:5173 no seu navegador

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── MenuItemCard.tsx        # Card de exibição do item
│   ├── MenuItemDetailModal.tsx # Modal de detalhes
│   ├── MenuItemForm.tsx        # Formulário add/edit
│   └── MenuManager.tsx         # Componente principal
├── hooks/              # Hooks customizados
│   └── useMenuItems.ts         # Hook para gerenciar estado
├── services/           # Serviços de API
│   └── menuApi.ts              # Cliente da API REST
├── types/              # Definições de tipos
│   └── menu.ts                 # Interfaces do menu
└── pages/              # Páginas da aplicação
    └── Index.tsx               # Página principal
```

## 🔌 API Endpoints

O aplicativo consome os seguintes endpoints da API backend2025-pizzademo:

- `GET /menu` - Lista todos os itens do menu
- `GET /menu/{id}` - Obtém detalhes de um item específico
- `POST /menu` - Cria um novo item do menu
- `PUT /menu/{id}` - Atualiza um item existente
- `DELETE /menu/{id}` - Remove um item do menu

### Formato dos Dados

```typescript
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  ingredients?: string[];
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🎯 Como Usar

### Listagem
- A tela principal exibe todos os itens do menu em cards
- Use a barra de busca para filtrar por nome ou descrição
- Clique nos botões de categoria para filtrar por tipo
- Visualize estatísticas do menu no topo da página

### Visualizar Detalhes
- Clique no botão "Ver" em qualquer card
- Modal será aberto com informações completas do item

### Adicionar Item
- Clique no botão "Adicionar Item" no topo da página
- Preencha o formulário com as informações do novo item
- Campos obrigatórios: nome, descrição, preço, categoria
- Clique em "Adicionar" para salvar

### Editar Item
- Clique no botão "Editar" no card do item desejado
- Formulário será aberto com dados pré-preenchidos
- Modifique os campos necessários
- Clique em "Atualizar" para salvar

### Remover Item
- Clique no botão "Excluir" no card do item
- Confirme a exclusão na janela de confirmação

## 🤖 Prompts do GitHub Copilot Utilizados

Durante o desenvolvimento, os seguintes prompts foram utilizados com o GitHub Copilot:

1. "Create a TypeScript interface for a pizza menu item with all necessary properties"
2. "Generate a fetch-based API service class for CRUD operations on menu items"
3. "Create a custom React hook for managing menu items state with error handling"
4. "Build a responsive card component for displaying menu items with action buttons"
5. "Create a modal component for displaying detailed menu item information"
6. "Generate a form component for adding and editing menu items with validation"
7. "Create a main component that combines all menu functionality with search and filters"
8. "Add loading states and error handling to the menu management interface"
9. "Implement toast notifications for user feedback on CRUD operations"
10. "Create a responsive layout with statistics cards and filter options"

## 🎨 Decisões de Design

- **shadcn/ui**: Escolhido para componentes consistentes e acessíveis
- **Tailwind CSS**: Para estilização rápida e responsiva
- **TypeScript**: Para maior segurança de tipos e melhor DX
- **Hooks Customizados**: Para separação de lógica de negócio e UI
- **Modais**: Para melhor UX em formulários e detalhes
- **Cards**: Layout familiar e atrativo para exibir itens

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa linting do código

## 📝 Próximas Melhorias

- [ ] Implementar paginação para muitos itens
- [ ] Adicionar upload de imagens
- [ ] Implementar busca avançada
- [ ] Adicionar ordenação por diferentes critérios
- [ ] Implementar cache de dados
- [ ] Adicionar testes unitários
- [ ] Implementar drag & drop para reordenar

## 🤝 Contribuição

Este projeto foi desenvolvido como atividade acadêmica para demonstrar habilidades de programação apoiada por IA.

## 📄 Licença

Projeto acadêmico - MIT License
