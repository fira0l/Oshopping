import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import './Popular.css';

const Popular = () => {
  const { allProducts } = useContext(ShopContext);

  // Filter products by category ID 1
  const filteredProducts = allProducts.filter(product => parseInt(product.category_id) === 1);

  console.log("Filtered Products:", filteredProducts); // Debugging

  return (
    <div className='popular'>
      <h1>Featured Products</h1>
      <h3>This Summer 30% Off</h3>
      <div className='popular-item'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.product_id} className='product-card'>
              <Link to={`/product/${product.product_id}`}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Price:  {product.price}Birr</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found for category ID 1.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;
