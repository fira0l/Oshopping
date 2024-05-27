import React from 'react';
import './CSS/Popup.css';
import oshopLogo from '../components/Assets/logo/oshop-logo.png';

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='pop-inner'>
        <div className='pop-inner-logo'>
          <img src={oshopLogo} alt='oshopLogo' />
          <div className='pop-inner-thanks'>
            <p>powered by oict solutions</p>
            <h1>Thank you for shopping with us. You're always welcome</h1>
          </div>
        </div>
        <h3 style={{color: 'blue', fontSize: '24px'}}>Order placed successfully!</h3>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button>
      </div>
    </div>
  ) : '';
}

export default Popup;
