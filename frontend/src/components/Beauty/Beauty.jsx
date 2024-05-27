import React from 'react';
import './Beauty.css';  
import beauty_image from '../Assets/home-new-bg-free-img.jpg'; 
import { useNavigate } from 'react-router-dom';

const Beauty = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className='beauty' style={{backgroundImage: `url(${beauty_image})`}}>
      <div className='beauty-left'>
        <div className='beauty-latest-button-on'>
          <div>
            <p>Welcome to Oshop</p>
            <p>Shop With Us </p>
          </div>
          <div>
            <h2>Newsletter</h2>
            <button onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beauty;
