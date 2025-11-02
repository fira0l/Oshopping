const { ApolloServer } = require('apollo-server-lambda');

// Import your existing app setup
let server;

try {
  // Try to import your existing GraphQL setup
  const app = require('../../app.js');
  
  // Extract Apollo Server from your app
  if (app.apolloServer) {
    server = app.apolloServer;
  } else {
    throw new Error('Apollo server not found in app');
  }
} catch (error) {
  console.error('Failed to load existing app:', error);
  
  // Fallback basic schema
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
      hello: () => 'Hello from OShop API - Basic Mode'
    },
    Mutation: {
      hello: () => 'Mutation working'
    }
  };
  
  server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});