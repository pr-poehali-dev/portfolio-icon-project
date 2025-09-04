import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PortfolioForm from '@/components/PortfolioForm';
import PortfolioStats from '@/components/PortfolioStats';
import PortfolioGrid from '@/components/PortfolioGrid';

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
      saveToStorage(initialData);
    }
  }, []);

  // Сохранение в localStorage
  const saveToStorage = (items: PortfolioItem[]) => {
    localStorage.setItem('portfolioItems', JSON.stringify(items));
    // Также сохраняем для основного сайта
    localStorage.setItem('portfolioData', JSON.stringify(items));
  };

  const handleCreate = (formData: {
    title: string;
    category: string;
    description: string;
    image: string;
    images: string[];
  }) => {
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
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (formData: {
    title: string;
    category: string;
    description: string;
    image: string;
    images: string[];
  }) => {
    if (!editingItem) return;

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
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
    saveToStorage(updatedItems);
  };

  const handleCreateNew = () => {
    setIsCreateDialogOpen(true);
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
        
        <Button 
          onClick={handleCreateNew}
          className="bg-gradient-gold text-black hover:opacity-90"
        >
          <Icon name="Plus" className="mr-2" />
          Добавить работу
        </Button>
      </div>

      {/* Статистика */}
      <PortfolioStats portfolioItems={portfolioItems} categories={categories} />

      {/* Список работ */}
      <PortfolioGrid 
        portfolioItems={portfolioItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreateNew}
      />

      {/* Диалоги форм */}
      <PortfolioForm
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
        onSubmit={handleCreate}
        categories={categories}
      />

      <PortfolioForm
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        item={editingItem}
        onSubmit={handleUpdate}
        categories={categories}
      />
    </div>
  );
}