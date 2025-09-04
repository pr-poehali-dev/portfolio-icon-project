import { Card, CardContent } from '@/components/ui/card';
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

interface PortfolioStatsProps {
  portfolioItems: PortfolioItem[];
  categories: string[];
}

export default function PortfolioStats({ portfolioItems, categories }: PortfolioStatsProps) {
  return (
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
  );
}