const { gql } = require('graphql-tag');

const userTypeDefs = gql`
  type User {
    user_id: ID!
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
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    registerUser(username: String!, password_hash: String!, email: String!, first_name: String!, last_name: String!, address: String!, phone_number: String!): User
    login(username: String!, password: String!): AuthPayload
    changePassword(email: String!): User
    resetPassword(token: String!, password: String!): ResetPasswordResponse
  }

  type ResetPasswordResponse {
    message: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = userTypeDefs;
