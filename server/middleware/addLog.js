const LogModel = require('../models/LogModel')

const addLog = async (userId, action, details) => {
  const newLog = await LogModel.create({
    user: userId,
    action: action,
    details: details
  })

  return newLog;
}

module.exports = { addLog }