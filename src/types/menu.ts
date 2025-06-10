
export interface Pizza {
  id: number;
  name?: string;
  description?: string;
  // Adicione outros campos da Pizza conforme necessário
}

export interface MenuItem {
  id: number;
  valor: number;
  tamanho: string;
  pizza?: Pizza;
}

export interface CreateMenuItemRequest {
  valor: number;
  tamanho: string;
  pizza?: Pizza;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {}
