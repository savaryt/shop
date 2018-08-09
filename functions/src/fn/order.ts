import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { normalizeSnapshots } from '../utility';

const fakePayment = (payment) => Promise.resolve(payment);

export const order = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {

    const data = req.body;

    return fakePayment(data.payment)
      .then((payment) => {
        // update stock
        const promises = data.order
          .map(item => {
            return admin.firestore().doc(`items/${item.id}`).get()
              .then(snapshot => {
                const value = snapshot.data()
                const availableSize = value.availableSizes.find(x => x.size === item.size);
                const index = value.availableSizes.findIndex(x => x.size === item.size);
                // manage stock to avoid negative stock
                const stock = availableSize.stock - item.quantity;
                value.availableSizes[index].stock = stock;
                if (stock >= 0) {
                  return admin.firestore().doc(`items/${item.id}`).update(value);
                } else {
                  return Promise.reject(new Error('Insufficent stock'));
                }
              });
          });
        return Promise.all(promises);
        // add shipping to queue
        // send confirmation mail
      })
      .then(() => {
        res.status(200).send({ success: 'Payment accepted' })
      })
      .catch((error) => res.status(400).send(error.message));


  });
});

