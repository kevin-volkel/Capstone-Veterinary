const router = require("express").Router();
const {
  getAnimal,
  getAllAnimals,
  addAnimal,
  deleteAnimal,
  editAnimal,
} = require("../controllers/animalCon");

router.route("/").get(getAllAnimals).post(addAnimal);

router
  .route("/:id")
  .get(getAnimal)
  .delete(deleteAnimal)
  .put(editAnimal);

module.exports = router;
