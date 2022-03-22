const router = require('next/router')
const {getAnimal, getAnimals, addAnimal, deleteAnimal, editAnimal} = require('../controllers/animalCont')

router.route('/')
    .get(getAnimals)
    .post(addAnimal)

router.route('/:id')
    .get(getAnimal)
    .delete(deleteAnimal)
    .put(editAnimal)

module.exports = router