const router = require('next/router')
const {getAnimal, getAnimals, addAnimal, deleteAnimal, editAnimal} = require('../controllers/animalCon')
const authMiddleware = require('../middleware/auth')

router.route('/')
    .get(getAnimals)
    .post(authMiddleware, addAnimal)

router.route('/:id')
    .get(authMiddleware, getAnimal)
    .delete(authMiddleware, deleteAnimal)
    .put(authMiddleware, editAnimal)

module.exports = router