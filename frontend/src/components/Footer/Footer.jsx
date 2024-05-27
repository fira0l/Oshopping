import React from 'react';
import './Footer.css';
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
      <hr />
      <div className='footer-up'> 
        <div className="footer-logo">
          <p>OShop</p>
          <h2>The best look anytime, anywhere</h2>
        </div>
        
        <div className='for-him'>
          <h1>For Him</h1>
          <ul>
            <li>Men Jeans</li>
            <li>Men Shirts</li>
            <li>Men Shoes</li>
            <li>Men Accessories</li>
            <li>Men Jackets</li>
          </ul>
        </div>

        <div className='for-her'>
          <h1>For Her</h1>
          <ul>
            <li>Women Jeans</li>
            <li>Tops and Shirts</li>
            <li>Heels and Flats</li>
            <li>Women Accessories</li>
            <li>Women Jackets</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-copright">
        <hr/>
        <div className='footer-copyright'>
          <p>Copyright ©2024 Oshop. Powered by OICT. </p> 
        </div>

        <div className="footer-social-icon">
          <div className="footer-icons-container">
            <a href="https://www.linkedin.com/in/firaol-anbessa-2429b2212" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://www.facebook.com/letera.mengistu" target="_blank" rel="noopener noreferrer">
              <FaFacebook />  
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="http://www.instagram.com/firaolanbessa8" target="_blank" rel="noopener noreferrer">
              <FaInstagramSquare />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://www.x.com/FiraValorant" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://t.me/Theotokos_ICU" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;