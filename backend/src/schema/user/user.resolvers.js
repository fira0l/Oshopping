const bcrypt = require('bcrypt');
const db = require('../../../pgAdaptor').db;
const { createSession } = require('../../middleware/session');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');  // Ensure crypto is imported
const secretKey = process.env.JWT_SECRET || 'secret';
const transporter = require('../../middleware/transporter');

const userResolvers = {
  Query: {
    user: async (_, { id }) => {
      return db.one('SELECT * FROM users WHERE user_id = $1', [id]);
    },
    users: async () => {
      return db.any('SELECT * FROM users');
    },
  },
  Mutation: {
    registerUser: async (_, { username, password_hash, email, first_name, last_name, address, phone_number }) => {
      const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser) throw new Error('Username already exists');
      const hashedPassword = await bcrypt.hash(password_hash, 10);
      const newUser = await db.one(`
        INSERT INTO users (username, password_hash, email, first_name, last_name, address, phone_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `, [username, hashedPassword, email, first_name, last_name, address, phone_number]);
      return newUser;
    },

    login: async (_, { username, password }) => {
      const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) throw new Error('Invalid username or password');

      const expirationTime = new Date(Date.now() + 3600 * 1000); // 1 hour
      const { sessionId, sessionToken } = await createSession(user.user_id, expirationTime);
      const expirationTimeMath =  Math.floor(expirationTime)
      const token = jwt.sign({ sessionId }, secretKey, {expiresIn: '2m'});

      return {  token, user };
    },

    changePassword: async (_, { email }) => {
      try {
        const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
        if (!user) {
          throw new Error('User not found');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiry

        await db.none(
          'INSERT INTO user_sessions (user_id, session_token, expiration_time) VALUES ($1, $2, $3)',
          [user.user_id, token, expiry]
        );

        const mailOptions = {
          from: 'senazeleke258@gmail.com',
          to: email,
          subject: 'Password Reset',
          text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://localhost:3000/reset-password/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        return user;

      } catch (error) {
        console.error("Error updating password", error.message);
        throw new Error('An error occurred while processing your request');
      }
    },
    
    resetPassword: async (_, { token, password }) => {
      try {
        const currentTimeInSeconds = Date.now() / 1000;

        const userSession = await db.manyOrNone(
          'SELECT * FROM user_sessions WHERE session_token = $1 OR expiration_time > to_timestamp($2)',
          [token, currentTimeInSeconds]
        );

        if (!userSession) {
          throw new Error('Password reset token is invalid or has expired');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.none(
          'UPDATE users SET password_hash = $1 WHERE user_id = $2',
          [hashedPassword, userSession.user_id]
        );

        await db.none(
          'DELETE FROM user_sessions WHERE session_token = $1',
          [token]
        );
  
        return 'Password reset successful';

      } catch (error) {
        console.error("Error resetting password:", error.message);
        throw new Error(`Error on the server: ${error.message}`);
      }
    },

  },
};

module.exports = userResolvers;
