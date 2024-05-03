import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import ItemSe from '../Items/ItemSe';

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr/>
      <div className="relatedproducts-item">
        {data_product.map((item,i)=>{
           return <ItemSe key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />   
        })}
      </div>
    </div>
  );
}

export default RelatedProducts;
