const router = require("express").Router()
const {healthGet} = require("./../controllers/healthz");

// @route   GET /healthz
// @desc    Get status 200
// @access  public
router.route("/").get(healthGet);


module.exports = router;