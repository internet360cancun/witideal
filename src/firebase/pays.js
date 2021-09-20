import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const db = firebase.firestore()

export const createOrderId = userId => {
  const date = new Date()
  let hours = date.getHours().toString()
  hours = hours.length < 2 ? `0${hours}` : hours.slice(0, 2)

  let minutes = date.getMinutes().toString()
  minutes = minutes.length < 2 ? `0${minutes}` : minutes.slice(0, 2)

  let seconds = date.getSeconds().toString()
  seconds = seconds.length < 2 ? `0${seconds}` : seconds.slice(0, 2)

  let miliseconds = date.getMilliseconds().toString()
  miliseconds = miliseconds.length < 2 ? `0${miliseconds}` : miliseconds.slice(0, 2)
  return `14${userId.slice(0, 4)}${hours}${minutes}${seconds}${miliseconds}`
}

export const paypal = {
  create: async (data) => {
    try {
      const { oId, amount, infoFact, iva, mail, packages, phone, subtotal, uId, willFact, witicoins, code } = data
      await db.collection('production/paypal/pendingCharges').add({
        date: new Date(),
        description: 'Compra de witicoins',
        amount, 
        infoFact, 
        iva, 
        mail, 
        oId, 
        packages, 
        phone, 
        subtotal, 
        uId, 
        willFact, 
        witicoins,
        code
      })
      return oId;
    } catch (error) {
      console.log('error_description:', error)
      return false
    }
  }
}