import React, { useContext, useState } from 'react';
import './CSS/ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const ProductDisplay = () => {
  const { allProducts, allCategories, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const product = allProducts.find((e) => e.product_id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const category = allCategories.find(cat => cat.category_id === product.category_id);
  const categoryName = category ? category.name : 'Unknown Category';

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.stock_quantity) {
      setErrorMessage(`Only ${product.stock_quantity} item(s) available in stock.`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product.product_id, 1);
    }

    setQuantity(1);
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
          <Link to={`/category/${product.category_id}`}>{categoryName}</Link> <IoIosArrowForward />
          <span>{product.name}</span>
        </div>
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">{product.price} Birr</div>
        </div>
        <div className="productdisplay-right-description">
          <p className="productdisplay-right-stock">Stock Quantity: {product.stock_quantity}</p> 
        </div>
        <div className='productdisplay-right-quantity'>
          <label htmlFor='quantity'>Quantity:</label>
          <input
            type='number'
            id='quantity'
            min='1'
            value={quantity}
            onChange={handleQuantityChange}
            disabled={product.stock_quantity === 0} // Disable input if out of stock
          />
        </div>
        <button onClick={handleAddToCart} disabled={product.stock_quantity === 0}>Add To Cart</button> {/* Disable button if out of stock */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProductDisplay;

