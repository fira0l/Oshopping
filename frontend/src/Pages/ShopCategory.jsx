import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ShopCategory = ({ category }) => {
  const { categoryId } = useParams();
  const currentCategory = category || categoryId;
  const { allProducts, loadingProducts, errorProducts } = useContext(ShopContext);
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Show loading state
  if (loadingProducts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (errorProducts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading products. Please try again later.</p>
          <p className="text-sm text-muted-foreground mt-2">{errorProducts.message}</p>
        </div>
      </div>
    );
  }

  // Function to sort products based on the selected sorting option
  const sortProducts = (products, sortOption) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Filter products based on category
  const filterByCategory = (products, category) => {
    return products.filter((product) => product.category_id === category);
  };

  // Filter products based on search query
  const filterBySearch = (products, query) => {
    return products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  };

  // Handle changes to the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get filtered and sorted products
  let filteredProducts = filterByCategory(allProducts, currentCategory);
  filteredProducts = filterBySearch(filteredProducts, searchQuery);
  if (selectedSort) {
    filteredProducts = sortProducts(filteredProducts, selectedSort);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select 
            className="px-3 py-2 border rounded-md text-sm"
            onChange={(e) => setSelectedSort(e.target.value)}
            value={selectedSort || ''}
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.product_id} className="group hover:shadow-lg transition-shadow overflow-hidden">
            <Link to={`/product/${product.product_id}`}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.image || '/placeholder-product.jpg'} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    Low Stock
                  </Badge>
                )}
                {product.stock_quantity === 0 && (
                  <Badge variant="secondary" className="absolute top-2 left-2">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price} Birr
                  </span>
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
