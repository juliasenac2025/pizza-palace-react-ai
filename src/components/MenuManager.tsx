
import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { useMenuItems } from '../hooks/useMenuItems';
import { MenuItemCard } from './MenuItemCard';
import { MenuItemDetailModal } from './MenuItemDetailModal';
import { MenuItemForm } from './MenuItemForm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, RefreshCw } from 'lucide-react';

export const MenuManager: React.FC = () => {
  const {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useMenuItems();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Filtrar itens baseado na busca e categoria
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obter categorias únicas
  const categories = [...new Set(menuItems.map(item => item.category))];

  const handleView = (item: MenuItem) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      await deleteMenuItem(id);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (editingItem) {
      return await updateMenuItem(editingItem.id, data);
    } else {
      return await createMenuItem(data);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Carregando menu...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">Erro ao carregar menu</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <Button onClick={fetchMenuItems}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Gerenciador de Menu</h1>
            <p className="text-muted-foreground">
              Gerencie os itens do seu menu de pizza
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedCategory === '' ? "default" : "outline"}
              onClick={() => setSelectedCategory('')}
              size="sm"
            >
              Todas
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold">{menuItems.length}</div>
            <div className="text-sm text-muted-foreground">Total de Itens</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {menuItems.filter(item => item.available).length}
            </div>
            <div className="text-sm text-muted-foreground">Disponíveis</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-500">
              {menuItems.filter(item => !item.available).length}
            </div>
            <div className="text-sm text-muted-foreground">Indisponíveis</div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categorias</div>
          </div>
        </div>

        {/* Lista de Itens */}
        <div>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory 
                  ? 'Nenhum item encontrado com os filtros aplicados.' 
                  : 'Nenhum item no menu. Adicione o primeiro item!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <MenuItemDetailModal
        item={selectedItem}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />

      <MenuItemForm
        item={editingItem}
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
