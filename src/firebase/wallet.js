import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const db = firebase.firestore()

export const get = async userId => {
  try {
    const snap = await db.doc(`production/Users/${userId}/witiwallet`).get();
    const data = snap.data()
    return {
      witicoins: data.witicoins
    }
  } catch (error) {
    return {
      witicoins: 0,
    }
  }
}

export const onChnage = (userId, handler) => {
  try {
    const unsubscribe = db.doc(`production/Users/${userId}/witiwallet`).onSnapshot(snapshot => {
      try {
        const { witicoins } = snapshot.data()
        handler( witicoins || 0)
      } catch (error) {
        handler(0)
      }
    })
    return unsubscribe
  } catch (error) {
    console.log('error', error)
    handler(0)
    return () => {}
  }
}

export default {
  get
}