import { useContext } from 'react'
import sessionContext from '../contexts/sessionContext'

const useSession = () => {
  const session = useContext(sessionContext)
  return session
}

export default useSession