const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {createNewUser, getUserData, updateUserRecord } = require("../services/users");

const {validateEmailId} = require("../helper/helper");

// var SDC = require("statsd-client");
const log = require("../middleware/logger");
const logger = log.getLogger("logs")

// const sdc = new SDC({
//     host : 'localhost',
//     port : 8125,
// })

var lynx = require("lynx");

const sdc = new lynx('localhost',8125);



module.exports = {

    createUser : async(req,res) => {

        try {

            logger.info("inside create user")
            sdc.increment("POST/v1/users/");
            const timer = sdc.createTimer('users.create.time');

            if (
                req.body.password == null ||  req.body.first_name == null || req.body.last_name == null || req.body.username == null
    
    
                
    
            ){
                logger.error("Please provide all the data");
    
                res.status(400).json({"msg" : "Please provide all the data"});
                return;
    
            }
            const {username,password,first_name,last_name} = req.body;
    
            const emailValidation = validateEmailId(username);
    
            if (emailValidation == false) {
                logger.error("Email validation failed");
                return res.status(400).json({"msg" : "bad request"});
                
            }
    
            const salt = bcrypt.genSaltSync(10) ;
    
            const hashedPassword = bcrypt.hashSync(password,salt);
    
            var date  = new Date().toISOString();
    
            var hashedId = crypto.randomBytes(16).toString("hex");
    
            const payload = {
                id : hashedId,
                username : username,
                password : hashedPassword,
                first_name : first_name,
                last_name : last_name,
                account_created : date,
                account_updated : date
    
    
    
            }
    
    
            const response = await createNewUser(payload);
    
            console.log(response);
    
            if (response.status == 400){
                logger.error("Bad request");
                return res.status(400).json({"msg" : "bad request"})
            }
            else{
                timer.stop();
                logger.info("User created");
                return res.status(201).json(response);
            }
    
            
        } catch (error) {

            logger.error("In catch error");

            console.log(error)
            
        }
       
       

    },
    getUser : async (req,res) => {

        try {

            logger.info("inside get user by id")
            sdc.increment("GET/v1/users/id");
            const timer = sdc.createTimer('users.getuser.time');

            const id = req.params.id;
       

            if (!id) {
                logger.error("Please provide ID");
    
                return res.status(400).send();
                
    
            }
    
            const response = await getUserData(id, req.user, req.pass);
    
            if (response.status == 400){
                logger.error("User not found");
                return res.status(400).json({"msg":"user not found"});
           }
    
            if (response.status == 403){
                logger.error("Not Authorized");
                return res.status(403).json({"msg" : "not authorized"});
            }
            timer.stop();
            return res.status(200).json(response);
            
        } catch (error) {
            logger.error("In Catch Error");
            console.log(error);
            
        }


       

       

        


        
    },
    updateUser : async (req,res) => {
        try {

            logger.info("inside update user by id")
            sdc.increment("PUT/v1/users/id");
            const timer = sdc.createTimer('users.update.time');

            const id = req.params.id;

            if (id == null){
                logger.error("Id not found");
                res.status(400).send();
                return;
            }
    
            if (
                "id" in req.body ||  "account_created" in req.body || "account_updated" in req.body || "username" in req.body
    
    
                
    
            ){
                logger.error("Cannot Update");
    
                res.status(400).json({"msg" : "Cannot update id, username, created date , updated date"});
                return;
    
            }
    
            
        const result = await updateUserRecord(req);
    
        if (result.status == 403){
            logger.error("Forbidden");
            return res.status(403).json({"msg" : "Forbidden"});
    
        }
    
        if (result.status == 400){
            logger.error("Data not found");
            return res.status(400).json({"msg":"Data not found"});
    
        }
        timer.stop();
    
        return res.status(204).send();
    
    
            
        } catch (error) {
            logger.error("In catch error");

            console.log(error);
            
        }
   
        
    }


}
    
