import React, { useContext } from 'react';
import './CartItems.css';
import { FaTimes } from "react-icons/fa";
import { removefromCart } from './cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ShopContext } from '../../Context/ShopContext';


const CartItems = () => {
  
  const {all_product } = useContext(ShopContext);

  const cartItems = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  return (
    <div className='cartitems'>
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
            <div className='cartitems-format'>
              <img src={e.image} alt=""  className='carticon-product-icon'/>
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              <p>{e.new_price*cartItems[e.id]}</p>
              <FaTimes onClick={() => dispatch(removefromCart(e.id))}/>
            </div>
            <hr />
          </div>
        }
      })}

    </div>
  );
}

export default CartItems;
