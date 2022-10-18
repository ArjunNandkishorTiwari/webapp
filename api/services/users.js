
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
    createNewUser : async (payload) => {

        const user = await User.findOne({where : {username: payload.username}})

        if (user){
            console.log("in user == null check",user);
            const response = {
                status : 400,
                msg : "User Already exists"
            }

            return response;
        }

        const newUser = new User(payload);

        const resp = await newUser.save();
        
        const response = {
            id : payload.id,
            first_name : payload.first_name,
            last_name : payload.last_name,
            username : payload.username,
            account_created : payload.account_created,
            account_updated : payload.account_updated
        }

        return response;


       
       


        

    },
    getUserData :  async(id,user, pass, callBackFunction) => {

        try {

            const userFind = await User.findOne({where : {id: id}});

            if (userFind == null){
                const response = {
                    status : 400
                }
                return response;
            }

            const hash = comparePassword(pass,userFind.password);


            if (hash == false){
                const response = {
                    status : 403
                }
                return response;
            }

            if (userFind.username != user || userFind.id != id) {
                   
                const response = {
                    status : 403
                }
                return response;
            }

            const response = {
                id : userFind.id,
                first_name : userFind.first_name,
                last_name : userFind.last_name,
                username : userFind.username,
                account_created : userFind.account_created,
                account_updated : userFind.account_updated

            }

            return response


            
        } catch (error) {
            console.log(error)
            
        }

       
       
    },
    updateUserRecord : async (payload) => {


        try {

            const id = payload.params.id;


            const userUpdate = await User.findOne({where : {id: id}});
    
    
            if (userUpdate == null){
                const response = {
                    status : 400
                }
                return response;
            }
    
            const hash = comparePassword(payload.pass,userUpdate.password);
    
    
            if (hash == false){
    
                const response = {
                    status : 403
                }
                return response;
                }
    
            if (userUpdate.username != payload.user || userUpdate.id != id) {
    
                        
                       
                const response = {
                    status : 403
                }
                return response;
                }
    
    
    
                if (payload.body.first_name){
    
                    var first_name = payload.body.first_name;
                    
                    
                }else{
                    var first_name = userUpdate.first_name;
                }
    
                if (payload.body.last_name){
                    var last_name = payload.body.last_name;
                    
                    
                }else{
                    var last_name = userUpdate.last_name;
                }
    
                if (payload.body.password){
                    const salt = bcrypt.genSaltSync(10) ;
    
                    const hashedPassword = bcrypt.hashSync(payload.body.password,salt);
                    var password = hashedPassword;
                    
                    
                }else{
                    var password = userUpdate.password;
                    
                }
                var update_time = new Date().toISOString();
    
    
                User.update({
                    first_name : first_name,
                    last_name : last_name,
                    password : password,
                    account_updated : update_time
                    // updatedAt : update_time
                    
    
                },{
                    where: { username: userUpdate.username }
                });
    
                const response = {
                    status : 200
                }
    
                return response;
    
             
            
        } catch (error) {

            console.log(error);
            
        }

         

        


       

    }
}