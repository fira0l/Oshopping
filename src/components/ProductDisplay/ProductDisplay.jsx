import React, { useContext } from 'react';
import './ProductDisplay.css';
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { ShopContext } from '../../Context/ShopContext';
// import { useDispatch } from 'react-redux';
// import { addtoCart } from '../redux/cartSlice';


const ProductDisplay = (props) => {
  
      const {product} = props;

      const { addToCart } = useContext(ShopContext);
      // const dispatch = useDispatch();

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
            <GoStarFill />
            <GoStarFill />
            <GoStarFill />
            <GoStarFill />
            <GoStar />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">${product.old_price}</div>
              <div className="productdisplay-right-price-new">${product.new_price}</div>         
          </div>
          <div className="productdisplay-right-description">
            wofvnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnbi vbdjhb vjdfbvhndvkkkkk      bvejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
            </div>
          </div>
          <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
          <p className="productdisplay-right-category"><span>Category :</span>Women, T-Shirt, Crop Top</p>
          <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  );
}

export default ProductDisplay;

// <button onClick={() => dispatch(addtoCart({product}))}>Add To Cart</button>