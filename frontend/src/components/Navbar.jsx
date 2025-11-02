import React, { useContext, useState } from 'react';
import logo from './Assets/logo/icons8-shopping-bag-94.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useTheme } from '../Context/ThemeContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, ShoppingCart, User, LogOut, Phone, ChevronDown, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { getTotalCartCount, user, setUser, allCategories } = useContext(ShopContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    navigate('/');
    setUser(null); // Clear the user context
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="OShop" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">OShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative">
              <button 
                className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                onMouseEnter={() => setShowCategoriesDropdown(true)}
                onMouseLeave={() => setShowCategoriesDropdown(false)}
              >
                Categories
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {showCategoriesDropdown && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50"
                  onMouseEnter={() => setShowCategoriesDropdown(true)}
                  onMouseLeave={() => setShowCategoriesDropdown(false)}
                >
                  {allCategories.filter(cat => !cat.parent_category_id).map(category => (
                    <Link 
                      key={category.category_id} 
                      to={`/category/${category.category_id}`} 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setShowCategoriesDropdown(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop All
            </Link>
            <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contactus">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {user ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getTotalCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalCartCount()}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getTotalCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalCartCount()}
                  </Badge>
                )}
              </Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link to="/shop" className="text-lg font-medium hover:text-primary transition-colors">
                    Shop All
                  </Link>
                  <Link to="/deals" className="text-lg font-medium hover:text-primary transition-colors">
                    Deals
                  </Link>
                  <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Categories</p>
                    {allCategories.filter(cat => !cat.parent_category_id).map(category => (
                      <Link 
                        key={category.category_id} 
                        to={`/category/${category.category_id}`} 
                        className="block text-base font-medium hover:text-primary transition-colors pl-2"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  
                  <hr className="my-4" />
                  
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/contactus">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                  
                  {user ? (
                    <Button variant="outline" className="justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/login">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
