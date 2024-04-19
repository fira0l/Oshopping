import React from 'react';
import './Items.css';


const Items = (props) => {
  return (
    <div className='item'>
      <img className='item-image' src={props.image} alt=''/>
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

export default Items;
