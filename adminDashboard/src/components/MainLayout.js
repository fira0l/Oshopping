import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  Menu, 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import admin1 from './3Y5A6577.JPG';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: '', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { key: 'customers', icon: <Users className="h-5 w-5" />, label: 'Customers' },
    { key: 'orders', icon: <Package className="h-5 w-5" />, label: 'Orders' },
  ];

  const catalogItems = [
    { key: 'product', label: 'Add Product' },
    { key: 'product-list', label: 'Product List' },
    { key: 'category', label: 'Add Category' },
    { key: 'list-category', label: 'Category List' },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-primary text-primary-foreground">
      <div className="p-6 border-b border-primary-foreground/20">
        <h2 className="text-2xl font-bold">OShop Admin</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => {
              navigate(`/admin/${item.key}`);
              setSidebarOpen(false);
            }}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-3 flex-1 text-left">Catalog</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            {catalogItems.map((item) => (
              <DropdownMenuItem
                key={item.key}
                onClick={() => {
                  navigate(`/admin/${item.key}`);
                  setSidebarOpen(false);
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-primary text-primary-foreground border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-primary-foreground hover:bg-primary-foreground/10">
                  <img
                    src={admin1}
                    alt="Admin"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">Admin</p>
                    <p className="text-xs opacity-80">admin@oshop.com</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
