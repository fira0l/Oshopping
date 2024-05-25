const orderTypeDefs = require('./order.types');
const orderResolvers = require('./order.resolvers');

module.exports = {
  typeDefs: orderTypeDefs,
  resolvers: orderResolvers,
};
