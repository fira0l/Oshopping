const crypto = require('crypto');
const db = require('../../pgAdaptor').db;

async function createSession(userId, expirationTime) {
  const sessionToken = crypto.randomBytes(16).toString('hex');
  const query = `
    INSERT INTO user_sessions (user_id, session_token, expiration_time)
    VALUES ($1, $2, $3)
    RETURNING session_id;
  `;
  const values = [userId, sessionToken, expirationTime];

  try {
    const result = await db.one(query, values);
    return { sessionId: result.session_id, sessionToken };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

module.exports = {
  createSession,
};
