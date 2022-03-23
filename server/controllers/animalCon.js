
const AnimalModel = require('../models/Animal')

//! /

//? gets all animals, no params
const getAnimals = async (req, res) => {
    try {
        const animals = await AnimalModel.find()
        res.status(200).json(animals)  
    } catch (error) {
        res.status(500).send("Error at getAnimals")
    }
}

//? adds an animal, no params
const addAnimal = async (req, res) => {
    
    //! adding more later just laying this out
    const {name} = req.body;
    
    try {
        const newAnimal = {
            name: name
        }
        
        const animal = await AnimalModel(newAnimal).save()
    } catch (error) {
        res.status(500).send("error at addAnimal...")
        console.log(error);
    }
}


//! /:id

//? gets one animal, id required
const getAnimal = async (req, res) => {
    try {
        const animal = await AnimalModel.findById(req.params.id);

        if(!animal){
            res.status(403).send("animal not found")
        }

        return res.status(200).json(animal);
    } catch (error) {
        res.status(500).send("error at getAnimal")
        console.log(error);
    }
}

//? deletes an animal, id required
const deleteAnimal = async (req, res) => {
    try {
        const animal = await AnimalModel.findById(req.params.id);

        if(!animal){
            res.status(403).send("animal not found")
        }

        await animal.remove();
        return res.status(200).send("animal succesfully removed")
    } catch (error) {
        res.status(500).send("error at deleteAnimal");
        console.log(error);
    }
}

//? update an animals info
const editAnimal = async (req, res) => {
    return res.send("edit animals");
}

module.exports = {
    getAnimals,
    getAnimal,
    addAnimal,
    deleteAnimal,
    editAnimal
}