const {createPool} = require("mysql");
//const mysql = require("mysql");
const config = require("config");
console.log("config print");
console.log(config.get("host"));
const pool = createPool({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    connectionLimit : 10
    



});




// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }

//     console.log('Connected to the MySQL server.');
//   });

module.exports = pool;