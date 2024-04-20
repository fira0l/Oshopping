import React from 'react';
import CartItem from '../components/redux/CartItem';


const CartS = () => {
  return (
    <div>
      <CartItem/>
    </div>
  );
}

export default CartS;



// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './CSS/CartS.css';
// import { removefromCart } from '../components/redux/cartSlice';
// // const CartS = (props) => {
// //   const {product} = props;

// const CartS = () => {

//   const cartItems = useSelector(state => state.cart.cart);
//   const dispatch = useDispatch();
//   return (
//     <div className='cart-items'>
//       <h2>Cart Items</h2>
//       {
//         cartItems.map(item => {
//           return(
//             <div className='d-flex'>
//               <img src={item.image} className='c-image' alt="" />
//               <div>
//                 <h1>{item.name}</h1>
//                 <button className='btn btn-warning btn-sm'
//                   onClick={() => dispatch(removefromCart({id: item.id}))}
//                 >Remove</button>
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//   );
// }

// export default CartS;
