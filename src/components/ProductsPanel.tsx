import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { PortfolioWork } from '@/data/portfolioData';

interface ProductsPanelProps {
  works: PortfolioWork[];
  onClose: () => void;
}

interface CartItem {
  work: PortfolioWork;
  quantity: number;
}

export default function ProductsPanel({ works, onClose }: ProductsPanelProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...new Set(works.map(work => work.category))];
  const filteredWorks = selectedCategory === 'Все' 
    ? works.filter(work => work.price) 
    : works.filter(work => work.category === selectedCategory && work.price);

  const addToCart = (work: PortfolioWork) => {
    setCart(prev => {
      const existing = prev.find(item => item.work.id === work.id);
      if (existing) {
        return prev.map(item =>
          item.work.id === work.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { work, quantity: 1 }];
    });
  };

  const removeFromCart = (workId: number) => {
    setCart(prev => prev.filter(item => item.work.id !== workId));
  };

  const updateQuantity = (workId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(workId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.work.id === workId ? { ...item, quantity } : item
    ));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.work.price || 0) * item.quantity, 0);

  const handleOrderCart = () => {
    if (cart.length === 0) return;
    
    const orderDetails = cart.map(item => 
      `${item.work.title} (${item.work.category}) x${item.quantity} = ${((item.work.price || 0) * item.quantity).toLocaleString()} ₽`
    ).join('\n');
    
    const message = `Здравствуйте! Хочу заказать:\n\n${orderDetails}\n\nОбщая сумма: ${totalAmount.toLocaleString()} ₽`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/share/url?url=&text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-gold">Товары</span> и Услуги
              </h2>
              <p className="text-muted-foreground">
                Выберите нужные услуги и добавьте их в корзину
              </p>
            </div>
            <Button variant="outline" onClick={onClose}>
              <Icon name="X" className="mr-2" />
              Закрыть
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Products */}
            <div className="lg:col-span-3 space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-gold text-black hover:bg-gold/90" : "border-gold text-gold hover:bg-gold hover:text-black"}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredWorks.map(work => {
                  const cartItem = cart.find(item => item.work.id === work.id);
                  return (
                    <Card key={work.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={work.mainImage} 
                          alt={work.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-gold text-black">
                          {work.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{work.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {work.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-gold">
                            {work.price?.toLocaleString()} ₽
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {work.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {cartItem ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(work.id, cartItem.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="px-3 py-1 bg-muted rounded font-medium">
                                {cartItem.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(work.id, cartItem.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              onClick={() => addToCart(work)}
                              className="flex-1 bg-gold text-black hover:bg-gold/90"
                            >
                              <Icon name="ShoppingCart" className="mr-2" size={16} />
                              В корзину
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShoppingCart" size={20} />
                    Корзина ({cart.length})
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Корзина пуста
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.work.id} className="flex items-center gap-2 p-2 border rounded">
                            <img 
                              src={item.work.mainImage} 
                              alt={item.work.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.work.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.work.price?.toLocaleString()} ₽ x {item.quantity}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromCart(item.work.id)}
                              className="w-6 h-6 hover:text-destructive"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between font-bold">
                          <span>Итого:</span>
                          <span className="text-gold">{totalAmount.toLocaleString()} ₽</span>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-gold text-black hover:opacity-90"
                          onClick={handleOrderCart}
                        >
                          <Icon name="MessageCircle" className="mr-2" />
                          Заказать ({cart.length})
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full border-gold text-gold hover:bg-gold hover:text-black"
                          onClick={() => setCart([])}
                        >
                          Очистить корзину
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}