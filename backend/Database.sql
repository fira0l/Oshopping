CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY  ,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    admin_id BIGSERIAL PRIMARY KEY  ,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE Categories (
    category_id BIGSERIAL PRIMARY KEY  ,
    name VARCHAR(100) NOT NULL,
    parent_category_id INT,
    FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Sellers (
    seller_id BIGSERIAL PRIMARY KEY  ,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY  ,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    seller_id INT,
    stock_quantity INT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);
CREATE TABLE Product_Variants (
    variant_id BIGSERIAL PRIMARY KEY  ,
    product_id INT,
    variant_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20),
    total_amount NUMERIC(10, 2),
    shipping_address VARCHAR(255),
    shipping_city VARCHAR(100),
    postal_code VARCHAR(20),
    shipping_country VARCHAR(100) DEFAULT 'Ethiopia',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE order_new (
    order_new_id BIGSERIAL PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20),
    total_amount NUMERIC(10, 2),
    shipping_address VARCHAR(255),
    shipping_city VARCHAR(100),
    postal_code VARCHAR(20),
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    shipping_country VARCHAR(100) DEFAULT 'Ethiopia',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


CREATE TABLE Order_Items (
    order_item_id BIGSERIAL PRIMARY KEY  ,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Reviews (
    review_id BIGSERIAL PRIMARY KEY  ,
    user_id INT,
    product_id INT,
    rating INT,
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE Shipping_Information (
    shipping_id BIGSERIAL PRIMARY KEY  ,
    order_id INT,
    shipping_method VARCHAR(50),
    tracking_number VARCHAR(50),
    estimated_delivery_date DATE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
CREATE TABLE Payment_Transactions (
    transaction_id BIGSERIAL PRIMARY KEY  ,
    order_id INT,
    payment_method VARCHAR(50),
    amount DECIMAL(10, 2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
CREATE TABLE Wishlist (
    wishlist_id BIGSERIAL PRIMARY KEY  ,
    user_id INT,
    product_id INT,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
CREATE TABLE user_sessions (
    session_id BIGSERIAL PRIMARY KEY  ,
    user_id INT,
    session_token VARCHAR(255),
    expiration_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);