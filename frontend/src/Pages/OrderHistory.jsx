import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

const PAGE_SIZE = 10;

const OrderHistory = ({ orders, currentPage, handlePageChange, loading, error, toggleOrderHistory, showOrderHistory, user, data }) => {
  const [serialNumber, setSerialNumber] = useState(0);

  useEffect(() => {
    // Reset serial number count whenever orders or currentPage changes
    setSerialNumber((currentPage - 1) * PAGE_SIZE);
  }, [orders, currentPage]);

  return (
    <div className="order-history-section">
      <h2 className="cursor-pointer" onClick={toggleOrderHistory}>Order History</h2>
      {showOrderHistory && user && data && (
        <>
          <div className="user-info">
            <h3>Username: {user.username}</h3>
          </div>
          
          <div className="order-history-table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sno</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

                  {/* Add more header columns as needed */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loading order history...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Error fetching order history: {error.message}</td>
                  </tr>
                ) : (
                  // Slice the data array based on the current page and page size
                  orders
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((order, index) => (
                      <tr key={order.order_new_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{serialNumber + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={order.product.image} alt={order.product.name} className="w-12 h-12 object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total_amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipping_address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPage}
            total={orders.length}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default OrderHistory;
