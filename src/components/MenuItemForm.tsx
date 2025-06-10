
import React, { useState, useEffect } from 'react';
import { MenuItem, CreateMenuItemRequest } from '../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface MenuItemFormProps {
  item?: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateMenuItemRequest) => Promise<boolean>;
}

export const MenuItemForm: React.FC<MenuItemFormProps> = ({
  item,
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateMenuItemRequest>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    ingredients: [],
    available: true,
  });
  const [ingredientsText, setIngredientsText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image || '',
        ingredients: item.ingredients || [],
        available: item.available,
      });
      setIngredientsText((item.ingredients || []).join(', '));
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        ingredients: [],
        available: true,
      });
      setIngredientsText('');
    }
  }, [item, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const ingredients = ingredientsText
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);

    const dataToSubmit = {
      ...formData,
      ingredients,
    };

    const success = await onSubmit(dataToSubmit);
    
    if (success) {
      onOpenChange(false);
    }
    
    setLoading(false);
  };

  const isEditing = !!item;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Item' : 'Adicionar Novo Item'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edite as informações do item do menu.' 
              : 'Preencha as informações para adicionar um novo item ao menu.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredientes (separados por vírgula)</Label>
            <Textarea
              id="ingredients"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder="Mussarela, tomate, manjericão..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
            />
            <Label htmlFor="available">Disponível</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Adicionar')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
