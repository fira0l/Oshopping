import React from 'react';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import DashboardStats from '../components/DashboardStats';
import { TrendingUp, Calendar, Users, ShoppingCart } from 'lucide-react';

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

  if (ordersLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    </div>
  );
  if (ordersError) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center text-destructive">
        <p>Error loading dashboard: {ordersError.message}</p>
      </div>
    </div>
  );

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

  // Calculate stats for DashboardStats component
  const totalRevenue = formattedOrderData.reduce((total, item) => total + item.totalAmount, 0);
  const totalOrders = formattedOrderData.reduce((total, item) => total + item.count, 0);
  const totalUsers = formattedOrderData.reduce((total, item) => total + item.users, 0);
  
  const stats = {
    totalRevenue,
    totalOrders,
    totalProducts: 0, // You can fetch this from products query
    totalUsers
  };

  // JSX to render charts in the Dashboard component
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {moment().format('MMM DD, YYYY')}
        </Badge>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Charts Section */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HighchartsReact highcharts={Highcharts} options={splineChartOptions} />
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orderStatsByDate[moment().format('YYYY-MM-DD')]?.count || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Orders placed today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(orderStatsByDate[moment().format('YYYY-MM-DD')]?.totalAmount || 0).toFixed(2)} Birr
              </div>
              <p className="text-xs text-muted-foreground">
                Revenue generated today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orderStatsByDate[moment().format('YYYY-MM-DD')]?.users || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Users who ordered today
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
