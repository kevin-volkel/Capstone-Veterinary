const LogModel = require('../models/LogModel');
const UserModel = require("../models/UserModel");

const getEntireLog = async (req, res) => {
  try {
    const entries = await LogModel.find({}).populate('user');
    return res.status(200).json({ entries });
  } catch (err) {
    console.log(err);
    return res.status(500).send('error @ getEntireLog');
  }
};

const clearLog = async (req, res) => {
  try {
    const { role, userId } = req.user;
    console.log(role)
    if(role !== 'teacher') return res.status(401).send('Invalid Permissions')
    const deletedEntries = await LogModel.deleteMany({});
    console.log(deletedEntries)

    const user = await UserModel.findById(userId)

    const newLog = await LogModel.create({
      user: userId,
      action: 'cleared log',
      details: `${user.name} cleared the log`
    })
    return res.status(200).send(`${deletedEntries.length} entries clear`)
  } catch (err) {
    console.log(err)
    return res.status(500).send('error @ clearLog')
  }
}

module.exports = { getEntireLog, clearLog };
