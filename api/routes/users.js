const router = require("express").Router();
const {createUser,getUser,updateUser} = require("../controllers/users");


// @route   POST /v1/account
// @desc    Create a user account
// @access  public
router.route("/").post(createUser);

router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);



module.exports = router;