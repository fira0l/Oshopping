import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Table, Button } from 'antd';
import moment from 'moment';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orderNews {
      order_new_id
      status
      total_amount
      order_date
      quantity
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

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($orderNewId: ID!) {
    deleteProductOrder(order_new_id: $orderNewId)
  }
`;

const Orders = () => {
  const { loading, error, data, refetch } = useQuery(GET_ORDERS_QUERY);
  const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder({ variables: { orderNewId: orderId } });
      refetch(); // Refetch orders after deletion
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  // Group orders by order_new_id
  const groupedOrders = data.orderNews.reduce((acc, order) => {
    const orderId = order.order_new_id;
    if (!acc[orderId]) {
      acc[orderId] = {
        order_new_id: orderId,
        email: order.user.email,
        status: order.status,
        products: [],
        totalAmount: 0,
        totalQuantity: 0,
        order_date: order.order_date,
      };
    }
    acc[orderId].products.push(order);
    acc[orderId].totalAmount += order.total_amount;
    acc[orderId].totalQuantity += order.quantity;
    return acc;
  }, {});

  const formattedData = Object.keys(groupedOrders).map((key, index) => {
    const order = groupedOrders[key];
    return {
      key: index + 1, // Change key to incrementing numbers
      order_new_id: order.order_new_id,
      email: order.email,
      status: order.status,
      products: order.products,
      totalAmount: order.totalAmount,
      totalQuantity: order.totalQuantity,
      order_date: order.order_date,
    };
  });

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
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      render: (orderDate) => moment(orderDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDelete(record.order_new_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <div>
        <Table columns={columns} dataSource={formattedData} />
      </div>
    </div>
  );
};

export default Orders;
