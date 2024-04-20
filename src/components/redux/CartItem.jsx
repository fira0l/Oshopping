import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { FaTimes } from 'react-icons/fa';


const CartItem = () => {
   const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <h1>CART</h1>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
          return       <div>
            <div className='cartitems-format  cartitems-format-main'>
              <img src={e.image} alt=""  className='carticon-product-icon'/>
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              <p>${e.new_price*cartItems[e.id]}</p>
              <FaTimes onClick={() => (removeFromCart(e.id))} className='cartitems-remove-icon'/>
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
