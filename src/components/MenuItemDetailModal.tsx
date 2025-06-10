
import React from 'react';
import { MenuItem } from '../types/menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface MenuItemDetailModalProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MenuItemDetailModal: React.FC<MenuItemDetailModalProps> = ({
  item,
  open,
  onOpenChange,
}) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {item.image && (
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informações</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preço:</span>
                  <span className="font-bold text-primary">R$ {item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoria:</span>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={item.available ? "default" : "secondary"}>
                    {item.available ? "Disponível" : "Indisponível"}
                  </Badge>
                </div>
              </div>
            </div>

            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Ingredientes</h3>
                <ul className="space-y-1">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {(item.createdAt || item.updatedAt) && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Datas</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                {item.createdAt && (
                  <p>Criado em: {new Date(item.createdAt).toLocaleString('pt-BR')}</p>
                )}
                {item.updatedAt && (
                  <p>Atualizado em: {new Date(item.updatedAt).toLocaleString('pt-BR')}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
