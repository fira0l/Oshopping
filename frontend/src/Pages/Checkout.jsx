import React, { useContext, useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { useMutation, gql } from '@apollo/client';
import Popup from './Popup';

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

const Checkout = () => {
  const { user, cartItems, getTotalCartCount, getTotalCartAmount, allProducts, clearCart } = useContext(ShopContext);
  const [orderProduct] = useMutation(ORDER_PRODUCT);
  const [decreaseStockQuantity] = useMutation(DECREASE_STOCK_QUANTITY);

  const [billingData, setBillingData] = useState({
    shipping_address: '',
    shipping_city: '',
    postal_code: '',
    shipping_country: 'ETHIOPIA',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    validateBillingAndAmount();

    if (Object.keys(errors).length === 0 && getTotalCartCount() > 0) {
      try {
        const { shipping_address, shipping_city, postal_code, shipping_country } = billingData;
        const status = "pending"; // Set status to "pending"

        const orderPromises = Object.keys(cartItems).map(async (itemId) => {
          const product = allProducts.find(p => p.product_id === itemId);
          if (product && cartItems[itemId] > 0) {
            const total_amount = cartItems[itemId] * product.price;
            return orderProduct({
              variables: {
                user_id: user.user_id,
                product_id: itemId,
                status,
                total_amount,
                shipping_address,
                shipping_city,
                postal_code,
                quantity: cartItems[itemId],
                unit_price: product.price,
                shipping_country
              }
            }).then(() => ({
              ...product,
              quantity: cartItems[itemId],
              total_price: total_amount
            })).then(() => decreaseStockQuantity({
              variables: {
                product_id: itemId,
                quantity: cartItems[itemId]
              }
            }));
          }
        });

        const orderedProducts = await Promise.all(orderPromises);

        setOrderedProducts(orderedProducts.filter(p => p)); 
        setTotalOrderAmount(getTotalCartAmount()); 
        setButtonPopup(true); 

        clearCart(); // Clear the cart
        setBillingData({
          shipping_address: '',
          shipping_city: '',
          postal_code: '',
          shipping_country: 'ETHIOPIA',
          amount: ''
        }); // Clear the billing data
      } catch (error) {
        console.error('Error placing order:', error);
        setErrors(prev => ({ ...prev, general: 'An error occurred while placing the order. Please try again.' }));
      }
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

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

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3 style={{color: 'blue', fontSize: '24px'}}>Order placed successfully!</h3>
        <div className="ordered-products-summary">
          <p>Total Amount: {totalOrderAmount} Birr</p>
          {orderedProducts.map((product, index) => (
            <div key={index} className="ordered-product">
              <img src={product.image} alt={product.name} />
              <div>
                <p>{product.name}</p>
                <p>{product.price} Birr</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total Price: {product.total_price} Birr</p>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default Checkout;
