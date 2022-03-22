const passwordReg = /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g
const UserModel = require('../models/UserModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const postUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if(!isEmail(email)) return res.status(401).send('Invalid email')
  if(!passwordReg.test(password)) return res.status(401).send('Invalid password')
  try{
    const user = await UserModel
      .findOne({email: email.toLowerCase()})
      .select("+password")

    if(!user) return res.status(401).send('Invalid Credentials')
    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword) return res.status(401).send('Invalid Credentials')

    const payload = { userId: user._id, role: user.role }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if(err) throw err
        res.status(200).json(token)
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error @ postUserLogin')
  }
}

const createUser = async (req, res) => {

  const {
    name,
    email,
    role,
    password
  } = req.body;

  if(!isEmail(email)) return res.status(401).send('Email already in use')
  
  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() })
    if(user) return res.status(401).send('Email already in use')

    user = new UserModel({
      name,
      email,
      role,
      password
    })

    user.password = await bcrypt.hash(password, 10)
    user = await user.save();

    const payload = { userId: user._id, role }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if(err) throw err
        res.status(200).json(token)
      }
    )
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server Error @ createUser')
  }
}

module.exports = {postUserLogin, createUser}