import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { ShopContext } from '../../Context/ShopContext';
// import { useDispatch } from 'react-redux';
// import { addtoCart } from '../redux/cartSlice';
import { IoIosArrowForward } from 'react-icons/io';

const ProductDisplay = (props) => {
  
      const {product} = props;

      const { addToCart } = useContext(ShopContext);
      // const dispatch = useDispatch();

          // State to track the quantity of items to add to cart
    const [quantity, setQuantity] = useState(1);

    // Function to handle quantity change
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        // Ensure the value is at least 1
        if (value > 0) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };
    

  return (
    <div className='productdisplay' >
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
          <div className='breadcrum'>
          Home <IoIosArrowForward /> Shop <IoIosArrowForward /> {product.category} <IoIosArrowForward /> 
          {product.name}
        </div>  
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
            <GoStarFill />
            <GoStarFill />
            <GoStarFill />
            <GoStarFill />
            <GoStar />
            <p>(321)</p>
          </div>
          <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">${product.old_price}</div>
              <div className="productdisplay-right-price-new">${product.new_price}</div>         
          </div>
          <div className="productdisplay-right-description">
            wofvnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnbi vbdjhb vjdfbvhndvkkkkk      bvejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </div>
          {/* <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
            </div>
          </div> */}
           {/* Quantity input */}
           <div className='productdisplay-right-quantity'>
                    <label htmlFor='quantity'>Quantity:</label>
                    <input
                        type='number'
                        id='quantity'
                        min='1'
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>

          <button onClick={()=>{addToCart(product.id, quantity)}}>Add To Cart</button>
          <p className="productdisplay-right-category"><span>Category :</span>Women, T-Shirt, Crop Top</p>
          <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  );
}

export default ProductDisplay;

// <button onClick={() => dispatch(addtoCart({product}))}>Add To Cart</button>