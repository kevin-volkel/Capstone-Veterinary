const router = require("express").Router();

<<<<<<< HEAD
const {} = require("../controllers/userCon");

module.exports = router;
=======
const { postUserLogin, createUser } = require('../controllers/userCon')

router.route('/signup').post(createUser)
router.route('/login').post(postUserLogin)

module.exports = router;
>>>>>>> afc034364b927e762a637e3c751f8c072a15266d
