const { gql } = require('graphql-tag');

const orderTypeDefs = gql`
  type OrderNew {
    order_new_id: ID!
    user_id: ID!
    product_id: ID!
    order_date: String!
    status: String
    total_amount: Float!
    shipping_address: String!
    shipping_city: String!
    postal_code: String!
    quantity: Int!
    unit_price: Float!
    shipping_country: String!
    user: User
    product: Product
  }

  extend type Query {
    orderNew(id: ID!): OrderNew
    orderNews: [OrderNew]
    orderNewsByUserId(user_id: ID!): [OrderNew] # New query definition
  }

  extend type Mutation {
    orderProduct(
      user_id: ID!,
      product_id: ID!,
      total_amount: Float!,
      shipping_address: String!,
      shipping_city: String!,
      postal_code: String!,
      quantity: Int!,
      unit_price: Float!,
      shipping_country: String!
    ): OrderNew
    deleteProductOrder(order_new_id: ID!): String
    updateOrderStatus(order_new_id: ID!, status: String!): OrderNew 

  }
`;

module.exports = orderTypeDefs;
