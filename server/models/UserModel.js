const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must include a name']
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student'
  },
  email: {
    type: String,
    required: [true, 'Must include an email'],
    validate: {
      validator: (v) => {
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(v)
      },
      error: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Must include a password'],
    minLength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: (v) => {
        return /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g.test(v)
      },
      error: 'Password not strong enough'
    },
    select: false
  },
  class: {
    type: {
      campus: {
        type: String
      },
      session: {
        type: String
      },
      year: {
        type: Number
      },
    },
    required: [true, "Must include your class"]
  }
})


module.exports = mongoose.models.User || mongoose.model('User', UserSchema);