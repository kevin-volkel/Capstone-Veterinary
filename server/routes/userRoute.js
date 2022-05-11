const router = require("express").Router();

const { postUserLogin, createUser, getUsers, deleteUser, resetPassword } = require('../controllers/userCon')

router.route('/signup').post(createUser)
router.route('/login').post(postUserLogin)
router.route('/:userId').delete(deleteUser)
router.route('/').get(getUsers).patch(resetPassword)

module.exports = router;
