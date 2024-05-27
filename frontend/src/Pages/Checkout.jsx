import React, { useContext, useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { useMutation, useQuery, gql } from '@apollo/client';
import Popup from './Popup';
import moment from 'moment';
import OrderHistory from './OrderHistory';

const ORDER_PRODUCT = gql`
  mutation OrderProduct(
    $user_id: ID!,
    $product_id: ID!,
    $status: String!,
    $total_amount: Float!,
    $shipping_address: String!,
    $shipping_city: String!,
    $postal_code: String!,
    $quantity: Int!,
    $unit_price: Float!,
    $shipping_country: String!
  ) {
    orderProduct(
      user_id: $user_id,
      product_id: $product_id,
      status: $status,
      total_amount: $total_amount,
      shipping_address: $shipping_address,
      shipping_city: $shipping_city,
      postal_code: $postal_code,
      quantity: $quantity,
      unit_price: $unit_price,
      shipping_country: $shipping_country
    ) {
      order_new_id
      user_id
      product_id
      order_date
      status
      total_amount
      quantity
      unit_price
      shipping_address
      shipping_city
      postal_code
      shipping_country
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

const Checkout = () => {
  const { user, cartItems, getTotalCartCount, getTotalCartAmount, allProducts, clearCart } = useContext(ShopContext);
  const [orderProduct] = useMutation(ORDER_PRODUCT);
  const [decreaseStockQuantity] = useMutation(DECREASE_STOCK_QUANTITY);
  const [currentPage, setCurrentPage] = useState(1); 
  const { loading, error, data } = useQuery(GET_ORDER_HISTORY_BY_USER_ID, {
    variables: { user_id: user ? user.user_id : null }, // Ensure user is not null
  });

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
  const [showOrderHistory, setShowOrderHistory] = useState(false);

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
  };

  const statusTimeline = [
    { status: 'Processing', daysOffset: 0 },
    { status: 'Shipped', daysOffset: 1 },
    { status: 'Out for Delivery', daysOffset: 2 },
    { status: 'Delivered', daysOffset: 3 },
  ];

// Define function to get current status
const getCurrentStatus = (orderDate) => {
  const today = moment();
  for (let i = statusTimeline.length - 1; i >= 0; i--) {
    const statusDate = moment(orderDate).add(statusTimeline[i].daysOffset, 'days');
    if (today.isSameOrAfter(statusDate, 'day')) {
      return statusTimeline[i].status;
    }
  }
  return 'Processing';
};

const handlePlaceOrder = async (e) => {
  e.preventDefault();
  validateBillingAndAmount();

  if (Object.keys(errors).length === 0 && getTotalCartCount() > 0) {
    try {
      const { shipping_address, shipping_city, postal_code, shipping_country } = billingData;

      const orderPromises = Object.keys(cartItems).map(async (itemId) => {
        const product = allProducts.find(p => p.product_id === itemId);
        if (product && cartItems[itemId] > 0) {
          const total_amount = cartItems[itemId] * product.price;
          const orderDate = moment(); // Assuming order date is current date for simplicity, replace it with the actual order date if available
          return orderProduct({
            variables: {
              user_id: user.user_id,
              product_id: itemId,
              status: getCurrentStatus(orderDate),
              total_amount,
              shipping_address,
              shipping_city,
              postal_code,
              quantity: cartItems[itemId],
              unit_price: product.price,
              shipping_country
            }
          }).then(() => decreaseStockQuantity({
            variables: {
              product_id: itemId,
              quantity: cartItems[itemId]
            }
          }));
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

              <button
                className="btn"
                type="submit"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

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
