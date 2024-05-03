const { ApolloServer, gql, PubSub } = require('apollo-server');

// Create a PubSub instance
const pubsub = new PubSub();

// Sample users data (for demonstration purposes)
const users = [];



// Define your resolvers
const resolvers = {
  Query: {
    me: () => {
      // Return the currently logged in user (this could be based on authentication)
      return users[0]; // For simplicity, just return the first user in the array
    },
  },
  Mutation: {
    login: (_, { email, password }) => {
      // Here you would typically authenticate the user
      // For simplicity, just return a token
      return 'dummy_token';
    },
    signup: (_, { username, email, password }) => {
      // Here you would typically create a new user in your database
      const newUser = { id: String(users.length + 1), username, email };
      users.push(newUser);
      // Publish the userSignedUp event
      pubsub.publish('USER_SIGNED_UP', { userSignedUp: newUser });
      return newUser;
    },
  },
  Subscription: {
    userLoggedIn: {
      subscribe: () => pubsub.asyncIterator(['USER_LOGGED_IN']),
    },
    userSignedUp: {
      subscribe: () => pubsub.asyncIterator(['USER_SIGNED_UP']),
    },
  },
};

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
