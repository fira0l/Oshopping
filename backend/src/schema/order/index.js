const orderTypeDefs = require('./order.types');
const {resolvers} = require('./order.resolvers');

module.exports = {
  typeDefs: orderTypeDefs,
  resolvers: resolvers,
};
