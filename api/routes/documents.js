const router = require("express").Router();
const auth = require("../middleware/auth");

const { getAllDocuments, uploadDocument, getDocumentById, deleteDocument} = require("../controllers/documents");



router.route("/").get(auth, getAllDocuments);
router.route("/").post(auth, uploadDocument);
router.route("/:id").get(auth, getDocumentById);
router.route("/:id").delete(auth, deleteDocument);

module.exports = router;