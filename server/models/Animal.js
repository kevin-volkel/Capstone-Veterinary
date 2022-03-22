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
        type: Array, //* STRINGS
        default: ["Food", "PLUS THIS TEST THING OOGA BOOGA"]
    },

    details: {
        type: Array, //* STRINGS
    },

    description: {
        type: String,
    },

    vaccinations: {
        type: Array, //* STRINGS
        default: []
    },

    spade: {
        type: Boolean,
    },

    pictures: {
        type: Array, //* URLS
    },

    videos: {
        type: Array, //* URLS
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