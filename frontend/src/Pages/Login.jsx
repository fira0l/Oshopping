import React, { useState, useContext } from 'react';
import './CSS/Login.css';
import login_image from '../components/Assets/background/login-page-2.jpg';
import { FaUser } from 'react-icons/fa6';
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { ShopContext } from '../Context/ShopContext';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user_id
      username
      email
      first_name
      last_name
      address
      phone_number
      registration_date
    }
  }
`;

const Login = () => {
  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const { data } = await loginUser({ variables: { username, password } });
      setUser(data.login); // Store user in context
      navigate('/checkout');
    } catch (error) {
      setErrorMessage('Incorrect username or password. Please try again.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className='body' style={{backgroundImage: `url(${login_image})`}}>
      <div className="box">
        <span className="borderLine"></span>

        <form onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Username<FaUser/></span>
            <i className='bx bxs-user'></i>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password <IoMdLock/></span>
            <i className='bx bxs-lock-alt'></i>
          </div>

          <div className="remember-forgot">
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password</Link>
            </div>
          </div>

          {errorMessage && <div className="error-message error">{errorMessage}</div>}
          <button type="submit" className='btn' disabled={loading}>Login</button>

          <div className="register-link">
            <p>Don't have an account?</p>
            <h2><Link to="/signup">Sign Up</Link></h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
