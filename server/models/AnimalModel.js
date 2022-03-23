const mongoose = require('mongoose')
const Schema = new mongoose.Schema;

const AnimalSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter an animal name..."],
    },

    type: {
        type: String,
        required: [true, "Please enter an animal type..."]
    },

    breed: {
        type: String,
        default: "Unspecified"
    },

    colors: {
        type: String
    },

    needs: {
        type: [String], 
        default: ["Food", "PLUS THIS TEST THING OOGA BOOGA"]
    },

    details: {
        type: [String], //* STRINGS
    },

    description: {
        type: String,
    },

    vaccinations: {
        type: [String], 
        default: []
    },

    spade: {
        type: Boolean,
    },

    pictures: {
        type: [String], //* URLS
    },

    videos: {
        type: [String], //* URLS
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    location: {
        type: String,
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Animal", AnimalSchema)