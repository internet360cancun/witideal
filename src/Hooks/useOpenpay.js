import {useState,useEffect} from 'react'
import {cardError} from '../functions/paymentErrorDictionary';
import { enviroment } from '../constants/globalConstraints'

const OpenPay = window.OpenPay
if (OpenPay) {
  if (enviroment === 'production') {
    OpenPay.setId('mbaa8esuduabkwecjkqd');
    OpenPay.setApiKey('pk_df6a72e148584e0399fcf8b5373dfaf7');
    OpenPay.setSandboxMode(false);
  } else {
    OpenPay.setId('mbrsxu3siifwcoipacf6');
    OpenPay.setApiKey('pk_e33565c071584f6bb3fd4a39b55293a2');
    OpenPay.setSandboxMode(true);
  }
}

function useOpenpay(){
  const [DevId, setDevId] = useState('')
  
  useEffect(() => {
    console.log('setting devid')
    setDevId(()=>OpenPay.deviceData.setup())
  }, [])

  const getToken =  (obj,CB,errorHandler)=>{
    try {
       OpenPay.token.create(obj, (response)=>{console.log('response.data', response.data); return CB(response.data)},
       (err)=>{
        console.log('error dimelo',err) 
        return errorHandler(cardError( err.data.error_code))}
      );
    } catch (err) {
      errorHandler('Ups algo salió mal !');
    }
   }
   return { DevId, getToken }

}
export default useOpenpay