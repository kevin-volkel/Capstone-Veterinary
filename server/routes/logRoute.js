const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth')

const {
  getEntireLog,
  clearLog
} = require('../controllers/logCon')

router.route('/').get(getEntireLog).delete(authMiddleware, clearLog)

module.exports = router;