import firebase from 'firebase/compat/app';
import { loadStripe } from '@stripe/stripe-js';

export const createCheckoutSessionRisingStar = async (uid) => {
  const firestore = firebase.firestore();

  const docRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1JbcZhJpPaML8RxiDW9S80yg',
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
        'pk_live_51Ja6PiJpPaML8Rxi0JndAK0EKei9nQMTnZLdpJgDu5CdYkI2QypECjL7qkuas6xZARVyqb5jZjvUjosjgb4ij9qN00BV1oZUj8'
      );
      stripe.redirectToCheckout({ sessionId });
    }
  });
};
