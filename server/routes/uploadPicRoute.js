const router = require("express").Router();

const { uploadProfilePic } = require("../controllers/uploadCon");

router.route("/").post(uploadProfilePic);

module.exports = router;
