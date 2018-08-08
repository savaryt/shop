import * as functions from 'firebase-functions';
const sendmail = require('sendmail')();
const cors = require('cors');
const nodemailer = require('nodemailer');


// Works locally but not on firebase free hosting because external network is not accessible

export const sendMail = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    const data = req.body;
    sendmail({
      from: data.email,
      to: 'thibaultsavary@protonmail.ch',
      subject: `${data.subject} ${data.reference}`,
      html: data.content,
    }, (error, reply) => {
      // See #48 on github issues
      if (error && error.code !== 'ECONNRESET') {
        console.error(error);
      } else {
        res.send({ message: 'success' });
      }
    });
  });

});

// Alternative to sendmail

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const nodeMailer = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    const data = req.body;
    const options = {
      from: data.email,
      to: 'thibaultsavarypro@gmail.com',
      subject: `${data.subject} ${data.reference}`,
      text: data.content,
    };
    return mailTransport.sendMail(options)
      .then(() => res.send({ message: 'success' }))
      .catch((error) => res.send(error));
  });

});
