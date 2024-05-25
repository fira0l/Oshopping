import React from 'react';
import './Beauty.css'  
import beauty_image from '../Assets/home-new-bg-free-img.jpg'; 

const Beauty = () => {
  return (
    <div className='beauty' style={{backgroundImage: `url(${beauty_image})`}}>
      <div className='beauty-left'>
        <div className='beauty-latest-button-on'>
            <div>
              <p>Welcome to Oshop</p>
              <p>Shop With Us </p>
              <h2>Enjoy your stay</h2>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Beauty;

