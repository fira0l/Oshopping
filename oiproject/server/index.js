const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const {graphqlSchema } = require("./schema/schema")
const {graphqlResolver} = require("./resolver/signup")
const { login } = require("./resolver/login")
const {product} = require('./resolver/prouducts')
const cors = require('cors');
const pool = require('./db');
const mergeGraphql = {...graphqlResolver,...login,...product};
const app = express();
app.use(cors());
app.use(express.json());

const saltRounds = 10;



app.use("/graphql", graphqlHTTP({
  schema: graphqlSchema,
  rootValue: mergeGraphql,
  graphiql: true,
}));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
