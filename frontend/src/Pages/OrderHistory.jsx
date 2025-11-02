import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, Package, User, Calendar, MapPin } from 'lucide-react';

const PAGE_SIZE = 10;

const OrderHistory = ({ orders, currentPage, handlePageChange, loading, error, toggleOrderHistory, showOrderHistory, user, data }) => {
  const [serialNumber, setSerialNumber] = useState(0);

  useEffect(() => {
    setSerialNumber((currentPage - 1) * PAGE_SIZE);
  }, [orders, currentPage]);

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  return (
    <div className="mt-12">
      <Button 
        variant="outline" 
        onClick={toggleOrderHistory}
        className="mb-6"
      >
        <Package className="mr-2 h-4 w-4" />
        {showOrderHistory ? 'Hide' : 'View'} Order History
      </Button>

      {showOrderHistory && user && data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Order History - {user.username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Loading order history...</p>
            ) : error ? (
              <p className="text-center py-8 text-destructive">Error: {error.message}</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No orders found</p>
            ) : (
              <>
                <div className="space-y-4">
                  {orders
                    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                    .map((order, index) => (
                      <Card key={order.order_new_id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                              <img 
                                src={order.product.image} 
                                alt={order.product.name} 
                                className="w-24 h-24 object-cover rounded-lg border"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{order.product.name}</h3>
                                  <p className="text-sm text-muted-foreground">Order #{serialNumber + index + 1}</p>
                                </div>
                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                  {order.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Date:</span>
                                  <span className="font-medium">{new Date(order.order_date).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-medium text-primary">{order.total_amount} Birr</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Address:</span>
                                  <span className="font-medium truncate">{order.shipping_address}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;
