
const {buildSchema} = require('graphql');

module.exports = buildSchema (`
type User {
    id: ID!
    username: String!
    email: String!
  }
  
  type Query {
    me: User # Query to get current user information
  }
  
  type Mutation {
    login(email: String!, password: String!): String # Mutation to authenticate user
    signup(username: String!, email: String!, password: String!): User # Mutation to create new user account
  }
  
  type Subscription {
    userLoggedIn: User # Subscription to notify when a user logs in
    userSignedUp: User # Subscription to notify when a new user signs up
  }
  
`);
  