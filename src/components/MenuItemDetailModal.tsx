
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
          <DialogTitle className="text-2xl">
            {item.pizza?.name || `Pizza ${item.tamanho}`}
          </DialogTitle>
          <DialogDescription>
            {item.pizza?.description || `Detalhes do item do cardápio`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informações</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-bold text-primary">R$ {item.valor.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tamanho:</span>
                  <Badge variant="outline">{item.tamanho}</Badge>
                </div>
                {item.pizza?.id && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID da Pizza:</span>
                    <span className="text-sm">{item.pizza.id}</span>
                  </div>
                )}
              </div>
            </div>

            {item.pizza && (
              <div>
                <h3 className="font-semibold mb-2">Pizza</h3>
                <div className="space-y-1">
                  {item.pizza.name && (
                    <p className="text-sm">
                      <strong>Nome:</strong> {item.pizza.name}
                    </p>
                  )}
                  {item.pizza.description && (
                    <p className="text-sm">
                      <strong>Descrição:</strong> {item.pizza.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
