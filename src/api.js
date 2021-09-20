// this is only for request API
import axios from 'axios'
import { enviroment } from './constants/globalConstraints';

const request = async (config) => {
  config.method = config.method || 'get' 
  const response = await axios(config)
  return response.data
}

const api = {
  property: {
    async pay (data){
      const response = await request({
        url: enviroment === 'production' 
          ? 'https://us-central1-witideal-b1f99.cloudfunctions.net/chargeUpdate' 
          : 'https://us-central1-witideal-develop.cloudfunctions.net/chargeUpdate',
        data,
        method: 'post'
      })
      if (response.message === 'Succesfull transaction') return true
      console.log('response api:', response)
      return false
    },
    async report (payload) {
      const response = await request({
        url: 'https://us-central1-witideal-develop.cloudfunctions.net/registerComplaint',
        data: payload,
        method: 'post'
      })
      return response.status === 'success'
    }
  },
}

export default api