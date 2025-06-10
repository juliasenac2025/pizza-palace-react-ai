
import React from 'react';
import { MenuItem } from '../types/menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onView: (item: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold">
              {item.pizza?.name || `Pizza ${item.tamanho}`}
            </CardTitle>
            <CardDescription className="mt-2">
              {item.pizza?.description || `Tamanho: ${item.tamanho}`}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {item.tamanho}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="text-2xl font-bold text-primary">
            R$ {item.valor.toFixed(2)}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(item)} className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(item)} className="flex-1">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(item.id)}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
