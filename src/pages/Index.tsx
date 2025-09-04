import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import PortfolioAdmin from '@/components/PortfolioAdmin';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
  description: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Премиум Дизайн",
    category: "Веб-дизайн",
    image: "/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg",
    images: [
      "/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg",
      "/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg",
      "/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg"
    ],
    description: "Элегантный веб-дизайн с премиум эстетикой и изысканными деталями."
  },
  {
    id: 2,
    title: "Арт Проект",
    category: "Графика",
    image: "/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg",
    images: [
      "/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg",
      "/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg",
      "/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg"
    ],
    description: "Креативная графическая работа с утонченным художественным подходом."
  },
  {
    id: 3,
    title: "Люкс Брендинг",
    category: "Брендинг",
    image: "/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg",
    images: [
      "/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg",
      "/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg",
      "/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg"
    ],
    description: "Роскошная айдентика бренда с изысканными визуальными решениями."
  }
];

const products: Product[] = [
  {
    id: 1,
    title: "Дизайн Логотипа",
    price: "от 50 000₽",
    image: "/img/d4294912-1ffd-4b03-9114-b04515f0b181.jpg",
    description: "Эксклюзивная разработка логотипа премиум класса"
  },
  {
    id: 2,
    title: "Веб-сайт",
    price: "от 150 000₽",
    image: "/img/d9cb1c95-79d7-48bd-8bde-44864c1bbb46.jpg",
    description: "Создание элегантного веб-сайта с уникальным дизайном"
  },
  {
    id: 3,
    title: "Фирменный Стиль",
    price: "от 100 000₽",
    image: "/img/cb73ccd6-e934-467c-80ab-bf71854bf86a.jpg",
    description: "Полная разработка фирменного стиля бренда"
  }
];

export default function Index() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultPortfolioItems);
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData)) {
          setPortfolioItems(parsedData);
        }
      } catch (error) {
        console.log('Error parsing saved portfolio data:', error);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showAdmin) {
    return <PortfolioAdmin />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-gold">PORTFOLIO</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="hover-gold">Главная</button>
              <button onClick={() => scrollToSection('portfolio')} className="hover-gold">Портфолио</button>
              <button onClick={() => scrollToSection('products')} className="hover-gold">Товары</button>
              <button onClick={() => scrollToSection('services')} className="hover-gold">Услуги</button>
              <button onClick={() => scrollToSection('about')} className="hover-gold">О мне</button>
              <button onClick={() => scrollToSection('contact')} className="hover-gold">Контакты</button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAdmin(!showAdmin)}
                className="border-gold text-gold hover:bg-gold hover:text-black"
              >
                <Icon name="Settings" className="mr-2" size={16} />
                Админ
              </Button>
              <Button className="bg-gradient-gold text-black hover:opacity-90">
                Заказать
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl lg:text-8xl font-bold mb-6 animate-fade-in">
            ПРЕМИУМ
            <br />
            <span className="text-gold">ДИЗАЙН</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in">
            Создаю изысканные визуальные решения для брендов, которые ценят качество и элегантность
          </p>
          <div className="flex gap-6 justify-center animate-scale-in">
            <Button 
              size="lg" 
              className="bg-gradient-gold text-black hover:opacity-90"
              onClick={() => scrollToSection('portfolio')}
            >
              <Icon name="Eye" className="mr-2" />
              Смотреть работы
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-black"
              onClick={() => scrollToSection('contact')}
            >
              <Icon name="MessageCircle" className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Избранные <span className="text-gold">Работы</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Коллекция премиальных проектов с безупречным исполнением
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Dialog key={item.id} onOpenChange={(open) => {
                if (open) {
                  setSelectedWork(item);
                  setCurrentImageIndex(0);
                } else {
                  setSelectedWork(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gold text-black">{item.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  {selectedWork && (
                    <div className="bg-card">
                      <div className="relative">
                        <img 
                          src={selectedWork.images[currentImageIndex]} 
                          alt={selectedWork.title}
                          className="w-full h-[500px] object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                            disabled={currentImageIndex === 0}
                          >
                            <Icon name="ChevronLeft" />
                          </Button>
                          <div className="flex gap-2">
                            {selectedWork.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${
                                  idx === currentImageIndex ? 'bg-gold' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setCurrentImageIndex(Math.min(selectedWork.images.length - 1, currentImageIndex + 1))}
                            disabled={currentImageIndex === selectedWork.images.length - 1}
                          >
                            <Icon name="ChevronRight" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold">{selectedWork.title}</h3>
                          <Badge className="bg-gold text-black">{selectedWork.category}</Badge>
                        </div>
                        <p className="text-muted-foreground">{selectedWork.description}</p>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Эксклюзивные <span className="text-gold">Товары</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Премиальные дизайн-услуги индивидуального характера
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">{product.price}</span>
                      <Button className="bg-gradient-gold text-black hover:opacity-90">
                        <Icon name="ShoppingCart" className="mr-2" />
                        Заказать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Премиум <span className="text-gold">Услуги</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Полный спектр дизайн-услуг высочайшего качества
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "Palette", title: "Брендинг", description: "Создание уникальной визуальной идентичности" },
              { icon: "Monitor", title: "Веб-дизайн", description: "Элегантные и функциональные веб-сайты" },
              { icon: "Image", title: "Графический дизайн", description: "Изысканные визуальные решения" },
              { icon: "Package", title: "Упаковка", description: "Премиальный дизайн упаковки товаров" },
              { icon: "FileText", title: "Полиграфия", description: "Роскошные печатные материалы" },
              { icon: "Sparkles", title: "Консалтинг", description: "Экспертные рекомендации по дизайну" }
            ].map((service, index) => (
              <Card key={index} className="text-center p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="mb-6">
                  <Icon name={service.icon as any} size={48} className="text-gold mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            О <span className="text-gold">Мастере</span>
          </h2>
          <div className="text-lg text-muted-foreground space-y-6">
            <p>
              Более 10 лет создаю исключительные визуальные решения для премиальных брендов. 
              Мой подход основан на глубоком понимании эстетики и безупречном внимании к деталям.
            </p>
            <p>
              Каждый проект — это уникальное произведение искусства, созданное с учетом индивидуальных 
              потребностей клиента и современных тенденций дизайна.
            </p>
          </div>
          <div className="mt-12 flex justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">100+</div>
              <div className="text-muted-foreground">Проектов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">50+</div>
              <div className="text-muted-foreground">Клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">10+</div>
              <div className="text-muted-foreground">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Начнём <span className="text-gold">Сотрудничество</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Готов воплотить ваши идеи в изысканные визуальные решения
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" className="text-gold" />
              <span>hello@portfolio.com</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" className="text-gold" />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="MapPin" className="text-gold" />
              <span>Москва, Россия</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-gold text-black hover:opacity-90 text-lg px-8 py-4"
          >
            <Icon name="MessageCircle" className="mr-2" />
            Обсудить проект
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Premium Portfolio. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}