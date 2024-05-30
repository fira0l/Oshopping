import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      admin_id
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('savedEmail');
    const storedPassword = localStorage.getItem('savedPassword');

    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const { data } = await loginUser({ variables: { email, password } });
      console.log('Login successful:', data.login);
      navigate('/admin');

      // Save email and password to localStorage
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
    } catch (error) {
      setErrorMessage('Incorrect username or password. Please try again.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ background: '#3DA9D1', minHeight: '100vh' }}>
      <div className="card shadow" style={{ width: '300px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-end">
              <Link to="forgot-password">Forgot password?</Link>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
              style={{ marginTop: '10px' }}
            > Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
