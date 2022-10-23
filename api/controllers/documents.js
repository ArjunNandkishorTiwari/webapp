




module.exports = {

    getAllDocuments : async(req,res) => {



        return res.status(200).json({msg: "GET All Documents"});
    },

    uploadDocument: async(req,res) => {





        return res.status(201).json({msg: "POST New Document"});
    },

    getDocumentById: async(req,res) => {


        return res.status(200).json({msg: "GET Document By ID"});
    },

    deleteDocument: async(req,res) => {

        return res.status(204).json({msg: "DELETE Document by ID"});
    }
}