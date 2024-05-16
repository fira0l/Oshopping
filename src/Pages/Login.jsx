import React from 'react';
import './CSS/Login.css';
import login_image from '../components/Assets/background/login-page-2.jpg';
import { FaUser } from 'react-icons/fa6';
import { IoMdLock } from "react-icons/io";
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <div className='body' style={{backgroundImage: `url(${login_image})`}}>
      <div className="box">
        <span className="borderLine"></span>

        <form >
          <h2>Sign in</h2>
          <div className="inputBox">
            <input type="text" required='required' />
            <span>Username or Email <FaUser/></span>
            <i className='bx bxs-user'></i>
          </div>

          <div className="inputBox">
            <input type="password" required='requied'/>
            <span>Password <IoMdLock/></span>
            <i className='bx bxs-lock-alt'></i>
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="forgot-password">
             <Link to="/forgot">Forgot Password</Link>
            </div>
          </div>

          <button type="submit" className='btn'>Login</button>

          <div className="register-link">
             <p>Don't have an account?</p>
             <h2> <Link to="/signup">Sign Up</Link> </h2>
          </div>


        </form>
      </div>
    </div>
  );
}

export default Login;




