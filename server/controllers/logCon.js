const LogModel = require('../models/LogModel');

const getEntireLog = async (req, res) => {
  try {
    const entries = await LogModel.find({}).populate('user');
    return res.status(200).json({ entries });
  } catch (err) {
    console.log(err);
    return res.status(500).send('error @ getEntireLog');
  }
};

module.exports = { getEntireLog };
