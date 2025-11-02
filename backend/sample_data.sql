-- Insert sample categories
INSERT INTO categories (category_id, name) VALUES 
(55, 'Men'),
(56, 'Women'), 
(57, 'Kids'),
(58, 'House');

-- Insert sample seller
INSERT INTO sellers (seller_id, username, password_hash, email, first_name, last_name) VALUES 
(1, 'admin', '$2b$10$dummy', 'admin@oshop.com', 'Admin', 'User');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, seller_id, stock_quantity, image) VALUES 
('Men''s Classic T-Shirt', 'Comfortable cotton t-shirt for everyday wear', 25.99, 55, 1, 50, 'http://localhost:1000/uploads/mens-tshirt.jpg'),
('Men''s Jeans', 'Classic blue denim jeans', 59.99, 55, 1, 30, 'http://localhost:1000/uploads/mens-jeans.jpg'),
('Men''s Sneakers', 'Comfortable running sneakers', 89.99, 55, 1, 25, 'http://localhost:1000/uploads/mens-sneakers.jpg'),
('Women''s Dress', 'Elegant summer dress', 79.99, 56, 1, 20, 'http://localhost:1000/uploads/womens-dress.jpg'),
('Women''s Blouse', 'Professional work blouse', 45.99, 56, 1, 35, 'http://localhost:1000/uploads/womens-blouse.jpg'),
('Women''s Heels', 'Stylish high heels', 99.99, 56, 1, 15, 'http://localhost:1000/uploads/womens-heels.jpg'),
('Kids T-Shirt', 'Colorful kids t-shirt', 19.99, 57, 1, 40, 'http://localhost:1000/uploads/kids-tshirt.jpg'),
('Kids Shorts', 'Comfortable play shorts', 24.99, 57, 1, 45, 'http://localhost:1000/uploads/kids-shorts.jpg'),
('Coffee Maker', 'Automatic drip coffee maker', 129.99, 58, 1, 10, 'http://localhost:1000/uploads/coffee-maker.jpg'),
('Kitchen Towels', 'Set of 6 kitchen towels', 19.99, 58, 1, 60, 'http://localhost:1000/uploads/kitchen-towels.jpg');