const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require('../db');
const graphqlResolver = {
  registerUser: async ({ username, password, email, firstName, lastName, address, phoneNumber }) => {
    try {
      // Check if the email already exists
      const emailExistsQuery = `
        SELECT COUNT(*) AS count
        FROM users
        WHERE email = $1;
      `;
      const emailExistsResult = await pool.query(emailExistsQuery, [email]);
      const emailExists = emailExistsResult.rows[0].count > 0;

      if (emailExists) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new user into the database
      const query = `
        INSERT INTO users (username,password_hash,email,first_name,last_name,address,phone_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [username, hashedPassword, email, firstName, lastName, address, phoneNumber];
      const result = await pool.query(query, values);

     
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not register user: ' + error.message);
    }
  },
  
  hello: () => {
    
    return 'this is not me'; 
  }
};
module.exports ={graphqlResolver}
