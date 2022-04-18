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
  from: 'sendtest06@gmail.com',
  to: 'kevinator900@gmail.com',
  text: 'That was easy!',
};

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
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
  }, i * 3000);
}
