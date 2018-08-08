import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as sendmail from 'sendmail';
const send = sendmail();


// Works locally but not on firebase free hosting because external network is not accessible
export const mailer = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    const data = req.body;
    send({
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
