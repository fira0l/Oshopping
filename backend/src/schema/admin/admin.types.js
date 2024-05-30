const { gql } = require('graphql-tag');

const adminTypeDefs = gql`
  type Admin {
    admin_id: ID!
    username: String!
    password: String!
    email: String!
    first_name: String!
    last_name: String!
    address: String!
    phone_number: String!
    registration_date: String!
  }

  extend type Query {
    admin(id: ID!): Admin
    admins: [Admin]
  }

  extend type Mutation {
    registerAdmin(
      username: String!, 
      password: String!, 
      email: String!, 
      first_name: String!, 
      last_name: String!, 
      address: String!, 
      phone_number: String!
    ): Admin
    adminLogin(email: String!, password: String!): Admin
    changePasswordAdmin(email: String!): Admin
    resetPasswordAdmin(token: String!, password: String!): ResetPasswordResponse

  }

  type ResetPasswordResponse {
    message: String
  }

`;

module.exports = adminTypeDefs;
