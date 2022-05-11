const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    media: {
      type: String,
      required: [true, 'Must provide a picture'],
    },
    type: {
      type: String,
      enum: [
        "image",
        "video"
      ],
      required: [true, 'Must provide a media type'],
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Media || mongoose.model('Media', MediaSchema);
