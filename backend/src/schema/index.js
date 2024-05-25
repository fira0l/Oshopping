const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

// Load all type definitions and resolvers from the schema folder
const typesArray = loadFilesSync(path.join(__dirname, '**/*.types.js'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// Define base type definitions
const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Merge the base type definitions with your loaded type definitions
const typeDefs = mergeTypeDefs([baseTypeDefs, ...typesArray]);
const resolvers = mergeResolvers(resolversArray);

// Create the executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
