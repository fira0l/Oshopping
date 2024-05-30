// middleware/authenticate.js
const db = require('../../pgAdaptor').db;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || "secret"; // Use environment variable for the secret key

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    } else {
      console.error('Authentication error:', error.message);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
};

module.exports = authenticate;
