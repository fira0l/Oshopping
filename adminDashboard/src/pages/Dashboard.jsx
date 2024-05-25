import React from 'react';
import { Column } from '@ant-design/plots';
import { GoArrowDownRight } from "react-icons/go";
import { Table } from 'antd';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orderNews {
      order_new_id
      status
      total_amount
      order_date
      user {
        user_id
      }
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {
      title: 'SNo', // Change column title to 'SNo'
      dataIndex: 'key', // Use the key property for serial numbers
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
    },
    {
      title: 'User ID',
      dataIndex: ['user', 'user_id'],
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
    },
  ];

  const formattedData = data.orderNews.map((order, index) => ({
    key: index + 1, // Change key to incrementing numbers
    ...order,
    // Format order_date to a human-readable format (e.g., 'YYYY-MM-DD')
    order_date: moment(order.order_date).format('YYYY-MM-DD'),
  }));

  const chartData = [
    { month: '1', value: 1078 },
    { month: '2', value: 1216 },
    { month: '3', value: 758 },
    { month: '4', value: 623 },
    { month: '5', value: 319 },
    { month: '6', value: 422 },
    { month: '7', value: -4 },
    { month: '8', value: -217 },
    { month: '9', value: -358 },
    { month: '10', value: 1513 },
    { month: '11', value: 1388 },
    { month: '12', value: 597 },
  ];

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    scale: {
      y: {
        domainMax: 2000,
        domainMin: -1000,
      },
    },
    axis: {
      x: {
        labelFormatter: (val) => `${val} Month`,
      },
    },
    annotations: [
      {
        type: 'rangeX',
        data: [{ month: ['7', '9'] }],
        xField: 'month',
      },
    ],
  };

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p> 
            <h4 className='mb-0 sub-title'>$300</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6><GoArrowDownRight/> 32%</h6> 
            <p className='mb-0 desc'>Compared To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$300</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'><GoArrowDownRight/> 32%</h6>
            <p className='mb-0 desc'>Compared To April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>$300</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><GoArrowDownRight/> 32%</h6>
            <p className='mb-0 desc'>Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-5 title'>Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-5 title'>Recent Orders</h3>
        <div>
          <Table 
            columns={columns} 
            dataSource={formattedData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
