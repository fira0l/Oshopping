const db = require('../../../pgAdaptor').db;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const transporter = require('../../middleware/transporter');
const crypto = require('crypto'); 

const adminResolvers = {
  Query: {
    admin: async (_, { id }) => {
      try {
        const admin = await db.one('SELECT * FROM admin WHERE admin_id = $1', [id]);
        return admin;
      } catch (error) {
        console.error('Error fetching admin:', error);
        throw error;
      }
    },
    admins: async () => {
      try {
        const admins = await db.any('SELECT * FROM admin');
        return admins;
      } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
      }
    },
  },
  Mutation: {
    registerAdmin: async (_, { username, password, email, first_name, last_name, address, phone_number }) => {
      try {
        const existingAdmin = await db.oneOrNone('SELECT * FROM admin WHERE username = $1', [username]);
        if (existingAdmin) {
          throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newAdmin = await db.one(`
          INSERT INTO admin (username, password, email, first_name, last_name, address, phone_number)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING admin_id, username, email, first_name, last_name, address, phone_number, registration_date;
        `, [username, hashedPassword, email, first_name, last_name, address, phone_number]);
        return newAdmin;
      } catch (error) {
        console.error('Error adding admin:', error);
        throw error;
      }
    },
    adminLogin: async (_, { email, password }) => {
      try {
        const admin = await db.oneOrNone('SELECT * FROM admin WHERE email = $1', [email]);
        if (!admin) {
          throw new Error('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
          throw new Error('Invalid email or password');
        }
        return admin;
      } catch (error) {
        console.error('Error during admin login:', error);
        throw error;
      }
    },

    changePasswordAdmin: async (_, { email }) => {
      try {
        const user = await db.oneOrNone(`SELECT * FROM admin WHERE email = $1`, [email]);
        console.log(email)
      
        if (!user) {
          throw new Error('User not found');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiry

        await db.none(
          'INSERT INTO user_sessions (user_id, session_token, expiration_time) VALUES ($1, $2, $3)',
          [user.admin_id, token, expiry]
        );

        const mailOptions = {
          from: 'senazeleke258@gmail.com',
          to: email,
          subject: 'Password Reset',
          text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://localhost:3001/reset-password/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        return user;

      } catch (error) {
        console.error("Error updating password", error.message);
        throw new Error('An error occurred while processing your request');
      }
    },

    resetPasswordAdmin: async (_, { token, password }) => {
      try {
        console.log("Resetting password for token:", token);
        const currentTimeInSeconds = Date.now() / 1000;
    
        // Check if the token is valid and not expired
        const userSession = await db.oneOrNone(
          'SELECT * FROM user_sessions WHERE session_token = $1 OR expiration_time > to_timestamp($2)',
          [token, currentTimeInSeconds]
        );
        
        if (!userSession) {
          throw new Error('Password reset token is invalid or has expired');
        }
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Update the user's password in the database
        await db.none(
          'UPDATE admin SET password = $1 WHERE admin_id = $2',
          [hashedPassword, userSession.user_id]
        );
    
        console.log("Password reset successful for admin_id:", userSession.admin_id);
        
        // Delete the user session from the database
        await db.none(
          'DELETE FROM user_sessions WHERE session_token = $1',
          [token]
        );
    
        let message = "Password reset successful";
        return message;
      } catch (error) {
        console.error("Error resetting password:", error.message);
        throw new Error(`Error resetting password: ${error.message}`);
      }
    },
    },
};

module.exports = adminResolvers;
