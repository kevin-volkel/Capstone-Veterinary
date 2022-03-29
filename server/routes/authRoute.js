const router = require('express').Router();

const { getUserAuth } = require('../controllers/authCon');

router.route('/').get(getUserAuth);

module.exports = router;
