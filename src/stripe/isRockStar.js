import firebase from 'firebase/compat/app';

export const isRockStar = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole ? true : false;
};
