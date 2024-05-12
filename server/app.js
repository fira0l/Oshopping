const express = require("express");
const app = express();
const path = require('path')
const {buildSchema}= require("graphql")
const {graphqlHTTP} =require('express-graphql')
const {makeExecutableSchema}=require('@graphql-tools/schema')
const {loadFilesSync} =require('@graphql-tools/load-files')



const databases = require('../database/database')


const typesArray = loadFilesSync(path.join(__dirname,'**/**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname,'**/**/*.resolvers.js'))
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql:true,
}))

databases
// databases.retriveUsers()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`LOCAL HOST IS CONNECTED TO A PORT NO ${PORT}`);
});
