const router = require("express").Router();

const { postUserLogin, createUser } = require('../controllers/userCon')

router.route('/signup').post(createUser)
router.route('/login').post(postUserLogin)

module.exports = router;
