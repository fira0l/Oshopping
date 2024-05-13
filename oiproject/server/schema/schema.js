const { buildSchema } = require("graphql");

const graphqlSchema = buildSchema(`
  type User {
    user_id: ID!
    username: String!
    password_hash :String!
    email: String!
    first_name: String
    last_name: String
    address: String
    phone_number: String
    registration_date: String!
  }
  type Category {
    
    name: String
    parent_category_id:Int !
  }
  type Mutation {
    registerUser(
      username: String!
      password: String!
      email: String!
      firstName: String
      lastName: String
      address: String
      phoneNumber: String
    ): User!
    
    login(emailOrUsername: String!, password: String!):AuthPayload
    
    postEditUser(
      id:ID!
      username: String!
      password: String!
      email: String!
      firstName: String
      lastName: String
      address: String
      phoneNumber: String
    ):User!
   
    changePassword(id:ID! password:String!):User!
   createCategory(name:String):Category!
    createSubCategory(
      name: String
    parent_category_id:Int!):Category!
    postEditCategory(id:ID! name:String!):Category!
    deleteSubCategory(id:ID!):Category!
  
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  type Query {
    getAllUsers:[User!]!
    getSingleUsers(id:ID!):User!
   getAllCategories:[Category!]!
   getSubCategories:[Category!]!

  }
`);
module.exports = {graphqlSchema }
