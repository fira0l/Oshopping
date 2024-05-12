const usersModel = require('./users.model')

require('../user/users.model')
module.exports = {
    Query:{
        users: () =>{
            return usersModel.retriveAllUsers();
        }
    }
}