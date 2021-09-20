import React, { useState } from 'react'
import Modal from './modal'

const Alert = WrappedComponent => {
  const EnhancedComponent = props => {
    const [data, setData] = useState(null)

    const onClose = event => setData(null)

    const setAlert = data => {
      setData({
        severity: 'information',
        primaryAction: () => alert('primaryAction'),
        secondaryAction: () => alert('secondaryAction'),
        primaryActionText: 'aceptar',
        secondaryActionText: 'cancelar',
        message: 'mensaje de prueb',
        type: 'confirmation',
        ...data
      })
    }
    
    const closeAlert = () => setData(null)
    
    
    const properties = data || {}

    return (
      <>
        <Modal onClose={onClose} open={!!data} {...properties} />
        <WrappedComponent {...props} setAlert={setAlert} closeAlert={closeAlert} />
      </>
    )
  }

  return EnhancedComponent
}


export default Alert
