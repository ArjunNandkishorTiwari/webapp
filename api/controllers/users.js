const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {createNewUser, getUserData, updateUserRecord } = require("../services/users");

const {validateEmailId} = require("../helper/helper");



module.exports = {

    createUser : async(req,res) => {
        if (
            req.body.password == null ||  req.body.first_name == null || req.body.last_name == null || req.body.username == null


            

        ){
            console.log("check 0");

            res.status(400).json({"msg" : "Please provide all the data"});
            return;

        }
        const {username,password,first_name,last_name} = req.body;

        const emailValidation = validateEmailId(username);

        if (emailValidation == false) {
            console.log("check 1");
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
            console.log("check 2");
            return res.status(400).json({"msg" : "bad request"})
        }
        else{
            return res.status(201).json(response);
        }

       

    },
    getUser : async (req,res) => {
        const id = req.params.id;
       

        if (!id) {

            res.status(400).send();

        }

        response = await getUserData(id, req.user, req.pass);

        if (response.status == 400){
            res.status(400).json({"msg":"user not found"});
            return;
        }

        // await getUserData(id, req.user, req.pass, (err, result)=>{
        //     if (err){

        //         res.status(403).json({"msg" : "not authorized"});
        //         return;
                
        //     }
           
        //     if (result.length == 0){
        //         res.status(500).json({"msg":"Data not found"});
        //         return;
        //     }
            
        //     res.status(200).send(result);


        // })

        


        
    },
    updateUser : async (req,res) => {
        const id = req.params.id;

        if (id == null){
            res.status(400).send();
            return;
        }

        if (
            "id" in req.body ||  "account_created" in req.body || "account_updated" in req.body || "username" in req.body


            

        ){

            res.status(400).json({"msg" : "Cannot update id, username, created date , updated date"});
            return;

        }

        

        await updateUserRecord(req, (err,result)=>{
            if (err){

                res.status(403).json({"msg" : "Forbidden"});
                return;
                
            }
           
            if (result.length == 0){
                res.status(500).json({"msg":"Data not found"});
                return;
            }
            
            return res.status(204).send(result);

        })
        
    }


}
    
