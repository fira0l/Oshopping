import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { FaLinkedin, FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, CreditCard, Truck, Shield } from 'lucide-react';

const Footer = () => {
  const { allCategories } = useContext(ShopContext);
  const mainCategories = allCategories.filter(cat => !cat.parent_category_id).slice(0, 5);

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold text-primary">OShop</h2>
            </Link>
            <p className="text-muted-foreground">
              Your one-stop destination for quality products at great prices. Shop with confidence and style.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+251 940 2398 47</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>firaforpython@gmail.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2">
              {mainCategories.map(category => (
                <li key={category.category_id}>
                  <Link 
                    to={`/category/${category.category_id}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {mainCategories.length === 0 && (
                <li className="text-muted-foreground">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Customer Service & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/order-history" className="text-muted-foreground hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Return Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Shipping Info</span>
              </li>
              <li>
                <span className="text-muted-foreground">Size Guide</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/firaolanbessaofficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <FaLinkedin className="text-sm" />
                </a>
                <a 
                  href="https://www.facebook.com/letera.mengistu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <FaFacebook className="text-sm" />
                </a>
                <a 
                  href="http://www.instagram.com/firaolanbessaofficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <FaInstagramSquare className="text-sm" />
                </a>
                <a 
                  href="https://www.x.com/FiraValorant" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <FaSquareXTwitter className="text-sm" />
                </a>
                <a 
                  href="https://t.me/believerF" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <FaTelegram className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="border-t mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Free Shipping</h4>
                <p className="text-xs text-muted-foreground">On orders over 500 Birr</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-xs text-muted-foreground">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Easy Returns</h4>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 OShop. All rights reserved. Powered by OICT.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary cursor-pointer">Terms of Service</span>
              <span className="hover:text-primary cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;