const router = require('express').Router();

const { resetPassword } = require('../controllers/emailCon');

router.route('/').post(resetPassword)

module.exports = router;