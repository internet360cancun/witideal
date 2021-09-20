import { db } from './index'

const firstPackPromo = async userId => {
  try {
    const walletSnapshot = await db.doc(`/production/Users/${userId}/witiwallet`).get()
    if (walletSnapshot.exists) {
      const wallet = walletSnapshot.data()
      const existWiticoinsKey = Object.keys(wallet).includes('witicoins') 
      if (existWiticoinsKey) return false
    }

    const firstPackPromoSnapshot = await db.doc('promos/firstPackPromo').get()
    const data = firstPackPromoSnapshot.data()
    const expiration = data.expirationDate.toDate().getTime()
    const currentDate = Date.now()

    if (currentDate > expiration) return false
    return true
  } catch (error) {
    console.log('promos firstPackPromo error', error)
    return false
  }
}

window.firstPackPromo = firstPackPromo

export default {
  firstPackPromo
}