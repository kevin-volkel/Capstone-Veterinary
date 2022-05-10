const nodemailer = require('nodemailer');
const UserModel = require('../models/UserModel');
const emailReg = /^[a-z0-9](\.?[a-z0-9]){3,}@west-mec\.(edu|org)$/gi;

require('dotenv').config();

const resetPassword = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).send('No user found with that email');

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
    console.log('EMAIL SENT');
    res.status(200).send('Email sent');
  } catch (err) {
    console.log(err);
    res.status(500).send('error @ resetPassword');
  }
};

const adoptedEmail = async (req, res) => {
  try {
    const { animalObj, formData } = req.body;
    const userId = animalObj.user._id;
    const {
      fullName,
      phoneNumber,
      email,
      haveOtherAnimals,
      otherAnimals,
      haveSmallChildren,
      smallChildren,
      aboutYou,
    } = formData;

    const student = await UserModel.findById(userId);
    if (!student) return res.status(400).send('No user found with that id');

    const campus = student.class.campus;

    const teacher = await UserModel.find({
      role: 'teacher',
      class: {
        campus: campus,
      },
    });

    if (!teacher)
      return res.status(400).send('No teacher found at this campus');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sendtest06@gmail.com',
        pass: process.env.NODEMAILERPASS,
      },
    });



    let mailText = `${fullName} is interested in ${animalObj.name}. You can contact them via phone at ${phoneNumber} or email at ${email}.`;
    if (haveOtherAnimals) {
      const animalArr = otherAnimals.split(',').map((animal) => animal.trim())
      mailText += `They have ${animalArr.length} other animal${
        animalArr.length > 1
          ? `s. These are ${animalArr.map((animal, i) => {
              if (i === animalArr.length - 1) {
                return `and a ${animal}`;
              } else {
                return `a ${animal}, `;
              }
            })}`
          : `, a ${animalArr[0]}. `
      }`;
    }
    if (haveSmallChildren) {
      const childrenArr = smallChildren.split(',').map((age) => age.trim())
      mailText += `They have ${childrenArr.length} ${
        childrenArr.length > 1
          ? `small children, ${childrenArr.map((age, i) => {
              if (i === childrenArr.length - 1) {
                return `and a ${age} year old`;
              } else {
                return `a ${age} year old, `;
              }
            })}`
          : `small child, a ${childrenArr[0]} year old.`
      }`;
    }
    mailText += `\n"${aboutYou}"`


    console.log(`Student: ${student.email}`)
    console.log(`Teacher: ${teacher.email}`)
    const mailOptions = {
      from: 'sendtest06@gmail.com',
      to: student.email,
      cc: teacher.email,
      text: mailText
    };

    transporter.sendMail(
      {
        ...mailOptions,
        subject: `${formData.fullName} is interested in ${animalObj.name}!`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
    console.log('EMAIL SENT');
    res.status(200).send('Email sent');
  } catch (err) {
    console.log(err);
    res.status(500).send('error @ adoptedEmail');
  }
};

module.exports = { resetPassword, adoptedEmail };
