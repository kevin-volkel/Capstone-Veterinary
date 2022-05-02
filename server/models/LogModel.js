const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'Must include a valid userId'],
  },
  action: {
    type: String,
    enum: ['deleted', 'added', 'edited', 'registered'],
    required: [true, 'Must include an action'],
  },
  details: {
    type: String,
    required: [true, 'Must include details'],
  },
}, {timestamps: true});

module.exports = mongoose.models.Log || mongoose.model('Log', LogSchema);
