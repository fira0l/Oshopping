const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authentication');
const { orderProduct } = require('../schema/order/order.resolvers');

router.post('/orderProduct', authenticate, async (req, res) => {
  try {
   

    // Extract necessary parameters from the request body
    const { user_id, product_id, total_amount, shipping_address, shipping_city, postal_code, shipping_country, quantity, unit_price } = req.body;
    console.log(user_id);
        
    // Call the orderProduct function
    const result = await orderProduct(null, { user_id, product_id, total_amount, shipping_address, shipping_city, postal_code, shipping_country, quantity, unit_price });
    // Respond with the result
    res.status(200).json(result);
  } catch (error) {
    // Handle errors
    console.error('Error occurred while processing order:', error.message);
    res.status(500).json({ error: 'An error occurred while processing the order.' });
  }
});

router.get('/boo', (req, res) => {
  res.send('<h1>hello world</h1>');
});

module.exports = router;
