import React, { useState } from 'react';
import './CSS/Signup.css';
import login_image from '../components/Assets/background/login-page-2.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Passwords match, proceed with signup
      console.log('Passwords match. Ready to submit.');
    } else {
      // Passwords don't match, show error message
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
                  <input type="username" placeholder="Username" required />
                  <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="input_box">
                  <input type="email" placeholder="Enter your email" required />
                  <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="input_box">
                  <input type="password" placeholder="Create your password" value={password} onChange={handlePasswordChange} required />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>

              <div className="left_input">
                <div className="input_box">
                  <input type="first-name" placeholder="Enter your first name" required />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input type="last-name" placeholder="Enter your last name" required />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input type="Billing address" placeholder="Enter your billing address" required />
                  <i className="fa-solid fa-lock"></i>
                </div>

                <div className="input_box">
                  <input type="phone-number" placeholder="Enter your phone number" required />
                  <i className="fa-solid fa-lock"></i>
                </div>
              </div>
            </div>

            {!passwordsMatch && <div style={{ color: 'red' }}>Passwords do not match.</div>}

            <button type="submit">Signup</button>

            <div className="signup">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
