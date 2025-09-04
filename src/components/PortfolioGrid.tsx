import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  createdAt: string;
}

interface PortfolioGridProps {
  portfolioItems: PortfolioItem[];
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: number) => void;
  onCreateNew: () => void;
}

export default function PortfolioGrid({ portfolioItems, onEdit, onDelete, onCreateNew }: PortfolioGridProps) {
  if (portfolioItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Image" size={64} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Портфолио пустое</h3>
        <p className="text-muted-foreground mb-4">Добавьте свою первую работу</p>
        <Button 
          onClick={onCreateNew}
          className="bg-gradient-gold text-black hover:opacity-90"
        >
          <Icon name="Plus" className="mr-2" />
          Добавить работу
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <Card key={item.id} className="group">
          <div className="relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-gold text-black">{item.category}</Badge>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(item)}
                  className="w-8 h-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить работу?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя отменить. Работа "{item.title}" будет удалена навсегда.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(item.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.images.length} изображений</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}