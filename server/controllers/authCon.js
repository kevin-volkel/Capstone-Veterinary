const UserModel = require('../models/UserModel');

const getUserAuth = async (req, res) => {
  const { userId } = req.user;
  console.log(req.user)
  if (!userId) return req.status(500).send('No User Found');
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).json({user});
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error @ getUserAuth');
  }
};

module.exports = { getUserAuth };
