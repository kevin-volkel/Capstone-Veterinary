const nodemailer = require('nodemailer');
const UserModel = require('../models/UserModel')
const emailReg = /^[a-z0-9](\.?[a-z0-9]){3,}@west-mec\.(edu|org)$/gi

require('dotenv').config();

const resetPassword = async (req, res) => {
  try {
    const {email, code} = req.body;

    const user = await UserModel.findOne({email: email.toLowerCase()});
    if(!user) return res.status(400).send('No user found with that email')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sendtest06@gmail.com',
        pass: process.env.NODEMAILERPASS,
      },
    });
    
    const mailOptions = {
      from: 'sendtest06@gmail.com',
      to: email,
      text: 'Your code to reset your password it ' + code,
    };
    
    transporter.sendMail(
      { ...mailOptions, subject: `Password Reset` },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
    console.log('EMAIL SENT')
    res.status(200).send('Email sent')
  } catch (err) {
    console.log(err)
    res.status(500).send('error @ resetPassword')
  }
}


module.exports = {resetPassword}