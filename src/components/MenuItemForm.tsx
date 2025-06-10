
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
    valor: 0,
    tamanho: '',
    pizza: undefined,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        valor: item.valor,
        tamanho: item.tamanho,
        pizza: item.pizza,
      });
    } else {
      setFormData({
        valor: 0,
        tamanho: '',
        pizza: undefined,
      });
    }
  }, [item, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await onSubmit(formData);
    
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
              ? 'Edite as informações do item do cardápio.' 
              : 'Preencha as informações para adicionar um novo item ao cardápio.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valor">Valor (R$) *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor}
                onChange={(e) => setFormData(prev => ({ ...prev, valor: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="tamanho">Tamanho *</Label>
              <Input
                id="tamanho"
                value={formData.tamanho}
                onChange={(e) => setFormData(prev => ({ ...prev, tamanho: e.target.value }))}
                placeholder="Ex: P, M, G, GG"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pizzaId">ID da Pizza (opcional)</Label>
            <Input
              id="pizzaId"
              type="number"
              value={formData.pizza?.id || ''}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                if (id) {
                  setFormData(prev => ({ 
                    ...prev, 
                    pizza: { ...prev.pizza, id } 
                  }));
                } else {
                  setFormData(prev => ({ 
                    ...prev, 
                    pizza: undefined 
                  }));
                }
              }}
              placeholder="Digite o ID da pizza"
            />
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
