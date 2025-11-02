import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronRight, ShoppingCart, Package, AlertCircle, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDisplay = () => {
  const { allProducts, allCategories, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const product = allProducts.find((e) => e.product_id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const category = allCategories.find(cat => cat.category_id === product.category_id);
  const categoryName = category ? category.name : 'Unknown Category';

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.stock_quantity) {
      setErrorMessage(`Only ${product.stock_quantity} item(s) available in stock.`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product.product_id, 1);
    }

    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-8 py-10 mb-12">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/category/${product.category_id}`} className="hover:text-primary transition-colors">{categoryName}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">{product.price} Birr</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Stock:</span>
            <Badge 
              variant={product.stock_quantity === 0 ? "destructive" : product.stock_quantity < 10 ? "secondary" : "default"}
              className="flex items-center gap-1"
            >
              {product.stock_quantity === 0 ? "Out of Stock" : `${product.stock_quantity} available`}
            </Badge>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
              <Input
                type="number"
                id="quantity"
                min="1"
                max={product.stock_quantity}
                value={quantity}
                onChange={handleQuantityChange}
                disabled={product.stock_quantity === 0}
                className="w-20"
              />
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart} 
              disabled={product.stock_quantity === 0}
              size="lg"
              className="w-full lg:w-auto flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock_quantity === 0 ? "Out of Stock" : "Add To Cart"}
            </Button>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8 ">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "This is a high-quality product designed to meet your needs. Crafted with attention to detail and built to last, this item offers excellent value and performance. Perfect for everyday use or special occasions."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span className="text-muted-foreground">{categoryName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Product ID</span>
                    <span className="text-muted-foreground font-mono">{product.product_id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Stock Quantity</span>
                    <span className="text-muted-foreground">{product.stock_quantity} units</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Price</span>
                    <span className="text-muted-foreground font-semibold">{product.price} Birr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Customer Reviews
                  <Badge variant="secondary">4.5/5</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">"Great product! Exactly as described and fast delivery."</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1,2,3,4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Sarah M.</span>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">"Good quality, would recommend to others."</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.filter(p => p.category_id === product.category_id && p.product_id !== product.product_id).slice(0, 4).map((relatedProduct) => (
            <Card key={relatedProduct.product_id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Link to={`/product/${relatedProduct.product_id}`}>
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-primary font-semibold">{relatedProduct.price} Birr</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

