const router = require("express").Router();

const {
  getAnimal,
  getAllAnimals,
  addAnimal,
  deleteAnimal,
  editAnimal,
} = require("../controllers/animalCon");
const { authMiddleware } = require('../middleware/auth')

router.route("/").get(getAllAnimals).post(authMiddleware, addAnimal);

router.route("/:id").get(getAnimal).delete(authMiddleware, deleteAnimal).put(authMiddleware, editAnimal);

module.exports = router;
