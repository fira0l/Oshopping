const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../db');
const saltRounds = 10;

const secretKey = crypto.randomBytes(32).toString('hex');

const login =  { login:async ({ emailOrUsername, password }) => {
  
  try {
   
    const userQuery = await pool.query(
      `SELECT * FROM users WHERE email = $1 OR username = $1`,
      [emailOrUsername]
    );

    const user = userQuery.rows[0];
    if (!user) {
      
      throw new Error('User not found');
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.userId }, secretKey, {
    });

    return { token, user };
  } catch (error) {
    
    console.error('Error in loginResolver:', error);
    throw error;
  }
},
 getAllUsers : async () => {
  try {
    
    const userQuery = await pool.query(`SELECT * FROM users;`);
    if (!userQuery) {
      
      throw new Error('User not found');
    }
    
    const users = userQuery.rows;
    
  
    return users;
  } catch (error) {
   
    console.error('Error in getAllUsers:', error);
    throw error;
  }
},
getSingleUsers: async({id})=>{
  try {
    // Fetch the user with the specified ID from the database
    const userQuery = await pool.query("SELECT * FROM users WHERE  user_id = $1", [id]);
    
    // Extract the user from the query result
    const user = userQuery.rows[0]; // Assuming there should be only one user with the specified ID
    
    // Return the user
    return user;
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error in getSingleUser:', error);
    throw error;
  }


},
postEditUser: async ({ id, username, password, email, firstName, lastName, address, phoneNumber }) => {
  try {
    // Check if the user exists
    const userQuery = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    
    if (userQuery.rows.length === 0) {
      console.log("User not found");
      return; // Exiting function if user is not found
    }

    // Construct the UPDATE query
    const updateUserQuery = `
      UPDATE users
      SET 
        username = $1,
        password_hash = $2,
        email = $3,
        first_name = $4,
        last_name = $5,
        address = $6,
        phone_number = $7
      WHERE user_id = $8
    `;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Execute the UPDATE query
    await pool.query(updateUserQuery, [username, hashedPassword, email, firstName, lastName, address, phoneNumber, id]);

    
    console.log("User updated successfully");
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error.message);
  }

},
changePassword:async({id,password})=>{
 try{
  const userQuery = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
  if(userQuery.rows.length===0){
    console.log("user not found")
  }
  const updateUserQuery = `
  UPDATE users
  SET 
    password_hash = $1
  WHERE user_id = $2
`; 
const hashedPassword = await bcrypt.hash(password, saltRounds);
await pool.query(updateUserQuery, [hashedPassword,id]);
console.log("User up dated successfully");
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    return result.rows[0]
 }catch(error){
  console.error("error updating password")
 }
}



};

module.exports = { login };
