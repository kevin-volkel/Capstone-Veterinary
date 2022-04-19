const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sendtest06@gmail.com',
    pass: process.env.nodemailerPass,
  },
});

var mailOptions = {
  from: '',
  to: '',
  text: 'That was easy!',
};

transporter.sendMail(
  { ...mailOptions, subject: `Email #${i}` },
  function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }
);
