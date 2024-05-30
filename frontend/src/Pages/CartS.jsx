import React, { useContext } from 'react';
import './CSS/CartS.css';
import { ShopContext } from '../Context/ShopContext';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className='cartitems'>
      <h1>Cart</h1>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProducts.map((product) => {
        if (cartItems[product.product_id] > 0) {
          return (
            <div key={product.product_id}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={product.image} alt="" className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>{product.price}Birr</p>
                <button className='cartitems-quantity'>{cartItems[product.product_id]}</button>
                <p>{product.price * cartItems[product.product_id]}Birr</p>
                <FaTimes onClick={() => removeFromCart(product.product_id)} className='cartitems-remove-icon' />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}Birr</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartAmount()}Birr</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartS;
