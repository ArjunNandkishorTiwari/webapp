const router = require("express").Router();
const {verifyUserEmail} = require("../controllers/users");


router.route("/").get(verifyUserEmail);


module.exports = router;