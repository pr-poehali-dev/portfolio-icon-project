import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const categories = [
  'Веб-дизайн',
  'Графика',
  'Брендинг',
  'Упаковка',
  'Полиграфия',
  'Иллюстрация'
];

const defaultImages = [
  '/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg',
  '/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg',
  '/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg'
];

export default function PortfolioAdmin() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    images: [] as string[]
  });

  // Загрузка данных из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolioItems');
    if (saved) {
      setPortfolioItems(JSON.parse(saved));
    } else {
      // Инициализация с демо-данными
      const initialData: PortfolioItem[] = [
        {
          id: 1,
          title: "Премиум Дизайн",
          category: "Веб-дизайн",
          image: defaultImages[0],
          images: defaultImages,
          description: "Элегантный веб-дизайн с премиум эстетикой и изысканными деталями.",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Арт Проект",
          category: "Графика",
          image: defaultImages[2],
          images: defaultImages,
          description: "Креативная графическая работа с утонченным художественным подходом.",
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: "Люкс Брендинг",
          category: "Брендинг",
          image: defaultImages[1],
          images: defaultImages,
          description: "Роскошная айдентика бренда с изысканными визуальными решениями.",
          createdAt: new Date().toISOString()
        }
      ];
      setPortfolioItems(initialData);
      localStorage.setItem('portfolioItems', JSON.stringify(initialData));
    }
  }, []);

  // Сохранение в localStorage
  const saveToStorage = (items: PortfolioItem[]) => {
    localStorage.setItem('portfolioItems', JSON.stringify(items));
    // Также сохраняем для основного сайта
    localStorage.setItem('portfolioData', JSON.stringify(items));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      images: []
    });
  };

  const handleCreate = () => {
    if (!formData.title || !formData.category || !formData.description) return;

    const newItem: PortfolioItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      image: formData.image || defaultImages[0],
      images: formData.images.length > 0 ? formData.images : defaultImages,
      createdAt: new Date().toISOString()
    };

    const updatedItems = [...portfolioItems, newItem];
    setPortfolioItems(updatedItems);
    saveToStorage(updatedItems);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      images: item.images
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem || !formData.title || !formData.category || !formData.description) return;

    const updatedItems = portfolioItems.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image: formData.image || item.image,
            images: formData.images.length > 0 ? formData.images : item.images
          }
        : item
    );

    setPortfolioItems(updatedItems);
    saveToStorage(updatedItems);
    setIsEditDialogOpen(false);
    setEditingItem(null);
    resetForm();
  };

  const handleDelete = (id: number) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
    saveToStorage(updatedItems);
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Управление <span className="text-gold">Портфолио</span>
          </h1>
          <p className="text-muted-foreground">
            Добавляйте, редактируйте и управляйте своими работами
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-black hover:opacity-90">
              <Icon name="Plus" className="mr-2" />
              Добавить работу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать новую работу</DialogTitle>
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
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
                  <Label>Добавленные изображения ({formData.images.length})</Label>
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
                <Button onClick={handleCreate} className="bg-gradient-gold text-black hover:opacity-90">
                  Создать работу
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Icon name="Briefcase" className="text-gold" />
              <div>
                <div className="text-2xl font-bold">{portfolioItems.length}</div>
                <div className="text-sm text-muted-foreground">Всего работ</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {categories.slice(0, 3).map(category => {
          const count = portfolioItems.filter(item => item.category === category).length;
          return (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Icon name="Tag" className="text-gold" />
                  <div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">{category}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Список работ */}
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
                    onClick={() => handleEdit(item)}
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
                          onClick={() => handleDelete(item.id)}
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

      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Image" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Портфолио пустое</h3>
          <p className="text-muted-foreground mb-4">Добавьте свою первую работу</p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-gold text-black hover:opacity-90"
          >
            <Icon name="Plus" className="mr-2" />
            Добавить работу
          </Button>
        </div>
      )}

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать работу</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Название работы</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Введите название"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-category">Категория</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Опишите проект"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-image">URL изображения</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-image"
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
                <Label>Изображения в галерее ({formData.images.length})</Label>
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
              <Button onClick={handleUpdate} className="bg-gradient-gold text-black hover:opacity-90">
                Сохранить изменения
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}