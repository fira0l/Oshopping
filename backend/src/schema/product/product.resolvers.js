const db = require('../../../pgAdaptor').db;

const productResolvers = {
  Query: {
    product: async (_, { id }) => {
      try {
        const product = await db.one('SELECT * FROM products WHERE product_id = $1', [id]);
        return product;
      } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
    },
    products: async () => {
      try {
        const products = await db.any('SELECT * FROM products');
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, category_id, seller_id, stock_quantity }) => {
      try {
        const query = `
          INSERT INTO products (name, description, price, category_id, seller_id, stock_quantity)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING product_id, name, description, price, category_id, seller_id, stock_quantity, created_at;
        `;
        const values = [name, description, price, category_id, seller_id, stock_quantity];
        const newProduct = await db.one(query, values);
        
        return newProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    },
    deleteProduct: async (_, { product_id }) => {
      try {
        const product = await db.oneOrNone('SELECT * FROM products WHERE product_id = $1', [product_id]);
        if (!product) throw new Error('Product not found');

        await db.none('DELETE FROM products WHERE product_id = $1', [product_id]);

        return product;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
    },
    decreaseStockQuantity: async (_, { product_id, quantity }) => {
      try {
        const currentProduct = await db.one('SELECT * FROM products WHERE product_id = $1', [product_id]);
        if (!currentProduct) {
          throw new Error('Product not found');
        }
        const newStockQuantity = currentProduct.stock_quantity - quantity;
        if (newStockQuantity < 0) {
          throw new Error('Stock quantity cannot be negative');
        }
        await db.none('UPDATE products SET stock_quantity = $1 WHERE product_id = $2', [newStockQuantity, product_id]);
        return {
          ...currentProduct,
          stock_quantity: newStockQuantity
        };
      } catch (error) {
        console.error('Error decreasing stock quantity:', error);
        throw error;
      }
    },
    updateStockQuantity: async (_, { product_id, stock_quantity }) => {  
      try {
        const product = await db.oneOrNone('SELECT * FROM products WHERE product_id = $1', [product_id]);
        if (!product) throw new Error('Product not found');

        await db.none('UPDATE products SET stock_quantity = $1 WHERE product_id = $2', [stock_quantity, product_id]);

        return { ...product, stock_quantity };
      } catch (error) {
        console.error('Error updating stock quantity:', error);
        throw error;
      }
    },
  },
};

module.exports = productResolvers;
