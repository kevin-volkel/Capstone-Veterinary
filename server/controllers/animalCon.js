const AnimalModel = require("../models/AnimalModel");
const UserModel = require("../models/UserModel");

//? adds an animal, no params
const addAnimal = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) return res.status(404).send("no user with that ID");

  const {
    name,
    age,
    type,
    breed,
    gender,
    colors,
    needs,
    specialNeeds,
    details,
    desc,
    vaccs,
    neutered,
    picURLs,
    vidURLs,
    location,
  } = req.body;

  try {
    const newAnimal = {
      name,
      type,
      gender,
      neutered,
      location,
      vaccs,
      needs,
      age,
      user: userId,
    };
    if (breed) newAnimal.breed = breed;
    if (colors) newAnimal.colors = colors;
    if (specialNeeds) newAnimal.specialNeeds = specialNeeds;
    if (details) newAnimal.details = details;
    if (desc) newAnimal.desc = desc;
    if (picURLs) newAnimal.picURLs = picURLs;
    if (vidURLs) newAnimal.vidURLs = vidURLs;

    const animal = await new AnimalModel(newAnimal).save();
    const animalCreated = await AnimalModel.findById(animal._id).populate(
      "user"
    );

    return res.status(200).json(animalCreated);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at addAnimal");
  }
};

//? gets all animals, no params
const getAllAnimals = async (req, res) => {
  // const { page } = req.query;

  // const pageNumber = Number(page);
  // const size = 6; //! can change later

  try {
    let animals = await AnimalModel.find()
      .sort({ createdAt: -1 })
      .populate("user");
    // if (pageNumber === 1) {
    //   animals = await AnimalModel.find()
    //     .limit(size)
    //     .sort({ createdAt: -1 })
    //     .populate("user");
    // } else {
    //   const skips = size * (pageNumber - 1);
    //   animals = await AnimalModel.find()
    //     .skip(skips)
    //     .limit(size)
    //     .sort({ createdAt: -1 })
    //     .populate("user");
    // }

    return res.status(200).json(animals);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error at getAnimals");
    console.log(error);
  }
};

//! /:id

//? gets one animal, id required
const getAnimal = async (req, res) => {
  const { id: animalId } = req.params;
  try {
    const animal = await AnimalModel.findById(animalId).populate("user");

    if (!animal) return res.status(404).send("animal not found");

    return res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getAnimal");
  }
};

//? deletes an animal, id required
const deleteAnimal = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id: animalId } = req.params;

    const animal = await AnimalModel.findById(animalId);
    if (!animal) return res.status(404).send("animal not found");

    const user = await UserModel.findById(userId);

    if (animal.user.toString() !== userId) {
      if (user.role === "student" || user.role === "teacher") {
        await animal.remove();
        return res.status(200).send("animal succesfully removed");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }
    await animal.remove();
    return res.status(200).send("animal succesfully removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("error at deleteAnimal");
  }
};

//? update an animals info
const editAnimal = async (req, res) => {
  const { userId } = req.user;
  const { id: animalId } = req.params;

  try {
    const animal = await AnimalModel.findByIdAndUpdate(
      { _id: animalId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    ).populate("user");

    if (!animal) return res.status(404).send("animal not found");

    return res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at editAnimal");
  }
};

module.exports = {
  getAllAnimals,
  getAnimal,
  addAnimal,
  deleteAnimal,
  editAnimal,
};
