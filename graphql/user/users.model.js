const db = require('../../database/database')
const user =[]
const users = db.retriveUsers()

function retriveAllUsers(){
    return users
}

module.exports = {
    retriveAllUsers
}
