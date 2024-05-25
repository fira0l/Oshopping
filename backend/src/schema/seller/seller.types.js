const { gql } = require('graphql-tag');

const sellerTypeDefs = gql`
  type Seller {
    seller_id: ID!
    username: String!
    password_hash: String!
    email: String!
    first_name: String!
    last_name: String!
    address: String!
    phone_number: String!
    registration_date: String!
  }

  extend type Query {
    seller(id: ID!): Seller
    sellers: [Seller]
  }

  extend type Mutation {
    createSeller(username: String!, password_hash: String!, email: String!, first_name: String!, last_name: String!, address: String!, phone_number: String!): Seller
  }
`;

module.exports = sellerTypeDefs;
