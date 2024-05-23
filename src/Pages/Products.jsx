import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Products = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  // console.log("Product ID from URL:", productId);
  // console.log("All products:", allProducts);

  const product = allProducts.find((e) => e.product_id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDisplay product={product}/>
    </div>
  );
}

export default Products;
