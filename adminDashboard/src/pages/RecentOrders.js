import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Tag } from 'antd';
import moment from 'moment';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orderNews {
      order_new_id
      status
      total_amount
      order_date
      quantity
      shipping_address
      shipping_city 
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

  const statusTimeline = [
    { status: 'Processing', daysOffset: 0 },
    { status: 'Shipped', daysOffset: 1 },
    { status: 'Out for Delivery', daysOffset: 2 },
    { status: 'Delivered', daysOffset: 3 },
  ];

  const getCurrentStatus = (orderDate) => {
    const today = moment();
    for (let i = statusTimeline.length - 1; i >= 0; i--) {
      const statusDate = moment(orderDate).add(statusTimeline[i].daysOffset, 'days');
      if (today.isSameOrAfter(statusDate, 'day')) {
        return statusTimeline[i].status;
      }
    }
    return 'Processing';
  };

  // Group orders by order_new_id
  const groupedOrders = data.orderNews.reduce((acc, order) => {
    const orderId = order.order_new_id;
    if (!acc[orderId]) {
      acc[orderId] = {
        order_new_id: orderId,
        email: order.user.email,
        status: getCurrentStatus(order.order_date),
        products: [],
        totalAmount: 0,
        totalQuantity: 0,
        order_date: order.order_date,
        shipping_address: order.shipping_address,
        shipping_city:order.shipping_city ,
        statusHistory: statusTimeline.map(({ status, daysOffset }) => ({
          status,
          date: moment(order.order_date).add(daysOffset, 'days').format('YYYY-MM-DD'),
        })),
      };
    }
    acc[orderId].products.push(order);
    acc[orderId].totalAmount += order.total_amount;
    acc[orderId].totalQuantity += order.quantity;
    return acc;
  }, {});

  let formattedData = Object.keys(groupedOrders).map((key) => {
    const order = groupedOrders[key];
    return {
      order_new_id: order.order_new_id,
      email: order.email,
      status: order.status,
      products: order.products,
      totalAmount: order.totalAmount,
      totalQuantity: order.totalQuantity,
      order_date: order.order_date,
      shipping_address: order.shipping_address,
      shipping_city: order.shipping_city,
      statusHistory: order.statusHistory,
    };
  });

  // Filter the data to show only orders from the past 2 days
  const twoDaysAgo = moment().subtract(2, 'days');
  formattedData = formattedData.filter((order) => moment(order.order_date).isAfter(twoDaysAgo));

  // Sort the data from most recent to oldest
  formattedData.sort((a, b) => moment(b.order_date).diff(moment(a.order_date)));

  // Reassign the key to be sequential numbers after sorting
  formattedData = formattedData.map((order, index) => ({
    key: index + 1, // Sequential numbers starting from 1
    ...order,
  }));

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Processing':
            color = 'blue';
            break;
          case 'Shipped':
            color = 'orange';
            break;
          case 'Out for Delivery':
            color = 'volcano';
            break;
          case 'Delivered':
            color = 'green';
            break;
          default:
            color = 'geekblue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Products',
      dataIndex: 'products',
      render: (products) => (
        <div>
          {products.map((order, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <img src={order.product.image} alt="Product" style={{ width: 50, height: 50, marginRight: '8px' }} />
              <span>{order.product.name}</span>
              <span style={{ marginLeft: '8px' }}>x{order.quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      render: (orderDate) => moment(orderDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
    },
    {
      title: 'City',
      dataIndex: 'shipping_city',
    },
  ];

  const expandedRowRender = (record) => (
    <div>
      <h4>Status History</h4>
      <ul>
        {record.statusHistory.map((status, index) => (
          <li key={index}>{status.status} - {status.date}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h3 className='mb-4 title'>Recent Orders</h3>
      <div>
        <Table
          columns={columns}
          dataSource={formattedData}
          expandable={{ expandedRowRender }}
        />
      </div>
    </div>
  );
};

export default RecentOrders;
