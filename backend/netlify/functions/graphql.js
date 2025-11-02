const { ApolloServer } = require('apollo-server-lambda');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');

// Load type definitions and resolvers
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, '../../src/schema/**/*.types.js')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, '../../src/schema/**/*.resolvers.js')));

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create Apollo Server
const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});