import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';


const Products = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === String(productId));

  return (
    <div>
      <ProductDisplay product={product}/>
      <DescriptionBox />
    </div>
  );
}

export default Products;
