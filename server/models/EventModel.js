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
      minLength: [119, 'must be at least 119 characters'],
    },
    date: {
      type: Date,
      required: [true, "must provided the event's date"],
    },
    type: {
      type: String,
      required: [true, 'must provided an event type'],
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
