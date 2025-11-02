import React from 'react';
import ProductCard from './components/ProductCard';

const TestProductCard = () => {
  const sampleProduct = {
    id: 1,
    name: "Sample Product",
    description: "This is a sample product description to test the ProductCard component styling.",
    price: 29.99,
    stock_quantity: 5,
    image: "/placeholder-product.svg"
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">ProductCard Test</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            product={sampleProduct}
            onAddToCart={(product) => console.log('Add to cart:', product)}
            onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
          />
          <ProductCard 
            product={{...sampleProduct, stock_quantity: 0, name: "Out of Stock Product"}}
            onAddToCart={(product) => console.log('Add to cart:', product)}
            onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
          />
          <ProductCard 
            product={{...sampleProduct, stock_quantity: 3, name: "Low Stock Product"}}
            onAddToCart={(product) => console.log('Add to cart:', product)}
            onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
          />
        </div>
      </div>
    </div>
  );
};

export default TestProductCard;