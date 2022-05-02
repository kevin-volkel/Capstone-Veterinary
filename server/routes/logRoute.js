const router = require('express').Router();

const {
  getEntireLog
} = require('../controllers/logCon')

router.route('/').get(getEntireLog);

module.exports = router;