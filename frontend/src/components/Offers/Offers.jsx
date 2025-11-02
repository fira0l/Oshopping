import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';
import { Percent, Gift, Zap } from 'lucide-react';

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            Limited Time Offers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Exclusive Deals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on our amazing offers across all categories
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Percent className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Up to 50% Off</h3>
              <p className="text-muted-foreground mb-6">On selected fashion items</p>
              <Button onClick={() => navigate('/men')} className="w-full">
                Shop Fashion
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground mb-6">On orders over $100</p>
              <Button onClick={() => navigate('/house')} variant="outline" className="w-full">
                Shop Appliances
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Flash Sale</h3>
              <p className="text-muted-foreground mb-6">24 hours only - Kids items</p>
              <Button onClick={() => navigate('/kids')} variant="secondary" className="w-full">
                Shop Kids
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Offers;
