import { useEffect, useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import SesContext from '../contexts/sessionContext';

export const useRole = () => {
  const [subscription, setSubscription] = useState(null);
  const db = firebase.firestore();

  const { uId } = useContext(SesContext);

  useEffect(() => {
    db.collection('users')
      .doc(uId)
      .collection('subscriptions')
      .get()
      .then((snapshot) => {
        snapshot.forEach((subscription) => {
          setSubscription({
            role: subscription.data().items[0].price.product.metadata
              .firebaseRole,
            current_period_start:
              subscription.data().current_period_start.seconds,

            current_period_end: subscription.data().current_period_end.seconds,
            price: subscription.data().items[0].price
          });
        });
      });
  }, [db,uId]);

  return { subscription };
};
