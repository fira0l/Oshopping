import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from './Assets/logo/icons8-shopping-bag-94.png';
import cart_icon from './Assets/icons/icons8-shopping-cart-50.png';
import { Link,  useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { getTotalCartCount, user, setUser } = useContext(ShopContext);
  const [nav, setNav] = useState(false); 
  const navigate = useNavigate();

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setNav((prevNav) => !prevNav);
  };

  // Function to handle logout
  const handleLogout = () => {
    navigate('/');
    setUser(null); // Clear the user context
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>OShop</p>
      </div>

      {/* Hamburger menu icon for mobile view */}
      <div onClick={toggleNav} className="hamburger-menu  md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Navigation menu for desktop view */}
      <ul className={`nav-menu ${nav ? 'open' : ''}`}>
        <li><Link className="link" to="/">Home</Link></li>
        <li><Link className="link" to="/men">Men</Link></li>
        <li><Link className="link" to="/women">Women</Link></li>
        <li><Link className="link" to="/kids">Kids</Link></li>
        <li><Link className="link" to="/house">Appliances</Link></li>
      </ul>

      <div className="nav-login-cart">
        <Link className="link" to="/contactus"><h5 className="contact-us">Contact Us</h5></Link>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
          <div className="nav-cart-count">{getTotalCartCount()}</div>
        </Link>
      </div>

      {/* Mobile menu */}
      {nav && (
        <ul className="mobile-menu">
          <li><Link className="link" to="/" onClick={toggleNav}>Home</Link></li>
          <li><Link className="link" to="/men" onClick={toggleNav}>Men</Link></li>
          <li><Link className="link" to="/women" onClick={toggleNav}>Women</Link></li>
          <li><Link className="link" to="/kids" onClick={toggleNav}>Kids</Link></li>
          <li><Link className="link" to="/house" onClick={toggleNav}>Appliances</Link></li>
          <li className="mobile-login-cart">
            <Link onClick={toggleNav} to="/contactus">
              Contact Us
            </Link>
          </li>
          <li className="mobile-login-cart">
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link onClick={toggleNav} to="/login">
                Login
              </Link>
            )}
          </li>
          <li className="mobile-login-cart">
            <Link onClick={toggleNav} to="/cart">
              <img src={cart_icon} alt="" />
              <span className="nav-cart-count"> {getTotalCartCount()} </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
