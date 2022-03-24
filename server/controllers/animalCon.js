const AnimalModel = require("../models/AnimalModel");

//? adds an animal, no params
const addAnimal = async (req, res) => {
  // console.log(req.body);
  const {
    name,
    type,
    breed,
		gender,
    colors,
    needs,
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
			user: req.userId
    };
		if(breed) newAnimal.breed = breed;
		if(colors) newAnimal.colors = colors;
		if(needs) newAnimal.needs = needs;
		if(details) newAnimal.details = details;
		if(desc) newAnimal.desc = desc;
		if(vaccs) newAnimal.vacc = vaccs;
		if(picURLs) newAnimal.picURLs = picURLs;
		if(vidURLs) newAnimal.vidURLs = vidURLs;

    const animal = await new AnimalModel(newAnimal).save();
		const animalCreated = await AnimalModel.findOne(animal._id).populate("user");

		return res.status(200).json(animalCreated);
  } catch (error) {
    res.status(500).send("error at addAnimal");
    console.log(error);
  }
};

//? gets all animals, no params
const getAllAnimals = async (req, res) => {
	const {page} = req.query;

	const pageNumber = Number(page);
	const size = 6; //! can change later

  try {
		let animals;
		if(pageNumber === 1){
			animals = await AnimalModel.find()
				.limit(size)
				.sort({ createdAt: -1 })
				.populate("user")
		} else {
			const skips = size * (pageNumber - 1);
			animals = await AnimalModel.find()
				.skip(skips)
				.limit(size)
				.sort({ createdAt: -1 })
        .populate("user")
		}

    res.status(200).json(animals);
  } catch (error) {
    res.status(500).send("Error at getAnimals");
  }
};

//! /:id

//? gets one animal, id required
const getAnimal = async (req, res) => {
  try {
    const animal = await AnimalModel.findById(req.params.id).populate("user")

    if (!animal) res.status(403).send("animal not found");

    return res.status(200).json(animal);
  } catch (error) {
    res.status(500).send("error at getAnimal");
    console.log(error);
  }
};

//? deletes an animal, id required
const deleteAnimal = async (req, res) => {
  try {
    const animal = await AnimalModel.findById(req.params.id);

    if (!animal) {
      res.status(403).send("animal not found");
    }

    await animal.remove();
    return res.status(200).send("animal succesfully removed");
  } catch (error) {
    res.status(500).send("error at deleteAnimal");
    console.log(error);
  }
};

//? update an animals info
const editAnimal = async (req, res) => {
  return res.send("edit animals");
};

module.exports = {
  getAllAnimals,
  getAnimal,
  addAnimal,
  deleteAnimal,
  editAnimal,
};
