import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../components//Assets/imagesAz/icons/icons8-drop-down-30.png';
import ItemSe from '../components/Items/ItemSe';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt=''/>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> Out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt=''/>
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, i)=>{
          if (props.category === item.category) {
            return <ItemSe key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
           else {
            return null;
           }
           
        })}
      </div>
      {/* <div className="shopcategory-loadmore">
        Show More
      </div> */}
    </div>
  );
}

export default ShopCategory;
