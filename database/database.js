const { Pool } = require("pg"); 
require('dotenv').config(); 

// Test the database connection
// Create a PostgreSQL pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database:", res.rows[0].now);
    }
  });
  
  function retriveUsers(){
    // const users = []
    pool.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      console.log('Query result:', result.rows);
      
      // Close the database connection (optional)
      pool.end();

      // for(const i in result.rows){
      //   users.push(i)
      // }
      // console.log(users)
    });
    
  }

  module.exports={
    retriveUsers
  }
  