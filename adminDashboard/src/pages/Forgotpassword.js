import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const FORGET_MUTATION = gql`
    mutation ForgetPassword($email: String!) {
      changePasswordAdmin(email: $email) {
        admin_id
      }
    }
  `;

  const [changePasswordAdmin, { loading }] = useMutation(FORGET_MUTATION);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await changePasswordAdmin({ variables: { email } });
      setMessage('Password reset link sent to your email');
      setError('');
    } catch (error) {
      setMessage('');
      setError(error.message || 'An error occurred while processing your request');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-blue-400'>
      <div className='w-96 bg-white p-8 rounded-lg shadow-md'>
        <h3 className='text-2xl font-semibold text-center mb-4'>Forgot Password</h3>
        <p className='text-center'>Please enter your registered email address</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className='w-full px-4 py-2 mt-4 border rounded-md focus:outline-none focus:ring-blue-400' 
            placeholder="Email Address" 
            value={email}
            onChange={handleEmailChange} 
          />
          <button
            className='w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-blue-600'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Link'}
          </button>
        </form>
        {message && <p className='text-green-500 text-center mt-4'>{message}</p>}
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      </div>
    </div>
  );
}

export default Forgotpassword;
