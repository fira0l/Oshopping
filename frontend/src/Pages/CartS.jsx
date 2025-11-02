import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Trash2, ShoppingCart } from 'lucide-react';

const CartS = () => {
  const { getTotalCartAmount, allProducts, cartItems, removeFromCart, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const cartProducts = allProducts.filter(product => cartItems[product.product_id] > 0);
  const isEmpty = cartProducts.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        {!isEmpty && (
          <Badge variant="secondary" className="ml-2">
            {cartProducts.length} items
          </Badge>
        )}
      </div>

      {isEmpty ? (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <Card key={product.product_id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-muted-foreground">{product.price} Birr each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Qty: {cartItems[product.product_id]}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {product.price * cartItems[product.product_id]} Birr
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCart(product.product_id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{getTotalCartAmount()} Birr</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{getTotalCartAmount()} Birr</span>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartS;
