import React, { useContext, useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import Popup from './Popup';
import { useMutation, useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import OrderHistory from './OrderHistory';

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
  }, [billingData]);

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
    <div className="checkout">
      <h2>Checkout</h2>
      {!showOrderHistory && (
        <div className="lefty">
          <div className="checkout-left">
            <h2>Billing Details</h2>
            <form>
              <div className="form-group">
                <label htmlFor="shipping_address">Shipping Address *</label>
                <input
                  type="text"
                  id="shipping_address"
                  name="shipping_address"
                  placeholder="House number and street name"
                  required
                  value={billingData.shipping_address}
                  onChange={handleBillingDataChange}
                />
                {errors.shipping_address && <p className="error">{errors.shipping_address}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="shipping_city">Shipping City *</label>
                <input
                  type="text"
                  id="shipping_city"
                  name="shipping_city"
                  required
                  value={billingData.shipping_city}
                  onChange={handleBillingDataChange}
                />
                {errors.shipping_city && <p className="error">{errors.shipping_city}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="postal_code">Postal Code *</label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  required
                  value={billingData.postal_code}
                  onChange={handleBillingDataChange}
                />
                {errors.postal_code && <p className="error">{errors.postal_code}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="shipping_country">Shipping Country *</label>
                <input
                  type="text"
                  id="shipping_country"
                  name="shipping_country"
                  value={billingData.shipping_country}
                  onChange={handleBillingDataChange}
                />
                {errors.shipping_country && <p className="error">{errors.shipping_country}</p>}
              </div>
                          </form>
          </div>

          <div className="checkout-right">
            <div className="cartitems-total">
              <h1>Cart Total</h1>
              <div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>{getTotalCartAmount()} Birr</h3>
                </div>
              </div>
              <div className="cartitems-total-item">
                <h3>Total Items</h3>
                <h3>{getTotalCartCount()}</h3>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Enter Total Amount *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={billingData.amount}
                  onChange={handleBillingDataChange}
                />
                {errors.amount && <p className="error">{errors.amount}</p>}
              </div>

              {/* <button
                className="btn"
                type="submit"
                onClick={handlePlaceOrder}
                disabled={getTotalCartCount() === 0} // Disable the button if cart is empty

              >
                Place Order
              </button> */}

              {getTotalCartCount() > 0 ? (
                <button
                  className="btn"
                  type="submit"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              ) : (
                <p>Please add items to your cart before placing an order</p>
              )}

              {errors.general && <p className="error">{errors.general}</p>}
            </div>
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
           
