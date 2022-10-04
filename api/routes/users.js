const router = require("express").Router();
const {createUser} = require("../controllers/users");


// @route   POST /v1/account
// @desc    Create a user account
// @access  public
router.route("/").post(createUser);



module.exports = router;