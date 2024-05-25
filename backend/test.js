const { db } = require("./pgAdaptor");

db.one('select * from users')
    .then(res => {
        console.log(res);
    });