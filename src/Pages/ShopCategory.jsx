import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import { MdKeyboardArrowRight } from "react-icons/md";
import ItemSe from '../components/Items/ItemSe';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category' >
      <img className='shopcategory-banner' src={props.banner} alt=''/>
      <div className="shopcategory-indexSort">
        <p>
          {/* <span>Showing ___ </span> Out of ___ Products */}
        </p>
        <div className='group text-white w-fit px-6 py-3 my-2 flex   items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'> 
                 Sort By
                 <span className='group-hover:rotate-90 duration-300'>
                   <MdKeyboardArrowRight size={25} className='ml-1'/>
                </span>             
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



// <div>
//               <Link to='portfolio' smooth duration={500} className='group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'> 
//                  Sort By
//                  <span className='group-hover:rotate-90 duration-300'>
//                    <MdKeyboardArrowRight size={25} className='ml-1'/>
//                  </span>
//               </Link>
//             </div> 