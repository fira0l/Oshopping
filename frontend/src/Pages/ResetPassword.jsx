import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

// GraphQL mutation for resetting password
const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      message
    }
  }
`;

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      setMessage('Password successfully set');
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setMessage(null);
    }
  });

  useEffect(() => {
    console.log(token);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (password && confirmPassword && password === confirmPassword) {
      await resetPassword({ variables: { token, password } });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-gray-200">
      <div className="relative w-96 h-auto bg-gray-400 bg-opacity-90 p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-white text-2xl font-semibold text-center">Reset Password</h2>

          <div className="relative">
            <div className="input_box">
              <input
                type="password"
                name="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                required
                onFocus={() => {
                  document.getElementById('passwordTooltip').style.display = 'block';
                }}
                onBlur={() => {
                  document.getElementById('passwordTooltip').style.display = 'none';
                }}
              />
              <i className="fa-solid fa-lock"></i>
              <div id="passwordTooltip" style={{ display: 'none', position: 'absolute', backgroundColor: '#f9f9f9', border: '1px solid #ccc', padding: '5px', zIndex: '1' }}>
                Password must be at least 6 characters long and contain at least one letter, one number, and one special character.
              </div>
              <span id="passwordMessage"></span>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i className="fa-solid fa-lock"></i>
            <span id="confirmPasswordMessage"></span>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>

          {message && <p className="text-white-500 text-center mt-4">{message}</p>}
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
          <div className="text-center">
            <p className="text-white text-sm">Remember your password? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;