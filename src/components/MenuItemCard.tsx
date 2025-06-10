
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
      {item.image && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={item.available ? "default" : "secondary"}>
              {item.available ? "Disponível" : "Indisponível"}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {item.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {item.category}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="text-2xl font-bold text-primary">
            R$ {item.price.toFixed(2)}
          </div>
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                <strong>Ingredientes:</strong> {item.ingredients.join(', ')}
              </p>
            </div>
          )}
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
