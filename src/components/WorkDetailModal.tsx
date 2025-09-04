import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { PortfolioWork } from '@/data/portfolioData';

interface WorkDetailModalProps {
  work: PortfolioWork;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkDetailModal({ work, isOpen, onClose }: WorkDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
  };

  const handleOrderClick = () => {
    const message = `Здравствуйте! Хочу заказать проект "${work.title}" из категории ${work.category}. Подробности: ${work.description}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/share/url?url=&text=${encodedMessage}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">{work.title}</DialogTitle>
              <Badge className="bg-gold text-black">{work.category}</Badge>
            </div>
            {work.price && (
              <div className="text-right">
                <span className="text-2xl font-bold text-gold">
                  от {work.price.toLocaleString()} ₽
                </span>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <img
                src={work.images[currentImageIndex]}
                alt={`${work.title} - ${currentImageIndex + 1}`}
                className="w-full h-80 object-cover"
              />
              
              {work.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                    onClick={prevImage}
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                    onClick={nextImage}
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {work.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {work.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-gold' 
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image counter */}
            {work.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {work.images.length}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Описание проекта</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {work.description}
            </p>
            <p className="text-foreground leading-relaxed">
              {work.details}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Теги проекта</h3>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-gold text-gold">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              size="lg" 
              className="flex-1 bg-gradient-gold text-black hover:opacity-90"
              onClick={handleOrderClick}
            >
              <Icon name="MessageCircle" className="mr-2" />
              Заказать проект
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-black"
            >
              <Icon name="Phone" className="mr-2" />
              Обсудить детали
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} />
              <span className="font-medium">Информация о проекте</span>
            </div>
            <ul className="space-y-1">
              <li>• Индивидуальный подход к каждому проекту</li>
              <li>• Полное сопровождение от концепции до реализации</li>
              <li>• Исходные файлы и все материалы передаются клиенту</li>
              <li>• Поддержка и консультации после завершения работ</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}