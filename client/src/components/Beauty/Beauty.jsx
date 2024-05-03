import React from 'react';
import './Beauty.css'   //Hero.css
import arrow_icon from  '../Assets/imagesAz/icons/icons8-right-arrow-30.png';
import beauty_image from '../Assets/home-new-bg-free-img.jpg'; 

const Beauty = () => {
  return (
    <div className='beauty' style={{backgroundImage: `url(${beauty_image})`}}>
      <div className='beauty-left'>
        <h2>New Arrivals Only</h2>
      <div className="beauty-latest-button">
          <div>Latest collection</div>
          <img src={arrow_icon} alt='' />
          
        </div>
        <div className='beauty-latest-button-on'>
            <div>
              <p>Raining Offers For</p>
              <p>Hot Summer!</p>
              <h2>20-30% Off</h2>
            </div>
              <button>Shop Now</button>
          </div>
      </div>
    </div>
  );
}

export default Beauty;

