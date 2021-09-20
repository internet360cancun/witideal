import firebase from 'firebase/compat/app';
import initializeStripe from './initializeStripe';

export const createCheckoutSession = async (uid) => {
  const firestore = firebase.firestore();

  const checkoutSessionRef = await firestore
    .collection(`users`)
    .doc(uid)
    .collection('checkout_session')
    .add({
      price: 'price_1JaVruCGqe3RvXVDoku6IgQA',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();

    if (sessionId) {
      const stripe = await initializeStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  });
};
