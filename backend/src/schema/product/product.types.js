const { gql } = require('graphql-tag');

const productTypeDefs = gql`
  type Product {
    product_id: ID!
    name: String!
    description: String!
    price: Float!
    category_id: ID!
    seller_id: ID!
    stock_quantity: Int!
    created_at: String!
    image: String
  }

  extend type Query {
    product(id: ID!): Product
    products: [Product]
  }

  extend type Mutation {
    createProduct(
      name: String!, 
      description: String!, 
      price: Float!, 
      category_id: ID!, 
      seller_id: ID!, 
      stock_quantity: Int!
    ): Product
    deleteProduct(product_id: ID!): Product
    decreaseStockQuantity(product_id: ID!, quantity: Int!): Product
    updateStockQuantity(product_id: ID!, stock_quantity: Int!): Product  
  }
`;

module.exports = productTypeDefs;
