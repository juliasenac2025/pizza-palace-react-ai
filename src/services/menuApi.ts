
import { MenuItem, CreateMenuItemRequest, UpdateMenuItemRequest } from '../types/menu';

// Configuração base da API - ajuste a URL conforme necessário
const API_BASE_URL = 'http://localhost:3001'; // Substitua pela URL real da API backend2025-pizzademo

class MenuApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // GET /menu - Listar todos os itens do menu
  async getAllMenuItems(): Promise<MenuItem[]> {
    console.log('Fetching all menu items...');
    const response = await fetch(`${API_BASE_URL}/menu`);
    return this.handleResponse<MenuItem[]>(response);
  }

  // GET /menu/{id} - Obter item específico do menu
  async getMenuItemById(id: number): Promise<MenuItem> {
    console.log(`Fetching menu item with id: ${id}`);
    const response = await fetch(`${API_BASE_URL}/menu/${id}`);
    return this.handleResponse<MenuItem>(response);
  }

  // POST /menu - Criar novo item do menu
  async createMenuItem(item: CreateMenuItemRequest): Promise<MenuItem> {
    console.log('Creating new menu item:', item);
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse<MenuItem>(response);
  }

  // PUT /menu/{id} - Atualizar item do menu
  async updateMenuItem(id: number, item: UpdateMenuItemRequest): Promise<MenuItem> {
    console.log(`Updating menu item ${id}:`, item);
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse<MenuItem>(response);
  }

  // DELETE /menu/{id} - Remover item do menu
  async deleteMenuItem(id: number): Promise<void> {
    console.log(`Deleting menu item with id: ${id}`);
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  }
}

export const menuApi = new MenuApiService();
