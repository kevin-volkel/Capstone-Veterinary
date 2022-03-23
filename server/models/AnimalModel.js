const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const AnimalSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter an animal name..."],
    },
    type: {
      type: String,
      required: [true, "Please enter an animal type..."],
    },
    breed: {
      type: String,
      default: "Unspecified",
    },
    colors: {
      type: String,
    },
    needs: {
      type: [NeedSchema],
      default: ["food"],
    },
    details: [String],
    desc: {
      type: String,
    },
    vacc: {
      type: [NeedSchema],
			required: [true, "vaccinations must be provided"]
    },
    neutered: { //! spade is only for female animals. i think neutered is more gender neutral
      type: Boolean,
      require: [true, "Must answer if the animal is neutered"],
    },
    picURLs: [String],
    vidURLs: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
			enum: ['northeast', 'northwest', 'southwest'],
			required: [true, "Must provide a location"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Animal", AnimalSchema);
