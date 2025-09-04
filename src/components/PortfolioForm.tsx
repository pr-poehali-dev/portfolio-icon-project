import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface PortfolioFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  item?: PortfolioItem | null;
  onSubmit: (formData: {
    title: string;
    category: string;
    description: string;
    image: string;
    images: string[];
  }) => void;
  categories: string[];
}

interface FormData {
  title: string;
  category: string;
  description: string;
  image: string;
  images: string[];
}

export default function PortfolioForm({ 
  isOpen, 
  onOpenChange, 
  mode, 
  item, 
  onSubmit, 
  categories 
}: PortfolioFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: item?.title || '',
    category: item?.category || '',
    description: item?.description || '',
    image: item?.image || '',
    images: item?.images || []
  });

  // Синхронизация формы с переданным item при изменении
  useState(() => {
    if (item && mode === 'edit') {
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        image: item.image,
        images: item.images
      });
    } else if (mode === 'create') {
      setFormData({
        title: '',
        category: '',
        description: '',
        image: '',
        images: []
      });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      images: []
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.description) return;
    
    onSubmit(formData);
    if (mode === 'create') {
      resetForm();
    }
    onOpenChange(false);
  };

  const addImageUrl = () => {
    if (formData.image && !formData.images.includes(formData.image)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, prev.image],
        image: ''
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && mode === 'create') {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Создать новую работу' : 'Редактировать работу'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Название работы</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Введите название"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Категория</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Опишите проект"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image">URL изображения</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" onClick={addImageUrl} variant="outline">
                <Icon name="Plus" />
              </Button>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div>
              <Label>
                {mode === 'edit' ? 'Изображения в галерее' : 'Добавленные изображения'} ({formData.images.length})
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt="" className="w-16 h-16 object-cover rounded border" />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-6 h-6"
                      onClick={() => removeImage(index)}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="bg-gradient-gold text-black hover:opacity-90">
              {mode === 'create' ? 'Создать работу' : 'Сохранить изменения'}
            </Button>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}