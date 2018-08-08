import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';

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

export const mailer = functions.https.onRequest((req, res) => {
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
