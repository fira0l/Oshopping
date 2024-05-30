"use strict";
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require("graphql");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const db = require("./pgAdaptor").db;
const schema = require('./src/schema');
const orderRoute = require('./src/routes/orderRoute')

// Create Express app
const app = express();
app.use(cors());
app.use(express.json())

const upload = multer({ dest: 'uploads/' });

app.use('/order',orderRoute)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), async (req, res) => {
  const { name } = req.body; // Extract product name from request body
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = `${Date.now()}-${req.file.originalname}`;
  const filePath = path.join(__dirname, 'uploads', fileName);

  try {
    await fs.promises.rename(req.file.path, filePath);
    
    const fileUrl = `http://localhost:1000/uploads/${fileName}`;

    // Update the 'image' column in the 'products' table where the 'name' matches
    await db.query(
      'UPDATE products SET image=$1 WHERE name=$2',
      [fileUrl, name]
    );

    res.json({ message: 'File uploaded successfully', fileUrl });
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).send('Error saving file.');
  }
});

// Define GraphQL endpoint
app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(1000, () =>
  console.log('Server is running on http://localhost:1000')
);

