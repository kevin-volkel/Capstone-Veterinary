const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: [true, 'must provided a title'],
    },
    desc: {
      type: String,
      required: [true, 'must provided a description'],
    },
    date: {
      type: Date,
      required: [true, "must provided the event's date"],
    },
    type: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: [true, 'Must provide a location'],
    },
    bannerPic: {
      type: String,
      required: [true, 'Must provide a banner picture']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
