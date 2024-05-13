import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from './Assets/imagesAz/logo/icons8-shopping-bag-94.png';
import cart_icon from './Assets/imagesAz/icons/icons8-shopping-cart-50.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { getTotalCartCount } = useContext(ShopContext);
  const [nav, setNav] = useState(false); // State variable to track menu visibility

  // Function to toggle the navigation menu
  const toggleNav = () => {
    setNav((prevNav) => !prevNav);
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
        <li><Link className="link" to="/">All</Link></li>
        <li><Link className="link" to="/men">Men</Link></li>
        <li><Link className="link" to="/women">Women</Link></li>
        <li><Link className="link" to="/kids">Kids</Link></li>
        <li><Link className="link" to="/house">Appliances</Link></li>
      </ul>

      <div className="nav-login-cart">
        <Link className="link" to="/contactus"><h5 className="contact-us">Contact Us</h5></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
          <div className="nav-cart-count">{getTotalCartCount()}</div>
        </Link>
      </div>

      {/* Mobile menu */}
      {nav && (
        <ul className="mobile-menu">
          <li><Link className="link" to="/" onClick={toggleNav}>All</Link></li>
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
            <Link onClick={toggleNav} to="/login">
              Login
            </Link>
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


// import React, { useState } from 'react';
// import './Navbar.css';
// import logo from './Assets/imagesAz/logo/icons8-shopping-bag-94.png';
// import cart_icon from './Assets/imagesAz/icons/icons8-shopping-cart-50.png';
// import {Link} from 'react-scroll';

// const Navbar = () => {

//     const links=[
//       {
//         id:1,
//         link: 'Shop'
//       },
//       {
//         id:2,
//         link: 'Men'
//       },
//       {
//         id:3,
//         link: 'Women'
//       },
//       {
//         id:4,
//         link: 'Kids'
//       },
//       {
//         id:5,
//         link: 'House'
//       }
//     ]
    

//     return (

//     <div className='navbar'>
//       <div className='nav-logo'>
//         <img src={logo} alt=''/>
//         <p>OShop</p>
//       </div>

//       <ul className='nav-menu'>

//         {links.map(({id, link}) => (
//           <li key={id}>
//           <Link to={link}  smooth duration={500}>
//             {link}
//           </Link>
//         </li>
//         ))}

//       </ul>

//       <div className='nav-login-cart'>
//         <Link to='/contactus'><h5 className='contact-us'>Contact Us</h5></Link>
//         <Link to='/login'><button>Login</button></Link>
//         <Link to='/cart'> <img src={cart_icon} alt=''/></Link>
//         <div className='nav-cart-count'>0</div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
 

