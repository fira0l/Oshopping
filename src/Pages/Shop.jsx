import React from 'react';
import Beauty from '../components/Beauty/Beauty';
import Popular from '../components/Popular/Popular';
import Offers from '../components/Offers/Offers';
import NewCollections from '../components/NewCollections/NewCollections';
import NewsLetter from '../components/NewsLetter/NewsLetter';


const Shop = () => {
  return (
    <div>
      <Beauty />
      <Popular />
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  );
}

export default Shop;
