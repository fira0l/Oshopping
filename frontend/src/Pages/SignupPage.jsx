import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './CSS/Signup.css';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!,
    $password: String!,
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $phoneNumber: String!
  ) {
    registerUser(
      username: $username,
      password_hash: $password,
      email: $email,
      first_name: $firstName,
      last_name: $lastName,
      address: $address,
      phone_number: $phoneNumber
    ) {
      user_id
      first_name
    }
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-zA-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, email, firstName, lastName, address, phoneNumber } = formData;

    if (password === confirmPassword) {
      setPasswordsMatch(true);
      try {
        await registerUser({
          variables: {
            username,
            password,
            email,
            firstName,
            lastName,
            address,
            phoneNumber
          }
        });
      } catch (err) {
        console.error('Registration error:', err);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0: return 'gray';
      case 1: return 'red';
      case 2: return 'orange';
      case 3: return 'yellow';
      case 4: return 'green';
      default: return 'gray';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='body'>
      <div className="form_container active">
        <div className="signup_form">
          <form onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <div className="input_container">
              <div className="right_input">
                <div className="input_box">
                  <input 
                    type="text" 
                    name="username"
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                  />
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="input_box">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create your password" 
                    value={formData.password} 
                    onChange={(event) => {
                      const {  value } = event.target;
                      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
                      if (passwordPattern.test(value)) {
                        document.getElementById('passwordMessage').textContent = '';
                        handleChange(event);
                      } else {
                        document.getElementById('passwordMessage').textContent = 'Password must be at least 6 characters long and contain at least one letter, one number, and one special character.';
                      }
                      handleChange(event);
                    }} 
                    required 
                    onFocus={() => {
                      document.getElementById('passwordTooltip').style.display = 'block';
                    }}
                    onBlur={() => {
                      document.getElementById('passwordTooltip').style.display = 'none';
                    }}
                  />
                  <span
                      className={`toggle-password`}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  <div id="passwordTooltip" style={{ display: 'none', position: 'absolute', backgroundColor: '#f9f9f9', border: '1px solid #ccc', padding: '5px', zIndex: '1' }}>
                    Password must be at least 6 characters long and contain at least one letter, one number, and one special character.
                  </div>
                  <span id="passwordMessage"></span>
                </div>

                <div className="input_box">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword} 
                    onChange={(event) => {
                      const {  value } = event.target;
                      handleChange(event);
                      document.getElementById('confirmPasswordMessage').textContent = formData.password !== value ? 'Passwords do not match.' : '';
                    }} 
                    required 
                  />
                  <span
                    className={`toggle-password`}
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <span id="confirmPasswordMessage"></span>
                </div>
              </div>

              <div className="left_input">
                <div className="input_box">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="Enter your first name" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                  />
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Enter your last name" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required
                  />
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_box">
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Enter your address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required
                  />
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="input_box">
                  <input 
                    type="text" 
                    name="phoneNumber"
                    placeholder="Enter your phone number" 
                    value={formData.phoneNumber} 
                    onChange={(event) => {
                      const {  value } = event.target;
                      const phonePattern = /^\+?[0-9]*$/;
                      if (phonePattern.test(value)) {
                        handleChange(event);
                      }
                    }} 
                    required
                  />
                  <i className="fa-solid fa-phone"></i>
                </div>
              </div>
            </div>

            {!passwordsMatch && <div style={{ color: 'red' }}>Passwords do not match.</div>}

            <button type="submit">Signup</button>

            <div className="signup">
              Already have an account? <Link to="/login">Login</Link>
            </div>

            {data && <p>User registered successfully: {data.registerUser.first_name}</p>}
            {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
            {loading && <p>Submitting...</p>}

            <div>
              <label>Password Strength:</label>
              <input
                type="range"
                min="0"
                max="4"
                value={passwordStrength}
                readOnly
                style={{ color: getPasswordStrengthColor(passwordStrength)}}
              />
              <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                {passwordStrength === 1 && 'Weak'}
                {passwordStrength === 2 && 'Fair'}
                {passwordStrength === 3 && 'Good'}
                {passwordStrength === 4 && 'Strong'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
