const router = require('express').Router();

const {
  postUserLogin,
  editUser,
  createUser,
  getUsers,
  deleteUser,
  resetPassword,
} = require('../controllers/userCon');
const { authMiddleware } = require('../middleware/auth');

router.route('/signup').post(createUser);
router.route('/login').post(postUserLogin);
router
  .route('/:userId')
  .delete(authMiddleware, deleteUser)
  .put(authMiddleware, editUser);
router.route('/').get(getUsers).patch(resetPassword);

module.exports = router;
