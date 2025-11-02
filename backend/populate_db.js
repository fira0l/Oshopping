const db = require('./pgAdaptor').db;

async function populateDatabase() {
  try {
    // Insert categories
    await db.none(`
      INSERT INTO categories (category_id, name) VALUES 
      (55, 'Men'),
      (56, 'Women'), 
      (57, 'Kids'),
      (58, 'House')
      ON CONFLICT (category_id) DO NOTHING
    `);

    // Insert seller
    await db.none(`
      INSERT INTO sellers (seller_id, username, password_hash, email, first_name, last_name) VALUES 
      (1, 'admin', '$2b$10$dummy', 'admin@oshop.com', 'Admin', 'User')
      ON CONFLICT (seller_id) DO NOTHING
    `);

    // Insert products
    await db.none(`
      INSERT INTO products (name, description, price, category_id, seller_id, stock_quantity) VALUES 
      ('Men''s Classic T-Shirt', 'Comfortable cotton t-shirt for everyday wear', 25.99, 55, 1, 50),
      ('Men''s Jeans', 'Classic blue denim jeans', 59.99, 55, 1, 30),
      ('Men''s Sneakers', 'Comfortable running sneakers', 89.99, 55, 1, 25),
      ('Women''s Dress', 'Elegant summer dress', 79.99, 56, 1, 20),
      ('Women''s Blouse', 'Professional work blouse', 45.99, 56, 1, 35),
      ('Women''s Heels', 'Stylish high heels', 99.99, 56, 1, 15),
      ('Kids T-Shirt', 'Colorful kids t-shirt', 19.99, 57, 1, 40),
      ('Kids Shorts', 'Comfortable play shorts', 24.99, 57, 1, 45),
      ('Coffee Maker', 'Automatic drip coffee maker', 129.99, 58, 1, 10),
      ('Kitchen Towels', 'Set of 6 kitchen towels', 19.99, 58, 1, 60)
    `);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    process.exit();
  }
}

populateDatabase();