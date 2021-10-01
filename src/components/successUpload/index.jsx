/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import useWiticoins from '../../Hooks/useWiticoins'
import FewWitiucoins from './successWithFewWiticoins'
import WithoutWiticoins from './sucessWithoutWiticoins'
// import FirstProperty from './firstProperty'
import useSession from '../../Hooks/useSession'
const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff11;
`

const SuccessUpload = () => {
  const [isOpen, setopen] = useState(false)
  const [isMyFirstProperty, setMyFirstProperty] = useState(false)
  const session = useSession()
  
  const witicoins = useWiticoins() 

  const history = useHistory()

  const handleOpen = (firstProp) => {
    setopen(true)
    if (firstProp) setMyFirstProperty(true)
  }
  const handleClose = () => {
    setopen(false)
    if (isMyFirstProperty) setMyFirstProperty(false)
    if ((session.promoterType === 'company' || session.promoterType === 'independenBroker') && isMyFirstProperty) {
      window.uploadguide.open()
    }
  }

  const handleAction = () => {
    handleClose()
    history.push('/comprar-witicoins')
  }

  // set handlers on window
  useEffect(() => {
    window.successUpload = {
      open: handleOpen,
      close: handleClose
    }
  }, [isMyFirstProperty])

  return (
    <ModalStyled
      open={isOpen}
      onClose={handleClose}
      BackdropProps= {{
        style: { background: 'rgb(255 255 255 / 93%)' }  
      }}
    >
      <>
        {!isMyFirstProperty && witicoins > 0 && (
          <FewWitiucoins 
            onClose={handleClose}
            onAction={handleAction}
          />
        )}
        {!isMyFirstProperty && witicoins < 1 && (
          <WithoutWiticoins
            onClose={handleClose}
            onAction={handleAction}
          />
        )}
        {/* {isMyFirstProperty && (
          <FirstProperty
            onClose={handleClose}
            onAction={handleAction}
          />
        )} */}
      </>
    </ModalStyled>
  )
}

export default SuccessUpload
