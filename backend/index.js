const express = require("express");
const cors = require('cors');
const orderRoute = require('./src/routes/orderRoute');

// Create Express app for local development
const app = express();
app.use(cors());
app.use(express.json());

app.use('/order', orderRoute);

app.get('/', (req, res) => {
  res.json({ message: 'OShop Backend API - Use /.netlify/functions/graphql for GraphQL' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);