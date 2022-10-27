//require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
//const multerS3 = require('multer-s3');
const db = require("../middleware/db");
const User = db.models.User;
const Document = db.models.Document;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {comparePassword} = require("../helper/helper");
const path = require("path");

var uniqueFileName = "";



// aws.config.update({
//     awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: process.env.REGION,

// });

const bucket = process.env.AWS_BUCKET;

const S3 = new aws.S3();

// const upload = multer({//
//     storage: multerS3({
//         s3: S3,
//         acl: "public-read",
//         bucket: bucket,
//         key: ( file, cb) => {
//             cb(null, file.name)

//         }
       

//     })
//});


module.exports = {
    setUniqueName : (user) => {
        uniqueFileName = crypto.randomBytes(16).toString("hex");


    },
    upload : multer({
        storage: multerS3({
            s3: S3,
            ACL: "public-read",
            bucket: bucket,
            key: ( req, file, cb) => {
                console.log("File",file);
                cb(null, uniqueFileName+path.extname(file.originalname)) //file.originalname
    
            }
           
    
        })
    }),
    uploadMiddleware: async(req,res) => {

        console.log(req.file);

        const Obj = {
            filename : uniqueFileName+path.extname(req.file.originalname),
            location : req.file.location

        }

        return Obj;


    },
    documentToData: async(req, fileData) => {

        const userFind = await User.findOne({where : {username: req.user}});

        if (userFind == null){
            const response = {
                status : 400
            }
            return response;
        }

        const hash = comparePassword(req.pass,userFind.password);


            if (hash == false){
                const response = {
                    status : 403
                }
                return response;
            }

            if (userFind.username != req.user) {
                   
                const response = {
                    status : 403
                }
                return response;
            }

            var hashedId = crypto.randomBytes(16).toString("hex");
            var date  = new Date().toISOString();

            const payload = {
                user_id : userFind.id,
                doc_id : hashedId,
                name: fileData.filename,
                date_created: date,
                s3_bucket_path: fileData.location


            }

            const newDocument = new Document(payload);

            const resp = await newDocument.save();

            const response = {
                status : 201,
                user_id : userFind.id,
                doc_id : hashedId,
                name: fileData.filename,
                date_created: date,
                s3_bucket_path: fileData.location

            }

            return response;



    },

    getDocumentDataById : async (id, user, pass) => {
        try {

            const documentData = await Document.findOne({where : {doc_id: id}});

            if (documentData == null){
                const response = {
                    status : 400
                }
                return response;
            }

            console.log("document_data",documentData);

            const userFind = await User.findOne({where : {id: documentData.user_id}});

            if (userFind == null){
                const response = {
                    status : 403
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

            if (userFind.username != user || userFind.id != documentData.user_id) {
                   
                const response = {
                    status : 403
                }
                return response;
            }

            const params = {
                Bucket: bucket,
                Key: documentData.name
            }

            const fileStatus = await S3.headObject(params).promise();

            if (!fileStatus) {
                const response = {
                    status : 400
                }
                return response;

            }

            const response = {
                doc_id: documentData.doc_id,
                user_id: documentData.user_id,
                name: documentData.name,
                date_created: documentData.date_created,
                s3_bucket_path: documentData.s3_bucket_path,

            }

            return response;


            
        } catch (error) {
            console.log(error);
        }
    },
    deleteDocumentDataById : async (id, user, pass) => {
        try {

            const documentData = await Document.findOne({where : {doc_id: id}});

            if (documentData == null){
                const response = {
                    status : 400
                }
                return response;
            }

            console.log("document_data",documentData);

            const userFind = await User.findOne({where : {id: documentData.user_id}});

            if (userFind == null){
                const response = {
                    status : 403
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

            if (userFind.username != user || userFind.id != documentData.user_id) {
                   
                const response = {
                    status : 403
                }
                return response;
            }

            const params = {
                Bucket: bucket,
                Key: documentData.name
            }

            const fileStatus = await S3.headObject(params).promise();

            if (!fileStatus) {
                const response = {
                    status : 400
                }
                return response;

            }

            await S3.deleteObject(params).promise();

            await documentData.destroy();



            const response = {
                status: 204
            }

            return response;


            
        } catch (error) {
            console.log(error);
        }
    },
    getAllDocuments : async (id) => {

        const documentData = await Document.findAll({where : {user_id: id}});

        if (documentData == null){
            const response = {
                status : 400
            }
            return response;
        }

        return documentData;




    }
}