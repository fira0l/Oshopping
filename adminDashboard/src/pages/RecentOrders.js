import React  from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table } from 'antd';
import moment from 'moment';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orderNews {
      order_new_id
      total_amount
      order_date
      quantity
      shipping_address
      shipping_city 
      status
      user {
        email
      }
      product {
        product_id
        name
        image
      }
    }
  }
`;



const RecentOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS_QUERY);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter orders for today and yesterday
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');
  const filteredOrders = data.orderNews.filter(order => {
    const orderDate = moment(order.order_date);
    return orderDate.isSame(today, 'day') || orderDate.isSame(yesterday, 'day');
  });

  const formattedData = filteredOrders.map((order, index) => ({
    Sno: index + 1,
    order_new_id: order.order_new_id,
    email: order.user.email,
    product: order.product,
    totalAmount: order.total_amount,
    totalQuantity: order.quantity,
    order_date: order.order_date,
    shipping_address: order.shipping_address,
    shipping_city: order.shipping_city,
    status:order.status, 
  }));

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'Sno',
      key: 'Sno',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Products',
      dataIndex: 'product',
      key: 'product',
      render: (product) => (
        <div>
          <img src={product.image} alt="Product" style={{ width: 50, height: 50, marginRight: '8px' }} />
          <span>{product.name}</span>
          <span style={{ marginLeft: '8px' }}>x{product.quantity}</span>
        </div>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (orderDate) => moment(orderDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
    },
    {
      title: 'City',
      dataIndex: 'shipping_city',
      key: 'shipping_city',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Recent Orders</h3>
      <div>
        <Table columns={columns} dataSource={formattedData} />
      </div>
      <style>
        {`
          .custom-dropdown .ant-select-dropdown-menu-item-active {
            background-color: blue !important; /* Change background color of the active option */
          }
        `}
      </style>
    </div>
  );
};

export default RecentOrders;
