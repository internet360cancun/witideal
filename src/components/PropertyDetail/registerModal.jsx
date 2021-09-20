import { Modal } from '@material-ui/core'
import React, { useState } from 'react'
import Register from './register'
import styled from 'styled-components'
import { useEffect } from 'react'

const BoxStyled = styled.div`
  outline: none;
  width: 500px;
  max-width:90%;
  @media (max-width:400px) {
    max-width: 350px;
  }
`
const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalRegister = (props) => {
  const [open, setOpen] = useState(false)
  
  const handleClose = () => {
    setOpen(false)
    props.onClose()
  }
  const handleOpen = () => setOpen(true)

  useEffect(() => {
    window.modalRegister = {
      open: handleOpen,
      close: handleClose
    }
  })

  return (
    <ModalStyled
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <BoxStyled>
        <Register handleClose={handleClose} handleOpen={handleOpen} />
      </BoxStyled>
    </ModalStyled>
  )
}

export default ModalRegister
