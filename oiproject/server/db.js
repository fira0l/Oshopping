const Pool = require('pg').Pool;
const pool = new Pool({
  user:"postgres",
  password:"12letman",
  host:"localhost",
  port:5432,
  database:"oishopdatabase"

})
module.exports = pool;