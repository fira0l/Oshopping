//FOR NEWCOLLECTIONS   RESIZE   .item-imag {
//     max-width: 70%;
//     max-height: 50%;
//     display: block; 
// }
import React from 'react';
import './ItemsSe.css';
import { Link } from 'react-router-dom';


const ItemSe = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img className='item-imag' src={props.image} alt='' onClick={window.scrollTo(0,0)}/></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
      
    </div>
  );
}

export default ItemSe;

