import {setAlert} from '../components/Alert/alert'

const customUserConfirmation = (message, callback) =>  {
  setAlert(
    () => callback(true),
    '¿Seguro que quieres salir?',
    'Se perderá toda la información proporcionada',
    'warning',
    'salir',
    () => () => callback(false)
  )
}

export default customUserConfirmation