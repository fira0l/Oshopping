import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Popup from './Popup';
import { useMutation, useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import OrderHistory from './OrderHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, MapPin, CreditCard } from 'lucide-react';

const ORDER_API_URL = 'http://localhost:1000/order/orderProduct';

const GET_ORDER_HISTORY_BY_USER_ID = gql`
  query GetOrderHistoryByUserId($user_id: ID!) {
    orderNewsByUserId(user_id: $user_id) {
      order_new_id
      order_date
      status
      total_amount
      quantity
      unit_price
      product {
        name
        image
      }
      shipping_address
      shipping_city
      postal_code
    }
  }
`;

const DECREASE_STOCK_QUANTITY = gql`
  mutation DecreaseStockQuantity($product_id: ID!, $quantity: Int!) {
    decreaseStockQuantity(product_id: $product_id, quantity: $quantity) {
      product_id
      stock_quantity
    }
  }
`;

const Checkout = () => {
  const { user, cartItems, getTotalCartCount, getTotalCartAmount, allProducts, clearCart } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_ORDER_HISTORY_BY_USER_ID, {
    variables: { user_id: user ? user.user_id : null },
  });

  const [decreaseStockQuantity] = useMutation(DECREASE_STOCK_QUANTITY);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [billingData, setBillingData] = useState({
    shipping_address: '',
    shipping_city: '',
    postal_code: '',
    shipping_country: 'ETHIOPIA',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  useEffect(() => {
    console.log("User object:", user);
  }, [user]);

  useEffect(() => {
    validateBillingAndAmount();
  }, [billingData, getTotalCartAmount]);

  const handleBillingDataChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const validateBillingAndAmount = () => {
    const { shipping_address, shipping_city, postal_code, shipping_country, amount } = billingData;
    const newErrors = {};

    if (!shipping_address) newErrors.shipping_address = 'Shipping address is required.';
    if (!shipping_city) newErrors.shipping_city = 'Shipping city is required.';
    if (!postal_code) newErrors.postal_code = 'Postal code is required.';
    if (!shipping_country) newErrors.shipping_country = 'Shipping country is required.';
    if (!amount || parseFloat(amount) !== getTotalCartAmount()) {
      newErrors.amount = 'Amount does not match the total cart amount.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateBillingAndAmount() || getTotalCartCount() === 0) return;

    try {
      const { shipping_address, shipping_city, postal_code, shipping_country } = billingData;

      const orderPromises = Object.keys(cartItems).map(async (itemId) => {
        const product = allProducts.find(p => p.product_id === itemId);
        if (product && cartItems[itemId] > 0) {
          const total_amount = cartItems[itemId] * product.price;
          const orderData = {
            user_id: user.user_id,
            product_id: itemId,
            total_amount,
            shipping_address,
            shipping_city,
            postal_code,
            quantity: cartItems[itemId],
            unit_price: product.price,
            shipping_country
          };

          console.log("Order Data:", orderData);

          const config = {
            headers: {
              Authorization: `${authToken}`,
              'Content-Type': 'application/json'
            }
          };

          await axios.post(ORDER_API_URL, orderData, config);
          await decreaseStockQuantity({ variables: { product_id: itemId, quantity: cartItems[itemId] } });
        }
      });

      await Promise.all(orderPromises);

      setButtonPopup(true);
      clearCart();
      setBillingData({
        shipping_address: '',
        shipping_city: '',
        postal_code: '',
        shipping_country: 'ETHIOPIA',
        amount: ''
      });
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setErrors(prev => ({ ...prev, general: 'An error occurred while placing the order. Please try again.' }));
      }
    }
  };

  const toggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-60 mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>
      
      {!showOrderHistory && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Billing Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="shipping_address" className="text-sm font-medium">Shipping Address *</label>
                    <Input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      placeholder="House number and street name"
                      required
                      value={billingData.shipping_address}
                      onChange={handleBillingDataChange}
                    />
                    {errors.shipping_address && <p className="text-sm text-destructive">{errors.shipping_address}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="shipping_city" className="text-sm font-medium">Shipping City *</label>
                    <Input
                      type="text"
                      id="shipping_city"
                      name="shipping_city"
                      required
                      value={billingData.shipping_city}
                      onChange={handleBillingDataChange}
                    />
                    {errors.shipping_city && <p className="text-sm text-destructive">{errors.shipping_city}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="postal_code" className="text-sm font-medium">Postal Code *</label>
                    <Input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      required
                      value={billingData.postal_code}
                      onChange={handleBillingDataChange}
                    />
                    {errors.postal_code && <p className="text-sm text-destructive">{errors.postal_code}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="shipping_country" className="text-sm font-medium">Shipping Country *</label>
                    <Input
                      type="text"
                      id="shipping_country"
                      name="shipping_country"
                      value={billingData.shipping_country}
                      onChange={handleBillingDataChange}
                    />
                    {errors.shipping_country && <p className="text-sm text-destructive">{errors.shipping_country}</p>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Total Items</span>
                    <Badge variant="secondary">{getTotalCartCount()}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-primary">{getTotalCartAmount()} Birr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Confirm Amount *
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Enter total amount"
                    value={billingData.amount}
                    onChange={handleBillingDataChange}
                  />
                  {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                </div>

                {getTotalCartCount() > 0 ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    Please add items to your cart before placing an order
                  </p>
                )}

                {errors.general && <p className="text-sm text-destructive text-center">{errors.general}</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <OrderHistory
        orders={data ? data.orderNewsByUserId : []}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        loading={loading}
        error={error}
        toggleOrderHistory={toggleOrderHistory}
        showOrderHistory={showOrderHistory}
        user={user}
        data={data}
      />

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
};

export default Checkout;
           
