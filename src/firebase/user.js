import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { filterObject } from '../helpers/validate'
import "firebase/compat/functions"

window.firebase = firebase
const functions = firebase.functions()
const db = firebase.firestore();






export const updatePassword = async (currentPassword, newPassword) => {
  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email,
    currentPassword
  )

  try {
    await user.reauthenticateWithCredential(credential)
  } catch (error) {
    console.log('error', error)
    return { error: true, errorMessage: 'Contraseña incorrecta'}
  }

  try {
    await firebase.auth().currentUser.updatePassword(newPassword)
  } catch (error) {
    console.log('error', error)
    return { error: true, errorMessage: error.code === 'auth/weak-password' ? 'La contraseña debe tener minimo 6 caracteres' : 'Error interno, intentalo de nuevo mas tarde'}
  }

  return { error: false }
}

export const getProviders = async () => {
  try {
    return await firebase.auth().currentUser.providerData.map(providerObject => providerObject.providerId)
  } catch (error) {
    console.log('__Error__', error)
    return []
  }
}

export const validateCode = async (code, userId) => {
  try {
    const response = await functions.httpsCallable('verifyCode')({ code, uId: userId })
    if (!response.data.valid) return {
      error: true,
      errorMessage: 'Código inválido',
    }

    if (response.data.used) return {
      error: true,
      errorMessage: 'Ya has utilizado un código con anterioridad',
    }

    return { error: false, ...response.data }

  } catch (error) {
    console.error('__error__', error)
    return {
      error: true,
      errorMessage: 'Error interno del servidor intentalo mas tarde'
    }
  }
}

export const unlinkPhone = async () => {
  try {
    await firebase.auth().currentUser.unlink('phone')
    console.log('phone unlinked')
    return true
  } catch (error) {
    console.log('--expected mistake, dont worry--', error)
    return false
  }
}

export const isEmailExist = async email => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, 'testingpassword')
  } catch (error) {
    if (error.code === 'auth/wrong-password') return true
    if (error.code === 'auth/too-many-requests') return true
    return false
  }
}

export const createPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return true
  } catch (error) {
    console.log('error', error)
    return false
  }
}

export const registerOrLoginWidthGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const result = firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous ? await firebase.auth().currentUser.linkWithPopup(provider)  : await firebase.auth().signInWithPopup(provider)
    let Snapshot = await firebase.firestore().collection("production").doc("Users").collection(firebase.auth().currentUser.uid).doc("generalInfo").get()
    if (Snapshot.exists && Snapshot.data().isRegisterComplete) {
      return { success: true, isComplete: true, ...result.user }
    } else {
      return { success: true, isComplete: false, ...result.user, ...result.additionalUserInfo.profile }
    }
  } catch (error) {
    firebase.auth().signOut()
    if (error.code === 'auth/credential-already-in-use') return { isComplete: false, error: true }
    return { isComplete: false }
  }
}

// resgister width mail
export const register = async data => {
  try {
    const isMailRegistered = await isEmailExist(data.mail)
    if (isMailRegistered) return { error: true, message: 'El correo ya se encuentra registrado' }

    const result = firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous ? await firebase.auth().currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(data.mail, data.password)) : await firebase.auth().createUserWithEmailAndPassword(data.mail, data.password)
    console.log('register', result)
    await add(result.user.uid, {...data, isPromoter: data.isPromoter || false})
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      id: result.user.uid
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: error.code === "auth/email-already-in-use" ? 'El correo ya esta registrado' : 'Error interno del servidor'
    }
  }
}

export const anonymousRegister = async data => {
  const isMailRegistered = await isEmailExist(data.mail)
  if (isMailRegistered) return { error: true, message: 'El correo ya se encuentra registrado' }

  const currentUser = await firebase.auth().signInAnonymously()
  await add(currentUser.user.uid, data)
  return { error: false, message: null }
}


export const add = async (id, data) => {
  const secureData = filterObject(data, ['promoterType', 'isPromoter', 'isRegisterComplete', 'lastname', 'mail', 'name', 'phone', 'companyName', 'showMainPhone', 'extraPhones'])
  try {
    await db.doc(`production/Users/${id}/generalInfo`).set(secureData)
    return id
  } catch (error) {
    console.log('err0r', error)
    return null
  }
}

export const changeToPromoter = async ({ userId, promoterType, companyName }) => {
  console.log('props', { userId, promoterType, companyName })
  try {
    await db.doc(`production/Users/${userId}/generalInfo`).update({
      promoterType,
      companyName,
      isPromoter: true
    })
    return true
  } catch (error) {
    console.log('changeToPromoterError', error)
    return false
  }
}

const  getUsers =async () => {
  const snapshot = await firebase.firestore().collection('users').get()
  return snapshot.docs.map(doc => console.log(doc.data()));
}

getUsers()


export default {
  validateCode,
  unlinkPhone,
  add,
  register,
  changeToPromoter
}