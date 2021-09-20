/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { onChnage as onWiticoinsChnage } from '../firebase/wallet'
import useSession from './useSession'

const useWiticoins = () => {
  const [witicoins, setWiticoins] = useState(0)
  const session = useSession()

  useEffect(() => {
    const unsubscribe = onWiticoinsChnage(session.uId, (witicoins) => {
      setWiticoins(witicoins)
    })
    return unsubscribe
  }, [session.uId])

  return witicoins
}

export default useWiticoins