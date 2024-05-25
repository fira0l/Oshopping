const bcrypt = require('bcrypt');
const db = require('../../../pgAdaptor').db;
const saltRounds = 10;

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
      const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
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
      return user;
    },
    changePassword: async (_, { user_id, new_password }) => {
      const hashedPassword = await bcrypt.hash(new_password, saltRounds);
      await db.none('UPDATE users SET password_hash = $1 WHERE user_id = $2', [hashedPassword, user_id]);
      const user = await db.one('SELECT * FROM users WHERE user_id = $1', [user_id]);
      return { ...user, password_hash: hashedPassword };
    },
  },
};

module.exports = userResolvers;
