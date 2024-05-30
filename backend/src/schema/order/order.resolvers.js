const db = require('../../../pgAdaptor').db;

const orderResolvers = {
  Query: {
    orderNew: async (_, { id }) => {
      try {
        const order = await db.one('SELECT * FROM order_new WHERE order_new_id = $1', [id]);
        // Format the order_date to a human-readable format (e.g., 'YYYY-MM-DD')
        order.order_date = new Date(order.order_date).toISOString().slice(0, 10);
        return order;
      } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
      }
    },
    orderNews: async () => {
      try {
        const orders = await db.any('SELECT * FROM order_new');
        // Format order_date for each order in the array
        orders.forEach(order => {
          order.order_date = new Date(order.order_date).toISOString().slice(0, 10);
        });
        return orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
    },
    orderNewsByUserId: async (_, { user_id }) => { // Resolver for orderNewsByUserId
      try {
        const orders = await db.any('SELECT * FROM order_new WHERE user_id = $1', [user_id]);
        orders.forEach(order => {
          order.order_date = new Date(order.order_date).toISOString().slice(0, 10);
        });
        return orders;
      } catch (error) {
        console.error('Error fetching orders by user ID:', error);
        throw error;
      }
    },
    
  },
  Mutation: {
    orderProduct: async (_, args) => {
      try {
        const { user_id, product_id,  total_amount, shipping_address, shipping_city, postal_code, quantity, unit_price, shipping_country } = args;

        // Insert the new order into the database
        const newOrder = await db.one(
          `INSERT INTO order_new (user_id, product_id,  total_amount, shipping_address, shipping_city, postal_code, quantity, unit_price, shipping_country) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
           RETURNING *`,
          [user_id, product_id, total_amount, shipping_address, shipping_city, postal_code, quantity, unit_price, shipping_country]
        );

        return newOrder;
      } catch (err) {
        console.error('Failed to create order:', err);
        throw new Error(`Failed to create order: ${err.message}`);
      }
    },

    updateOrderStatus: async (_, { order_new_id, status }) => {
      try {
        // Update the order status in the database
        const updatedOrder = await db.one(
          `UPDATE order_new 
           SET status = $1
           WHERE order_new_id = $2
           RETURNING *`,
          [status, order_new_id]
        );

        return updatedOrder;
      } catch (err) {
        console.error('Failed to update order status:', err);
        throw new Error(`Failed to update order status: ${err.message}`);
      }
    },

    deleteProductOrder: async (_, { order_new_id }) => {
      try {
        const result = await db.result('DELETE FROM order_new WHERE order_new_id = $1', [order_new_id]);
        if (result.rowCount > 0) {
          return 'Order deleted successfully';
        } else {
          throw new Error('Order not found');
        }
      } catch (err) {
        console.error('Failed to delete order:', err);
        throw new Error(`Failed to delete order: ${err.message}`);
      }
    },
  },
  OrderNew: {
    user: async (parent) => {
      try {
        const user = await db.one('SELECT * FROM users WHERE user_id = $1', [parent.user_id]);
        return user;
      } catch (err) {
        throw new Error(`Failed to fetch user: ${err.message}`);
      }
    },
    product: async (parent) => {
      try {
        const product = await db.one('SELECT * FROM products WHERE product_id = $1', [parent.product_id]);
        return product;
      } catch (err) {
        throw new Error(`Failed to fetch product: ${err.message}`);
      }
    },
  },
};

module.exports = {
  resolvers: orderResolvers,
  orderProduct: orderResolvers.Mutation.orderProduct
};
