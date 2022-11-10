const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {upload,uploadMiddleware, documentToData, getDocumentDataById, setUniqueName, deleteDocumentDataById, getAllDocuments} = require("../services/documents");
const {getUserByUserName} = require("../services/users");
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

    getAllDocuments : async(req,res) => {

        logger.info(" In Get All Documents");
        sdc.increment("GET/v1/documents");
        const timer = sdc.createTimer('documents.getall.time');


        try {


        const reqUser = req.user;
        const reqPass = req.pass;


        const userData = await getUserByUserName(reqUser,reqPass);

        if (userData.status == 400){
            logger.error("User not found");
            return res.status(400).json({"msg":"user not found"});
       }

        if (userData.status == 403){
            logger.error("Not Authorized");
            return res.status(403).json({"msg" : "not authorized"});
        }

        const result = await getAllDocuments(userData.id);

        if (result.status == 400){
            logger.error("User not found");
            return res.status(400).json({"msg":"user not found"});
       }

        if (result.status == 403){
            logger.error("Not Authorized");
            return res.status(403).json({"msg" : "not authorized"});
        }



       
        timer.stop()


        return res.status(200).json(result);
            
        } catch (error) {
            logger.error("In catch error");

            console.log(error);
            
        }

    },

    uploadDocument: async(req,res) => {




    try {

        logger.info(" In Upload Document");
        sdc.increment("POST/v1/documents/");
        const timer = sdc.createTimer('documents.create.time');

        const reqUser = req.user;
        const reqPass = req.pass;


        const userData = await getUserByUserName(reqUser,reqPass);

        if (userData.status == 400){
            logger.error("User not found");
            return res.status(400).json({"msg":"user not found"});
       }

        if (userData.status == 403){
            logger.error("Not Authorized");
            return res.status(403).json({"msg" : "not authorized"});
        }

        await setUniqueName(req.user);


        const Result = await upload.single("file");


        Result(req,res, async function(err) {

            if (err){
                logger.error("Error uploading file");
                return res.status(400).json({"msg" : "Error uploading file"});
            }


            const fileData = await uploadMiddleware(req,res);


            const response = await documentToData(req,fileData);

            if (response.status == 400){
                logger.error("User not found");
                return res.status(400).json({"msg":"user not found"});
           }
    
            if (response.status == 403){
                logger.error("Not Authorized");
                return res.status(403).json({"msg" : "not authorized"});
            }

            timer.stop();

            return res.status(201).json(response);

            
            
        })

  
        
    } catch (error) {
        logger.error("In Catch Error");

        console.log(error);
        
    }

    },

    getDocumentById: async(req,res) => {

        try {

            logger.info(" In Get Document By ID");
            sdc.increment("GET/v1/documents/id");
            const timer = sdc.createTimer('documents.getbyid.time');

            const doc_ID = req.params.id;
            const reqUser = req.user;
            const reqPass = req.pass;
    
    
            const response = await getDocumentDataById(doc_ID, reqUser, reqPass);

            console.log("response",response);
    
            if (response.status == 400){
                logger.error("Document not found");
                return res.status(400).json({"msg":"Document not found"});
           }
    
            if (response.status == 403){
                logger.error("not authorized");
                return res.status(403).json({"msg" : "not authorized"});
            }
    
            if (response.status == 401){
                logger.error("Document not found");
                return res.status(401).json({"msg" : "Document not found"});
            }
    
    
    
            timer.stop();
    
            return res.status(200).json(response);
    


            
        } catch (error) {
            logger.error("In Catch error");
            console.log(error);
        }

    },

    deleteDocument: async(req,res) => {



        try {
            const timer = sdc.createTimer('documents.delete.time');

            logger.info(" In Delete Document");
            sdc.increment("DELETE/v1/documents/id");


        const doc_ID = req.params.id;
        const reqUser = req.user;
        const reqPass = req.pass;


        const response = await deleteDocumentDataById(doc_ID, reqUser, reqPass);

        if (response.status == 400){
            logger.error("Document not found");
            return res.status(400).json({"msg":"Document not found"});
       }

        if (response.status == 403){
            logger.error("not authorized");
            return res.status(403).json({"msg" : "not authorized"});
        }

        if (response.status == 401){
            logger.error("User not found");
            return res.status(401).json({"msg" : "User not found"});
        }

        timer.stop();

        return res.status(204).json({msg: "DELETE Document by ID"});
            
        } catch (error) {
            logger.error("Inside catch error");

            console.log(error);
            
        }

    }
}