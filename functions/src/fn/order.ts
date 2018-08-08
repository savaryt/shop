import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { normalizeSnapshots } from '../utility';

const fakePayment = (payment) => Promise.resolve(payment);

export const order = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    const data = req.body;
    return fakePayment(data.payment)
      .then(() => {
        // update stock
        const promises = data.order
          .map(item => {
            return admin.firestore().doc(`items/${item.id}`).get()
              .then(snapshot => snapshot.data())
              .then(value => {
                const availableSize = value.availableSizes.find(x => x.size == item.size);
                const index = value.availableSizes.findIndex(x => x.size == item.size);
                // manage stock to avoid negative stock
                const stock = availableSize.stock - item.quantity;
                value.availableSizes[index].stock = stock;
                return admin
                  .firestore()
                  .doc(`items/${item.id}`)
                  .update(value);
              });
          });
        return Promise.all(promises);

        // add shipping to queue
        // send confirmation mail
      })
      .catch((error) => { console.log(error) });
  });
});

