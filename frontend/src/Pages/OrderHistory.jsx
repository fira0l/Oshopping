import React from 'react';
import { Tag, Pagination } from 'antd';

const PAGE_SIZE = 10;

const OrderHistory = ({ orders, currentPage, handlePageChange, loading, error, toggleOrderHistory, showOrderHistory, user, data })  => {

  const getTagColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'blue';
      case 'Shipped':
        return 'orange';
      case 'Out for Delivery':
        return 'volcano';
      case 'Delivered':
        return 'green';
      default:
        return 'geekblue';
    }
  };

  return (
    <div className="order-history-section">
      <h2 className="cursor-pointer" onClick={toggleOrderHistory}>Order History</h2>
      {showOrderHistory && user && data && (
        <>
          <div className="order-history-table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                  {/* Add more header columns as needed */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loading order history...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Error fetching order history: {error.message}</td>
                  </tr>
                ) : (
                  // Slice the data array based on the current page and page size
                  orders
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map(order => (
                      <tr key={order.order_new_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_new_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={order.product.image} alt={order.product.name} className="w-12 h-12 object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Tag color={getTagColor(order.status)}>{order.status}</Tag>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total_amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipping_address}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination // Pagination component
            current={currentPage}
            total={orders.length} // Total number of orders
            pageSize={PAGE_SIZE} // Number of orders per page
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default OrderHistory;
