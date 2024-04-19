import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/imagesAz/logo/icons8-shopping-bag-94.png';
import instagram from '../Assets/imagesAz/social/instagram.png';
import facebook from '../Assets/imagesAz/social/facebook.png';
import linkedin from '../Assets/imagesAz/social/LinkedIn.png';
import telegram from '../Assets/imagesAz/social/Telegram.png';
import twitter from '../Assets/imagesAz/social/Twitter.png';
import pinterest from '../Assets/imagesAz/social/pinterest.png';


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt=''/>
        <p>OShop</p>
      </div>
      {/* <ul className='footer-links'>
          <li>Company</li>
          <li>Products</li>
          <li>Offices</li>
          <li>About</li>
          <li>Contact</li>
        </ul> */}
        <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={linkedin} alt=''/>
          </div>
          <div className="footer-icons-container">
            <img src={pinterest} alt=''/>
          </div>
          <div className="footer-icons-container">
            <img src={instagram} alt=''/>
          </div>
          <div className="footer-icons-container">
            <img src={telegram} alt=''/>
          </div>
          <div className="footer-icons-container">
            <img src={facebook} alt=''/>
          </div>
          <div className="footer-icons-container">
            <img src={twitter} alt=''/>
          </div>
        </div>
        <div className="footer-copright">
          <hr/>
          <p>Copyright ©2024 Oshop. Powered by OICT. </p>
        </div>
    </div>
  );
}

export default Footer;



//         <h2>The best look anytime, anywhere</h2>
//       </div>
//       <div className="newsletter-midleft">
//         <h2>For Her</h2>
        
//       </div>