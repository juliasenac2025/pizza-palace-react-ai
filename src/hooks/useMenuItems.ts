
import { useState, useEffect } from 'react';
import { MenuItem, CreateMenuItemRequest, UpdateMenuItemRequest } from '../types/menu';
import { menuApi } from '../services/menuApi';
import { toast } from '@/hooks/use-toast';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await menuApi.getAllMenuItems();
      setMenuItems(items);
      console.log('Menu items loaded successfully:', items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar itens do menu';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMenuItem = async (item: CreateMenuItemRequest): Promise<boolean> => {
    try {
      const newItem = await menuApi.createMenuItem(item);
      setMenuItems(prev => [...prev, newItem]);
      toast({
        title: "Sucesso!",
        description: "Item adicionado ao menu com sucesso.",
      });
      console.log('Menu item created successfully:', newItem);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar item';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error creating menu item:', err);
      return false;
    }
  };

  const updateMenuItem = async (id: number, item: UpdateMenuItemRequest): Promise<boolean> => {
    try {
      const updatedItem = await menuApi.updateMenuItem(id, item);
      setMenuItems(prev => prev.map(menuItem => 
        menuItem.id === id ? updatedItem : menuItem
      ));
      toast({
        title: "Sucesso!",
        description: "Item atualizado com sucesso.",
      });
      console.log('Menu item updated successfully:', updatedItem);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar item';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error updating menu item:', err);
      return false;
    }
  };

  const deleteMenuItem = async (id: number): Promise<boolean> => {
    try {
      await menuApi.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Sucesso!",
        description: "Item removido do menu com sucesso.",
      });
      console.log('Menu item deleted successfully:', id);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover item';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error deleting menu item:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};
