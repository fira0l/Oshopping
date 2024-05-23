import React, { useState, useContext } from 'react';
import './CSS/Signup.css';
import login_image from '../components/Assets/background/login-page-2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { ShopContext } from '../Context/ShopContext';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!,
    $password_hash: String!,
    $email: String!,
    $first_name: String!,
    $last_name: String!,
    $address: String!,
    $phone_number: String!
  ) {
    registerUser(
      username: $username,
      password_hash: $password_hash,
      email: $email,
      first_name: $first_name,
      last_name: $last_name,
      address: $address,
      phone_number: $phone_number
    ) {
      user_id
      username
      email
      first_name
      last_name
      address
      phone_number
    }
  }
`;

const SignUp = () => {
  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      setUser(data.registerUser);
      navigate('/checkout');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      registerUser({ 
        variables: { 
          username,
          password_hash: password,
          email,
          first_name: firstName,
          last_name: lastName,
          address,
          phone_number: phoneNumber
        } 
      });
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className='body' style={{backgroundImage: `url(${login_image})`}}>
      <div className="form_container active">
        <div className="signup_form">
          <form onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <div className="input_container">
              <div className="right_input">
                <div className="input_box">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                  />
                  <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                  <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="password" 
                    placeholder="Create your password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>

              <div className="left_input">
                <div className="input_box">
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="text" 
                    placeholder="Enter your billing address" 
                    value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="text" 
                    placeholder="Enter your phone number" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)} 
                    required 
                  />
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>
            </div>

            {!passwordsMatch && <div style={{ color: 'red' }}>Passwords do not match.</div>}

            <button type="submit" disabled={loading}>Signup</button>

            <div className="signup">
              Already have an account? <Link to="/login">Login</Link>
            </div>
            {error && <p style={{ color: 'red' }}>Submission error! {error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
