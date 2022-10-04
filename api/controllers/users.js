const bcrypt = require("bcryptjs");

const {createNewUser} = require("../services/users");



module.exports = {

    createUser : (req,res) => {
        const {username,password,first_name,last_name} = req.body;

        const salt = bcrypt.genSaltSync(10) ;

        const hashedPassword = bcrypt.hashSync(password,salt);

        var date  = new Date().toISOString();

        const payload = {
            
            username : username,
            password : hashedPassword,
            first_name : first_name,
            last_name : last_name,
            account_created : date,
            account_updated : date



        }
        console.log(payload)

        createNewUser(payload, (err,result) => {
            if (err) {
                console.log("check 5");
                res.status(400).send();
            }
            console.log("check 6");
            res.status(201).send(result);
        });

        //res.status(200).send();

    },
    getUser : (req,res) => {
        res.status(200).send();
    },
    updateUser : (req,res) => {
        res.status(200).send();
    }


}
    
