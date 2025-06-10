
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

  // GET /cardapio - Listar todos os itens do cardápio
  async getAllMenuItems(): Promise<MenuItem[]> {
    console.log('Fetching all menu items...');
    const response = await fetch(`${API_BASE_URL}/cardapio`);
    return this.handleResponse<MenuItem[]>(response);
  }

  // GET /cardapio/{id} - Obter item específico do cardápio
  async getMenuItemById(id: number): Promise<MenuItem> {
    console.log(`Fetching menu item with id: ${id}`);
    const response = await fetch(`${API_BASE_URL}/cardapio/${id}`);
    return this.handleResponse<MenuItem>(response);
  }

  // POST /cardapio - Criar novo item do cardápio
  async createMenuItem(item: CreateMenuItemRequest): Promise<MenuItem> {
    console.log('Creating new menu item:', item);
    const response = await fetch(`${API_BASE_URL}/cardapio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse<MenuItem>(response);
  }

  // PUT /cardapio/{id} - Atualizar item do cardápio
  async updateMenuItem(id: number, item: UpdateMenuItemRequest): Promise<MenuItem> {
    console.log(`Updating menu item ${id}:`, item);
    const response = await fetch(`${API_BASE_URL}/cardapio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse<MenuItem>(response);
  }

  // DELETE /cardapio/{id} - Remover item do cardápio
  async deleteMenuItem(id: number): Promise<void> {
    console.log(`Deleting menu item with id: ${id}`);
    const response = await fetch(`${API_BASE_URL}/cardapio/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  }
}

export const menuApi = new MenuApiService();
