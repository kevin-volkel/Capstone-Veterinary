const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {
      type: String,
      required: [true, "Please enter an animal name..."],
    },
    age: {
      type: String,
      enum: ["young", "adult", "senior"],
      required: [true, "Please enter the animal's age"],
    },
    type: {
      type: String,
      enum: ["dog", "cat"],
      required: [true, "Please enter an animal type..."],
    },
    breed: {
      type: String,
      default: "unspecified",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter the animal's gender"]
    },
    colors: {
      type: String,
    },
    needs: Boolean,
    specialNeeds: [String],
    details: {type: String},
    desc: {
      type: String,
      // required: [true, "Please include a brief description"]
    },
    vaccs: {
      type: Boolean,
      require: [true, "Must answer if the animal is vaccinated"],
    },
    neutered: {
      type: Boolean,
      require: [true, "Must answer if the animal is neutered"],
    },
    picURLs: [String],
    vidURLs: [String],
    location: {
      type: String,
			enum: ['northeast', 'northwest', 'southwest'],
			required: [true, "Must provide a location"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Animal || mongoose.model("Animal", AnimalSchema);
