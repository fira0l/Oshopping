const productTypeDefs = require('./product.types');
const productResolvers = require('./product.resolvers');

module.exports = {
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
};
