
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
        
    }
}


//! /:id

//? gets one animal, id required
const getAnimal = async (req, res) => {
    return res.send("get animal (one)");
}

//? deletes an animal, id required
const deleteAnimal = async (req, res) => {
    return res.send("delete animal");
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