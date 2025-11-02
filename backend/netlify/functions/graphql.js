const { ApolloServer } = require('apollo-server-lambda');

// Standalone GraphQL schema for Netlify
const typeDefs = `
  type Query {
    hello: String
  }
  
  type Mutation {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from OShop Netlify API!',
  },
  Mutation: {
    hello: () => 'Mutation working',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});