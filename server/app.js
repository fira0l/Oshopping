const express = require("express");
const app = express();
const { Pool } = require("pg"); 
require('dotenv').config(); 


// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello WORLD</h1>");
});

// Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database:", res.rows[0].now);
  }
});

pool.query('SELECT * FROM users', (err, result) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query result:', result.rows);
  
  // Close the database connection (optional)
  pool.end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`LOCAL HOST IS CONNECTED TO A PORT NO ${PORT}`);
});
