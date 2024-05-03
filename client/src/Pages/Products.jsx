import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import {useParams} from 'react-router-dom';
// import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../components/RelatedProducts/RelatedProducts';


const Products = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === String(productId));

  return (
    <div>
      {/* <Breadcrum product={product}/> */}
      <ProductDisplay product={product}/>
      <DescriptionBox />
      {/* <RelatedProducts/> */}
    </div>
  );
}

export default Products;
