import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-white text-black py-12 px-2" style={{ height: '60vh' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Have any queries? We're here to help.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-custom">
            <h3 className="text-xl font-semibold mb-4">Sales</h3>
            <p className="mb-4">For any inquiries related to sales and products.</p>
            <p className="font-bold">1800 123</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-custom">
            <h3 className="text-xl font-semibold mb-4">Complaints</h3>
            <p className="mb-4">We're here to address any complaints you may have.</p>
            <p className="font-bold">1900 223</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-custom">
            <h3 className="text-xl font-semibold mb-4">Returns</h3>
            <p className="mb-4">For information on returns and refunds.</p>
            <p className="font-bold">letera@mail.com</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-custom">
            <h3 className="text-xl font-semibold mb-4">Marketing</h3>
            <p className="mb-4">Contact us for marketing and collaboration inquiries.</p>
            <p className="font-bold">1700 444</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
