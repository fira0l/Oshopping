import React from 'react';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
  const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(GET_ORDERS_QUERY);

  if (ordersLoading) return <p>Loading...</p>;
  if (ordersError) return <p>Error: {ordersError.message}</p>;

  // Ensure ordersData is defined
  const orderNews = ordersData?.orderNews || [];

  // Group orders by date
  const startDate = moment().subtract(4, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  const orderStatsByDate = orderNews.reduce((acc, order) => {
    const date = moment(order.order_date).format('YYYY-MM-DD');
    if (acc[date]) {
      acc[date].count++;
      acc[date].totalAmount += order.total_amount;
      acc[date].users.add(order.user.user_id);
    } else {
      acc[date] = {
        count: 1,
        totalAmount: order.total_amount,
        users: new Set([order.user.user_id])
      };
    }
    return acc;
  }, {});

  // Fill in missing dates with zero count, total amount, and users
  const currentDate = moment(startDate);
  while (currentDate.isSameOrBefore(endDate)) {
    const date = currentDate.format('YYYY-MM-DD');
    if (!orderStatsByDate[date]) {
      orderStatsByDate[date] = { count: 0, totalAmount: 0, users: new Set() };
    }
    currentDate.add(1, 'day');
  }

  // Convert order data to required format
  const formattedOrderData = Object.entries(orderStatsByDate).map(([date, stats]) => ({
    name: date,
    count: stats.count,
    totalAmount: stats.totalAmount,
    users: stats.users.size,
  }));

  // Spline chart options for orders, users, and amount
  const splineChartOptions = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Orders, Total Amount, and Number of Users Registered',
      align: 'left',
    },
    subtitle: {
      text: `Total Amount: Birr ${formattedOrderData.reduce((total, item) => total + item.totalAmount, 0).toFixed(2)} | Number of Orders: ${formattedOrderData.reduce((total, item) => total + item.count, 0)} | Total Number of Users: ${formattedOrderData.reduce((total, item) => total + item.users, 0)}`,
      align: 'left',
    },
    xAxis: {
      categories: formattedOrderData.map(item => item.name),
    },
    yAxis: [{
      title: {
        text: 'Number of Orders',
      },
    }, {
      title: {
        text: 'Total Amount',
        opposite: true,
      },
    }, {
      title: {
        text: 'Number of Users',
        opposite: true,
      },
    }],
    series: [{
      name: 'Number of Orders',
      data: formattedOrderData.map(item => item.count),
      yAxis: 0,
    }, {
      name: 'Total Amount',
      data: formattedOrderData.map(item => item.totalAmount),
      yAxis: 1,
    }, {
      name: 'Number of Users',
      data: formattedOrderData.map(item => item.users),
      yAxis: 2,
    }],
  };

  // JSX to render charts in the Dashboard component
  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='mt-4'>
        <div>
          <HighchartsReact highcharts={Highcharts} options={splineChartOptions} />
        </div>
      </div>
      <div className='mt-4'>
        <div>
          {/* <RecentOrders /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
