const router = require('express').Router();
const { uploadProfilePic, uploadPics, uploadVids, getMedia, changeMedia } = require('../controllers/uploadCon')
const {authMiddleware} = require("../middleware/auth")
router.route('/').post(uploadProfilePic);
router.route('/images').post(uploadPics);
router.route('/videos').post(uploadVids);
router.route('/media').get(getMedia).post(authMiddleware, changeMedia);

module.exports = router;