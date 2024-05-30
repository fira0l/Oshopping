import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const FORGET_MUTATION = gql`
  mutation ForgetPassword($email: String!) {
    changePassword(email: $email) {
      user_id
    }
  }
`;

const ForgotP = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [ForgetPassword, { loading, error }] = useMutation(FORGET_MUTATION, {
    onCompleted: (data) => {
      setMessage('Password reset email sent successfully.');
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setMessage(null);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await ForgetPassword({ variables: { email } });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-gray-200">
      <div className="relative w-96 h-auto bg-gray-400 bg-opacity-90 p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-white text-2xl font-semibold text-center">Forgot Password</h2>

          <div className="relative">
            <div className="absolute left-0 top-0 px-1 py-0 text-gray-300"><MdEmail /></div>
            <input
              type="email"
              placeholder='Enter your email'
              required
              className="w-full px-4 py-2 pl-8 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>

          {message && <p className="text-white text-center mt-4">{message}</p>}
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

          <div className="text-center">
            <p className="text-white text-sm">Remember your password? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotP;
