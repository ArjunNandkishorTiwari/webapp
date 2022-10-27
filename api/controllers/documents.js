const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {upload,uploadMiddleware, documentToData, getDocumentDataById, setUniqueName, deleteDocumentDataById, getAllDocuments} = require("../services/documents");
const {getUserByUserName} = require("../services/users");




module.exports = {

    getAllDocuments : async(req,res) => {

        const reqUser = req.user;
        const reqPass = req.pass;


        const userData = await getUserByUserName(reqUser,reqPass);

        if (userData.status == 400){
            return res.status(400).json({"msg":"user not found"});
       }

        if (userData.status == 403){
            return res.status(403).json({"msg" : "not authorized"});
        }

        const result = await getAllDocuments(userData.id);

        if (result.status == 400){
            return res.status(400).json({"msg":"user not found"});
       }

        if (result.status == 403){
            return res.status(403).json({"msg" : "not authorized"});
        }


        console.log("!!!!!!!!",result);

       



        return res.status(200).json(result);
    },

    uploadDocument: async(req,res) => {

        // const file = req.file;

        // console.log("file",file);

    //     const UserData = getUserByUserName(req.user, req.pass);

    //     if (UserData.status == 400){
    //         return res.status(400).json({"msg":"user not found"});
    //    }

    //     if (UserData.status == 403){
    //         return res.status(403).json({"msg" : "not authorized"});
    //     }

        await setUniqueName();


        const Result = await upload.single("file");


        Result(req,res, async function(err) {

            if (err){
                console.log(err);
                return res.status(400).json({"msg" : "Error uploading file"});
            }


            const fileData = await uploadMiddleware(req,res);

            console.log("!!!!!!!!",fileData)

            const response = await documentToData(req,fileData);

            if (response.status == 400){
                return res.status(400).json({"msg":"user not found"});
           }
    
            if (response.status == 403){
                return res.status(403).json({"msg" : "not authorized"});
            }

            return res.status(201).json(response);

            
            
        })

        //console.log("flogal file path",globalFilePath);

        //console.log(result);


      //  return res.status(201).json({msg: "POST New Document"});
    },

    getDocumentById: async(req,res) => {

        const doc_ID = req.params.id;
        const reqUser = req.user;
        const reqPass = req.pass;


        const response = await getDocumentDataById(doc_ID, reqUser, reqPass);

        if (response.status == 400){
            return res.status(400).json({"msg":"Document not found"});
       }

        if (response.status == 403){
            return res.status(403).json({"msg" : "not authorized"});
        }

        if (response.status == 401){
            return res.status(401).json({"msg" : "Document not found"});
        }



        console.log("response",response);


        return res.status(200).json(response);
    },

    deleteDocument: async(req,res) => {

        const doc_ID = req.params.id;
        const reqUser = req.user;
        const reqPass = req.pass;


        const response = await deleteDocumentDataById(doc_ID, reqUser, reqPass);

        if (response.status == 400){
            return res.status(400).json({"msg":"Document not found"});
       }

        if (response.status == 403){
            return res.status(403).json({"msg" : "not authorized"});
        }

        if (response.status == 401){
            return res.status(401).json({"msg" : "User not found"});
        }

        return res.status(204).json({msg: "DELETE Document by ID"});
    }
}