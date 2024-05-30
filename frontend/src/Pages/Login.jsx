import React, { useState, useContext } from 'react';
import './CSS/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { ShopContext } from '../Context/ShopContext';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user { 
        user_id
        username
        email
        first_name
        last_name
        address
        phone_number
        registration_date
      }
      token
    }
  }
`;

const Login = () => {
  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const { data } = await loginUser({ variables: { username, password } });
  
      if (data && data.login && data.login.token) {
        const authToken = data.login.token;
        localStorage.setItem('authToken', authToken);
        
        setUser(data.login.user); // Store user in context
        navigate('/checkout');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setErrorMessage('Incorrect username or password. Please try again.');
      setUsername('');
      setPassword('');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='body'>
      <div className="box">
        <form onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input
              type="text"
              placeholder='username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputBox">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="remember-forgot">
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
          </div>

          {errorMessage && <div className="error-message error">{errorMessage}</div>}
          <button type="submit" className='btn' disabled={loading}>Login</button>

          <div className="register-link">
            <p>Don't have an account?</p>
            <h3><Link to="/signup">Sign Up</Link></h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
