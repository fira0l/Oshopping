import React from 'react';
import beauty_image from '../Assets/home-new-bg-free-img.jpg';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ArrowRight, Star, Shield, Sparkles, Crown, Zap } from 'lucide-react';

const Beauty = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section - Landing Page Style */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${beauty_image})`}}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <Badge className="bg-primary/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-medium border border-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              #1 Premium Shopping Destination
            </Badge>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                The Future of
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Shopping
                </span>
                <br />
                <span className="text-3xl md:text-5xl text-gray-300">is Here</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Experience luxury shopping like never before. Premium products, 
                <span className="text-yellow-400 font-semibold"> unbeatable prices</span>, 
                delivered to your doorstep.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/men')}
                size="lg"
                className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Crown className="mr-2 h-5 w-5" />
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-lg px-8 py-6 h-auto border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Join the Elite
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-lg font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-medium">Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #000 2px, transparent 2px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Crown className="w-4 h-4 mr-2" />
              Premium Experience
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Why We're
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Different</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't just sell products. We deliver experiences that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Luxury Quality</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Hand-picked premium products from the world's most trusted luxury brands</p>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary-foreground transition-colors">Lightning Speed</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Same-day delivery in major cities. Your luxury, delivered at the speed of light</p>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-green-600 transition-colors">Fort Knox Security</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Military-grade encryption and 100% buyer protection guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Premium Stats Section */}
      <div className="py-24 bg-gradient-to-r from-primary via-primary/90 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Millions</h2>
            <p className="text-xl opacity-90">Join the elite community of satisfied customers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-black">1M+</div>
              <div className="text-lg opacity-90 font-medium">Elite Members</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-black">50K+</div>
              <div className="text-lg opacity-90 font-medium">Luxury Products</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-black">99.9%</div>
              <div className="text-lg opacity-90 font-medium">Satisfaction</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl md:text-6xl font-black">24/7</div>
              <div className="text-lg opacity-90 font-medium">Concierge</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Beauty;
