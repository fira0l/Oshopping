import React from 'react';
import './Breadcrum.css';
import { IoIosArrowForward } from "react-icons/io";

const Breadcrum = (props) => {
  const {product} = props;
  return (
    <div className='breadcrum'>
      <div className='breadcrum'>
      Home <IoIosArrowForward /> Shop <IoIosArrowForward /> {product.category} <IoIosArrowForward /> 
      {product.id}
    </div>                 
    </div>
  );
}

export default Breadcrum;
