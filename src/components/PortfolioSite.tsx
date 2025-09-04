import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { portfolioWorks, PortfolioWork } from '@/data/portfolioData';
import WorkDetailModal from '@/components/WorkDetailModal';
import ProductsPanel from '@/components/ProductsPanel';

export default function PortfolioSite() {
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleWorkClick = (work: PortfolioWork) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const categories = [...new Set(portfolioWorks.map(work => work.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Palette" className="text-gold" size={28} />
            <h1 className="text-2xl font-bold">
              Design <span className="text-gold">Studio</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm font-medium hover:text-gold transition-colors">
              Портфолио
            </a>
            <Button
              variant="outline"
              onClick={() => setShowProducts(!showProducts)}
              className="border-gold text-gold hover:bg-gold hover:text-black"
            >
              <Icon name="Package" className="mr-2" size={16} />
              Товары
            </Button>
            <Button className="bg-gradient-gold text-black hover:opacity-90">
              <Icon name="MessageCircle" className="mr-2" size={16} />
              Заказать
            </Button>
          </nav>
          
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setShowProducts(!showProducts)}
          >
            <Icon name="Menu" />
          </Button>
        </div>
      </header>

      {/* Products Panel */}
      {showProducts && (
        <ProductsPanel 
          works={portfolioWorks} 
          onClose={() => setShowProducts(false)}
        />
      )}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Креативные <span className="text-gold">Решения</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональный дизайн для вашего бренда. От концепции до воплощения — 
            создаем уникальные визуальные решения.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <Badge key={category} variant="outline" className="border-gold text-gold px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioWorks.map((work) => (
              <Card 
                key={work.id} 
                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur"
                onClick={() => handleWorkClick(work)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={work.mainImage} 
                    alt={work.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gold text-black">
                      {work.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-bold text-lg">{work.title}</h3>
                        <p className="text-sm opacity-90">{work.tags.join(', ')}</p>
                      </div>
                      <Icon name="ZoomIn" size={24} />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{work.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {work.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {work.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {work.price && (
                      <span className="font-bold text-gold">
                        от {work.price.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Готовы создать что-то <span className="text-gold">уникальное</span>?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами и расскажите о своем проекте. Мы поможем воплотить ваши идеи в жизнь.
          </p>
          <Button size="lg" className="bg-gradient-gold text-black hover:opacity-90">
            <Icon name="Phone" className="mr-2" />
            Обсудить проект
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Palette" className="text-gold" size={24} />
            <span className="text-xl font-bold">Design Studio</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Design Studio. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Work Detail Modal */}
      {selectedWork && (
        <WorkDetailModal
          work={selectedWork}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedWork(null);
          }}
        />
      )}
    </div>
  );
}