const { gql } = require('graphql-tag');

const categoryTypeDefs = gql`
  type Category {
    category_id: ID!
    name: String!
    parent_category_id: ID
    parent_category: Category
  }

  extend type Query {
    getAllCategories: [Category]
    getAllSubCategories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!): Category
    createSubCategory(name: String!, parent_category_id: ID!): Category
    postEditCategory(category_id: ID!, name: String!): Category
  }
`;

module.exports = categoryTypeDefs;
