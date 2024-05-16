import React from 'react';
import './Beauty.css'  
import beauty_image from '../Assets/home-new-bg-free-img.jpg'; 

const Beauty = () => {
  return (
    <div className='beauty' style={{backgroundImage: `url(${beauty_image})`}}>
      <div className='beauty-left'>
        <div className='beauty-latest-button-on'>
            <div>
              <p>Raining Offers For</p>
              <p>Cold Winter!</p>
              <h2>20-30% Off</h2>
            </div>
              <button>Shop Now</button>
          </div>
      </div>
    </div>
  );
}

export default Beauty;

