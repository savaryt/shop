import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { normalizeSnapshots } from '../utility';
import { DatabaseItem, Item, Size } from 'src/app/item/item.model';

const fakePayment = (payment) => Promise.resolve(payment);

export const order = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {

    const data = req.body;

    return fakePayment(data.payment)
      .then((payment) => {
        // update stock
        const promises = data.order
          .map((item: Item) => {
            return admin.firestore().collection(`sex/${item.sex}/items/${item.id}/sizes`).get()
              .then(snapshot => {
                const documents = [];
                snapshot.docs.forEach((doc) => {
                  documents.push({ ...doc.data(), id: doc.id });
                })
                const size = documents.find((s: Size) => s.label === item.size);
                const stock = size.stock - item.quantity;
                if (stock >= 0) {
                  return admin.firestore().doc(`sex/${item.sex}/items/${item.id}/sizes/${size.id}`).update({ stock });
                } else {
                  return Promise.reject(new Error('Insufficent stock'));
                }
              });
          });
        return Promise.all(promises).then(console.log);
        // @todo add shipping to queue
        // @todo send confirmation mail
      })
      .then(() => {
        res.status(200).send({ success: 'Payment accepted' })
      })
      .catch((error) => res.status(400).send(error.message));


  });
});

