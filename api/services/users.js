//const {pool} = require("../../config/db");

const {createPool} = require("mysql");
//onst config = require("config");
//const mysql = require("mysql");
const config = require("config");
const bcrypt = require("bcryptjs");

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
                console.log("this side");
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
                            console.log("48")
                           
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
       

        console.log("this check");

        

    },
    getUserData :  (id,user, pass, callBackFunction) => {

        try {
            pool.query(`select * from `+config.get("database")+`.users where id =?`,[id], (err,result,fields) => {

                
                if (err){
                   console.log("check 1",err);
                    return callBackFunction(err);
                }


    
                if (result.length == 0){
                    console.log("check 2");
                    //const error = new Error("Data not found for id ");
                    
                    return callBackFunction(null,result); 
                }
    
                
                
               

                const hash = bcrypt.compareSync(pass,result[0].password);

                console.log(hash);

                if (hash == false){
                    return callBackFunction(new Error("Authentication Failed"));
                }

                if (result[0].username != user || result[0].id != id) {
                    console.log("here in ")
                    console.log("check 3",comp);
                   
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
    
               // return ;
               // console.log("Fields",fields);
            })
    
        } catch (error) {

          

            return callBackFunction(error);
        }

       
    },
    updateUserRecord : async (payload,callBackFunction) => {

        const id = payload.params.id;

        pool.query(`select * from `+config.get("database")+`.users where id =?`,[id], (err,result,fields) => {
            console.log("0");
            if (err){
                return callBackFunction(err)
            }
            console.log("1");
            if (result.length == 0){
                console.log("check 2");
                //const error = new Error("Data not found for id ");
                
                return callBackFunction(null,result); 
            }
            console.log("2");
            const hash = bcrypt.compareSync(payload.pass,result[0].password);

                console.log(hash);

                if (hash == false){
                    return callBackFunction(new Error("Authentication Failed"));
                }

                if (result[0].username != payload.user || result[0].id != id) {
                    console.log("here in ")
                    console.log("check 3",comp);
                   
                    return callBackFunction(new Error("Authentication Failed"));
                }
                console.log("3");
            if (payload.body.first_name){
                console.log("here in first name");

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
                console.log("in password");
                const salt = bcrypt.genSaltSync(10) ;

                const hashedPassword = bcrypt.hashSync(payload.body.password,salt);
                var password = hashedPassword;
                
                
            }else{
                var password = result[0].password;
                
            }
            console.log("4");
            var update_time = new Date().toISOString();
            console.log("here");
            pool.query(`update `+config.get("database")+`.users set first_name = ?, last_name = ?, password = ?, account_updated = ? where id = ?`,
            [
                first_name,
                last_name,
                password,
                update_time,
                id
            ], (err,result)=> {
                console.log("5");
                console.log(err,result);

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