//const {pool} = require("../../config/db");

const {createPool} = require("mysql");
//onst config = require("config");
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


module.exports = {
    createNewUser : (payload,callBackFunction) => {

        console.log("check 1");

        pool.query(
            `insert into `+config.get("database")+`.users (username,password,first_name,last_name,account_created,account_updated) values(?,?,?,?,?,?)`,
            [
               
                payload.username,
                payload.password,
                payload.first_name,
                payload.last_name,
                payload.account_created,
                payload.account_updated
            ],(err,result) => {
                console.log("check 2");
                if (err) {
                    console.log("check 3",err);
                    return callBackFunction(err);
                }

                console.log("check 4",result);

                return callBackFunction(null,{
                    id : payload.id,
                    first_name : payload.first_name,
                    last_name : payload.last_name,
                    username : payload.username,
                    account_created : payload.account_created,
                    account_updated : payload.account_updated


                });

            }
        )

    },
}