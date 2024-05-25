const db = require('../../../pgAdaptor').db;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  },
};

module.exports = adminResolvers;
