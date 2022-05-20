const UserModel = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { addLog } = require('../middleware/addLog');

const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
const emailReg = /^[a-z0-9](\.?[a-z0-9]){3,}@west-mec\.(edu|org)$/gi;

const postUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email)) return res.status(401).send('Invalid email');
  const invalidEmail = email.match(emailReg);
  if (invalidEmail === null)
    return res.status(401).send('Invalid email. Not a west-mec email');

  const invalidPassword = password.match(passwordReg);
  if (invalidPassword === null) return res.status(401).send('Invalid password');

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) return res.status(401).send('Invalid Credentials');
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return res.status(401).send('Invalid Credentials');

    const payload = { userId: user._id, role: user.role };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error @ postUserLogin');
  }
};

const createUser = async (req, res) => {
  const {
    name,
    email,
    role,
    password,
    class: { campus, session, year },
    profilePicURL,
  } = req.body;

  if (!isEmail(email)) return res.status(401).send('Invalid Email');
  const invalidEmail = email.match(emailReg);
  if (invalidEmail === null)
    return res.status(401).send('Invalid email. Not a west-mec email');

  const invalidPassword = password.match(passwordReg);
  if (invalidPassword === null)
    return res
      .status(401)
      .send(
        'Password must have eight characters including one uppercase letter, one lowercase letter, and one number'
      );

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send('Email already in use');

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      role,
      password,
      class: {
        campus,
      },
      profilePicURL,
    });

    if (session) user.class.session = session;
    if (year) user.class.year = year;

    user.password = await bcrypt.hash(password, 10);
    user = await user.save();

    const newLog = await addLog(
      user._id,
      'registered',
      `${name} from ${user.class.campus} campus created an account with the email ${email}`
    );

    const payload = { userId: user._id, role: user.role };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, newLog });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error @ createUser');
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.user;

  if (role === 'teacher') {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      const newLog = await addLog(
        userId,
        'deleted user',
        `${user.name} from ${user.class.campus} has deleted ${user.name}'s profile`
      );
      return res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Error @ deleteUser');
    }
  }
};

const getUsers = async (req, res) => {
  const students = await UserModel.find({ role: 'student' });
  const teachers = await UserModel.find({ role: 'teacher' });
  return res.status(200).json({ students, teachers });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const invalidPassword = newPassword.match(passwordReg);
    if (invalidPassword === null) {
      return res
        .status(401)
        .send(
          'Password must have eight characters including one uppercase letter, one lowercase letter, and one number'
        );
    }

    const userToChange = await UserModel.findOne({ email: email }).select(
      '+password'
    );

    if (!userToChange) return res.status(400).send('User not found?');

    const samePassword = await bcrypt.compare(
      newPassword,
      userToChange.password
    );
    if (samePassword)
      return res
        .status(400)
        .send('New password cannot be the same as the old password');

    userToChange.password = await bcrypt.hash(newPassword, 10);
    userToChange.save();
    return res.status(200).send('Password Changed');
  } catch (err) {
    console.log(err);
    return res.status(500).send('error @ resetPassword');
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.user;

  // console.log(userId);
  // console.log(req.user);

  if (role !== 'teacher') {
    return console.log('You do not have the required permissions.');
  }
  try {
    const newUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!newUser) return res.status(404).send('user not found');

    const user = await UserModel.findById(userId);

    const teacher = await UserModel.findById(req.user.userId)

    const newLog = await addLog(
      teacher._id,
      'edited user',
      `${teacher.name} from ${teacher.class.campus} has edited ${user.name}'s profile`
    );

    // console.log(newLog);

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error at editUser');
  }
};

module.exports = {
  postUserLogin,
  createUser,
  editUser,
  deleteUser,
  getUsers,
  resetPassword,
};
