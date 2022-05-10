const router = require("express").Router();

const { postUserLogin, createUser, getUsers, deleteUser, resetPassword, uploadImage } = require('../controllers/userCon')
const { authMiddleware } = require('../middleware/auth')

router.route('/signup').post(createUser)
router.route('/login').post(postUserLogin)
router.route('/:userId').delete(deleteUser)
router.route('/').get(getUsers).patch(resetPassword).post(authMiddleware, uploadImage)

module.exports = router;
