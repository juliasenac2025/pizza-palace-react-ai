
export interface MenuItem {
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

export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  ingredients?: string[];
  available: boolean;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {}
