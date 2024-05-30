const userTypeDefs = require('./user.types');
const {userResolvers} = require('./user.resolvers');

module.exports = {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
};
