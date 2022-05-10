const UserModel = require('../models/UserModel');
const MediaModel = require("../models/MediaModel");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const LogModel = require('../models/LogModel');
const AnimalModel = require('../models/AnimalModel');

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

    const newLog = LogModel.create({
      user: user._id,
      action: 'registered',
      details: `${name} created an account`
    })

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

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error @ deleteUser');
  }
};

const getUsers = async (req, res) => {
  const users = await UserModel.find({});
  return res.status(200).json(users);
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

    if(!userToChange) return res.status(400).send('User not found?')


    const samePassword = await bcrypt.compare(newPassword, userToChange.password)
    if(samePassword) return res.status(400).send('New password cannot be the same as the old password')
  
    userToChange.password = await bcrypt.hash(newPassword, 10);
    userToChange.save();
    return res.status(200).send('Password Changed')
  } catch (err) {
    console.log(err)
    return res.status(500).send('error @ resetPassword')
  }
};

const uploadImage = async (req, res) => {
  const userId = req.user.userId;

  const {
    media
  } = req.body;

  try{
    const newMedia = {
      media,
      user: userId
    };

    const oldImage = await MediaModel.find();
    console.log(oldImage);
    let mediaCreated;
    if(oldImage === null){
      const media = await new MediaModel(newMedia).save();
      mediaCreated = await MediaModel.findById(media._id).populate("user");
    }else{
      await oldImage.remove();
      const media = await new MediaModel(newMedia).save();
      mediaCreated = await MediaModel.findById(media._id).populate("user");
    }

    const user = await UserModel.findById(userId)

    const newLog = await LogModel.create({
      user: userId,
      action: 'changed media',
      details: `${user.name} changed the adoption image/video`
    })

    console.log(newLog)

    return res.status(200).send(mediaCreated);
  }catch (error) {
    console.log(error);
    res.status(500).send("error at deleteAnimal");
  }
};

module.exports = { postUserLogin, createUser, deleteUser, getUsers, resetPassword, uploadImage };
