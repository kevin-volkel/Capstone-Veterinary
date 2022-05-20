const router = require('express').Router();

const { resetPassword, adoptedEmail } = require('../controllers/emailCon');

router.route('/').post(resetPassword)
router.route('/adopt').post(adoptedEmail)

module.exports = router;