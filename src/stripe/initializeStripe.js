import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      'pk_test_51JaTznCGqe3RvXVDQxhEnjQ1bLyso24Cy7whGP7B39Y2a8qCZEsEHEtCi1zxSfx0XbWiAUfqW10HbeCiyg4phaTy00Qu5iDasP'
    );
  }
  return stripePromise;
};

export default initializeStripe;
