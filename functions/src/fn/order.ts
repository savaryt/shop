import * as functions from 'firebase-functions';
import * as cors from 'cors';

const fakePayment = (payment) => Promise.resolve(payment);

export const order = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    const data = req.body;
    return fakePayment(data.payment)
      .then(() => {
        // update stock
        // add shipping to queue
        // send confirmation mail
      })
      .catch(() => { });
  });
});

