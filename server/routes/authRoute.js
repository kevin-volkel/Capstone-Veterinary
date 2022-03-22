const router = require('express').Router();

const { getUserAuth } = require('../controllers/authCon');
const { authMiddleware } = require('../middleware/auth');

router.route('/').get(authMiddleware, getUserAuth);

module.exports = router;
