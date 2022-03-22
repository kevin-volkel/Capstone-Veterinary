const mongoose = require('mongoose')

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log('connected to db'))
  } catch (err) {
    process.exit(1)
  }
}