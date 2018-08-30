import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { normalizeSnapshots } from '../utility';
import { DatabaseItem, Item } from 'src/app/item/item.model';

const fakePayment = (payment) => Promise.resolve(payment);

export const order = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {

    const data = req.body;

    return fakePayment(data.payment)
      .then((payment) => {
        // update stock
        const promises = data.order
          .map((item: Item) => {
            return admin.firestore().doc(`sex/${item.sex}/items/${item.id}`).get()
              .then(snapshot => {
                const { sizes } = snapshot.data() as DatabaseItem;
                // avoid negative stock issue
                const size = sizes.find(x => x.label === item.size);
                const index = sizes.findIndex(x => x.label === item.size);
                const stock = size.stock - item.quantity;
                sizes[index].stock = stock;
                const newSize = sizes[index];
                if (stock >= 0) {
                  // concurrent write issue I think, use collection for sizes to solve the problem ?
                  return admin.firestore().doc(`sex/${item.sex}/items/${item.id}`).update({ sizes });
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

