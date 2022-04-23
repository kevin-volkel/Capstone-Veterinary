const router = require('express').Router();
const { uploadProfilePic, uploadPics, uploadVids } = require('../controllers/uploadCon')

router.route('/').post(uploadProfilePic);
router.route('/images').post(uploadPics);
router.route('/videos').post(uploadVids);

module.exports = router;