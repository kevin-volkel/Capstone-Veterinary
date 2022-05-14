const LogModel = require('../models/LogModel');

const addLog = async (userId, action, details) => {
  const newLog = await LogModel.create({
    user: userId,
    action: action,
    details: details,
  });

  const log = await LogModel.find({});
  console.log(log);
  console.log(log.length);
  if (log.length > 100) {
    const deletedLog = log.shift();
    await LogModel.findByIdAndDelete(deletedLog._id);
  }
  return newLog;
};

module.exports = { addLog };
