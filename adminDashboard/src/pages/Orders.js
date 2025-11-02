import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Package, Calendar, MapPin, User, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

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

const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($order_new_id: ID!, $status: String!) {
    updateOrderStatus(order_new_id: $order_new_id, status: $status) {
      order_new_id
      status
    }
  }
`;

const Orders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS_QUERY);
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS_MUTATION);
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    if (!loading && data) {
      const initialStatus = data.orderNews.reduce((acc, order) => {
        acc[order.order_new_id] = order.status;
        return acc;
      }, {});
      setOrderStatus(initialStatus);
    }
  }, [loading, data]);

  const handleStatusChange = (value, orderId) => {
    updateOrderStatus({ variables: { order_new_id: orderId, status: value } });
    setOrderStatus({ ...orderStatus, [orderId]: value });
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading orders...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center text-destructive">
        <p>Error loading orders: {error.message}</p>
      </div>
    </div>
  );

  const formattedData = data.orderNews.map((order, index) => ({
    key: index + 1,
    order_new_id: order.order_new_id,
    email: order.user.email,
    products: [{
      ...order.product,
      quantity: order.quantity,
    }],
    totalAmount: order.total_amount,
    totalQuantity: order.quantity,
    order_date: order.order_date,
    shipping_address: order.shipping_address,
    shipping_city: order.shipping_city,
  }));

  // Sort the formattedData array by order date, from most recent to past
  formattedData.sort((a, b) => moment(b.order_date).diff(moment(a.order_date)));
  



  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          {formattedData.length} Orders
        </Badge>
      </div>

      <div className="grid gap-4">
        {formattedData.map((order) => (
          <Card key={order.order_new_id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Order #{order.order_new_id}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Badge 
                        variant={orderStatus[order.order_new_id] === 'Delivered' ? 'default' : 'secondary'}
                      >
                        {orderStatus[order.order_new_id] || 'Select Status'}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleStatusChange('Processing', order.order_new_id)}>
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('Shipped', order.order_new_id)}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('Delivered', order.order_new_id)}>
                      Delivered
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-medium">{order.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{moment(order.order_date).format('MMM DD, YYYY')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{order.shipping_address}, {order.shipping_city}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary">{order.totalAmount} Birr</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Products:</h4>
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;