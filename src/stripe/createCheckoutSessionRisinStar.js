import firebase from 'firebase/compat/app';
import { loadStripe } from '@stripe/stripe-js';

export const createCheckoutSessionRisingStar = async (uid) => {
  const firestore = firebase.firestore();

  const docRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1JaVruCGqe3RvXVDoku6IgQA',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      const stripe = await loadStripe(
        'pk_test_51JaTznCGqe3RvXVDQxhEnjQ1bLyso24Cy7whGP7B39Y2a8qCZEsEHEtCi1zxSfx0XbWiAUfqW10HbeCiyg4phaTy00Qu5iDasP'
      );
      stripe.redirectToCheckout({ sessionId });
    }
  });
};
