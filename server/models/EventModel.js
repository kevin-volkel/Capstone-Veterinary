const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    purpose: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
