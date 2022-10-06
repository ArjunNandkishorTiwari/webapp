const router = require("express").Router();
const {createUser,getUser,updateUser} = require("../controllers/users");
const auth = require("../middleware/auth");


// @route   POST /v1/account
// @desc    Create a user account
// @access  public
router.route("/").post(createUser);

router.get("/:id",auth,getUser);
router.put("/:id",auth,updateUser);



module.exports = router;