
const {createPool} = require("mysql");
const config = require("config");
const bcrypt = require("bcryptjs");
const {comparePassword} = require("../helper/helper");
const User = require("../models/users");

const pool = createPool({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    connectionLimit : 10
    



});


module.exports = {
    createNewUser : (payload,callBackFunction) => {


        pool.query(`select * from `+config.get("database")+`.users where username =?`,[payload.username], (err,resul,fields) => {
            if (resul.length >= 1){
                return callBackFunction(new Error("USer already exists"),null);
            } else{

                pool.query(
                    `insert into `+config.get("database")+`.users (id,username,password,first_name,last_name,account_created,account_updated) values(?,?,?,?,?,?,?)`,
                    [
                        payload.id,
                        payload.username,
                        payload.password,
                        payload.first_name,
                        payload.last_name,
                        payload.account_created,
                        payload.account_updated
                    ],(err,result) => {
                        
                        if (err) {
                           
                            return callBackFunction(err);
                        }
        
                        
        
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
            }
        });
       


        

    },
    getUserData :  (id,user, pass, callBackFunction) => {

        try {
            pool.query(`select * from `+config.get("database")+`.users where id =?`,[id], (err,result,fields) => {

                
                if (err){
                    return callBackFunction(err);
                }


    
                if (result.length == 0){
                    
                    return callBackFunction(null,result); 
                }
    
                
                
               

                const hash = comparePassword(pass,result[0].password);


                if (hash == false){
                    return callBackFunction(new Error("Authentication Failed"));
                }

                if (result[0].username != user || result[0].id != id) {
                   
                   
                    return callBackFunction(new Error("Authentication Failed"));
                }

               
    
                return callBackFunction(null, {
                    id : result[0].id,
                    first_name : result[0].first_name,
                    last_name : result[0].last_name,
                    username : result[0].username,
                    account_created : result[0].account_created,
                    account_updated : result[0].account_updated
                })
    
              
            })
    
        } catch (error) {

          

            return callBackFunction(error);
        }

       
    },
    updateUserRecord : async (payload,callBackFunction) => {

        const id = payload.params.id;

        pool.query(`select * from `+config.get("database")+`.users where id =?`,[id], (err,result,fields) => {
            if (err){
                return callBackFunction(err)
            }
            if (result.length == 0){
                
                return callBackFunction(null,result); 
            }

            const hash = comparePassword(payload.pass,result[0].password);


                if (hash == false){
                    return callBackFunction(new Error("Authentication Failed"));
                }

                if (result[0].username != payload.user || result[0].id != id) {
                    
                   
                    return callBackFunction(new Error("Authentication Failed"));
                }
            if (payload.body.first_name){

                var first_name = payload.body.first_name;
                
                
            }else{
                var first_name = result[0].first_name;
            }

            if (payload.body.last_name){
                var last_name = payload.body.last_name;
                
                
            }else{
                var last_name = result[0].last_name;
            }

            if (payload.body.password){
                const salt = bcrypt.genSaltSync(10) ;

                const hashedPassword = bcrypt.hashSync(payload.body.password,salt);
                var password = hashedPassword;
                
                
            }else{
                var password = result[0].password;
                
            }
            var update_time = new Date().toISOString();
            pool.query(`update `+config.get("database")+`.users set first_name = ?, last_name = ?, password = ?, account_updated = ? where id = ?`,
            [
                first_name,
                last_name,
                password,
                update_time,
                id
            ], (err,result)=> {

                if (err){
                    return callBackFunction(err)
                }

                return callBackFunction(null, {
                    message : "Successful"
                });
            });

        });

    }
}