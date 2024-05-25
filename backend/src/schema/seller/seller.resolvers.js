const bcrypt = require('bcrypt');
const db = require('../../../pgAdaptor').db;
const saltRounds = 10;

const sellerResolvers = {
  Query: {
    seller: async (_, { id }) => {
      try {
        return await db.one('SELECT * FROM sellers WHERE seller_id = $1', [id]);
      } catch (error) {
        console.error('Error fetching seller:', error);
        throw error;
      }
    },
    sellers: async () => {
      try {
        return await db.any('SELECT * FROM sellers');
      } catch (error) {
        console.error('Error fetching sellers:', error);
        throw error;
      }
    },
  },
  Mutation: {
    createSeller: async (_, { username, password_hash, email, first_name, last_name, address, phone_number }) => {
      try {
        const existingSeller = await db.oneOrNone('SELECT * FROM sellers WHERE username = $1', [username]);
        if (existingSeller) throw new Error('Username already exists');

        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
        const query = `
          INSERT INTO sellers (username, password_hash, email, first_name, last_name, address, phone_number)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        const newSeller = await db.one(query, [username, hashedPassword, email, first_name, last_name, address, phone_number]);
        return newSeller;
      } catch (error) {
        console.error("Error creating seller:", error);
        throw error;
      }
    },
  },
};

module.exports = sellerResolvers;
