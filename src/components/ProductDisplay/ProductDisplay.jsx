import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.product_id, 1); // Add one item to the cart 'quantity' times
    }
    setQuantity(1); // Reset quantity after adding to cart
  };
  

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <div className='breadcrum'>
          <Link to="/">Home</Link> <IoIosArrowForward /> 
          <Link to="/shop">Shop</Link> <IoIosArrowForward /> 
          <Link to={`/category/${product.category_id}`}>{product.category_id}</Link> <IoIosArrowForward /> 
          <span>{product.name}</span>
        </div>
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">{product.price}Birr</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
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
        <button onClick={handleAddToCart}>Add To Cart</button>
        <p className="productdisplay-right-category"><span>Category :</span> {product.category_id}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
