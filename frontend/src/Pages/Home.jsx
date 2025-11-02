import React from 'react';
import Beauty from '../components/Beauty/Beauty';
import Offers from '../components/Offers/Offers';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Beauty />
      <Offers />
      
      {/* Categories Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="group cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/men')}>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">👔</div>
                <h3 className="font-semibold mb-2">Men's Fashion</h3>
                <p className="text-sm text-muted-foreground mb-4">Stylish clothing & accessories</p>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/women')}>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">👗</div>
                <h3 className="font-semibold mb-2">Women's Fashion</h3>
                <p className="text-sm text-muted-foreground mb-4">Elegant dresses & accessories</p>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/kids')}>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🧸</div>
                <h3 className="font-semibold mb-2">Kids Collection</h3>
                <p className="text-sm text-muted-foreground mb-4">Fun & comfortable for kids</p>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate('/house')}>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-semibold mb-2">Home Appliances</h3>
                <p className="text-sm text-muted-foreground mb-4">Modern home essentials</p>
                <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real reviews from real customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Quote className="h-8 w-8 text-primary" />
                <p className="text-muted-foreground italic">
                  "Amazing quality products and super fast delivery. OShop has become my go-to shopping destination!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">SA</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Anderson</div>
                    <div className="text-sm text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Quote className="h-8 w-8 text-primary" />
                <p className="text-muted-foreground italic">
                  "Great customer service and excellent product variety. Highly recommend OShop to everyone!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Quote className="h-8 w-8 text-primary" />
                <p className="text-muted-foreground italic">
                  "Love the user-friendly website and the quality of products. Shopping here is always a pleasure!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">EB</span>
                  </div>
                  <div>
                    <div className="font-semibold">Emily Brown</div>
                    <div className="text-sm text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
