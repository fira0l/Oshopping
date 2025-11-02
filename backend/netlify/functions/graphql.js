const { ApolloServer } = require('apollo-server-lambda');
const { buildSchema } = require('graphql');

// Import your existing schema from app.js setup
const typeDefs = `
  type Query {
    hello: String
    products: [Product]
    getAllCategories: [Category]
    getProductById(id: ID!): Product
  }
  
  type Mutation {
    createProduct(name: String!, price: Float!, description: String): Product
    createCategory(name: String!): Category
    registerUser(
      username: String!
      password_hash: String!
      email: String!
      first_name: String!
      last_name: String!
      address: String!
      phone_number: String!
    ): User
  }
  
  type Product {
    product_id: ID!
    name: String!
    description: String
    price: Float!
    category_id: String
    seller_id: String
    stock_quantity: Int
    image: String
    created_at: String
  }
  
  type Category {
    category_id: ID!
    name: String!
    parent_category_id: String
    parent_category: Category
  }
  
  type User {
    user_id: ID!
    username: String!
    email: String!
    first_name: String!
    last_name: String!
    address: String
    phone_number: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from OShop API!',
    products: () => [],
    getAllCategories: () => [],
    getProductById: (_, { id }) => null,
  },
  Mutation: {
    createProduct: (_, args) => ({ product_id: '1', ...args }),
    createCategory: (_, args) => ({ category_id: '1', ...args }),
    registerUser: (_, args) => ({ user_id: '1', ...args }),
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