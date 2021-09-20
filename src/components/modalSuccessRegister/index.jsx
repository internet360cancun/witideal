import React, { useState, useEffect } from 'react'
import { Modal, Box, Paper, Grid, Button, useMediaQuery } from '@material-ui/core'
import styled from 'styled-components'
import useSession from '../../Hooks/useSession'
import { useHistory } from 'react-router-dom'

const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff11;
`

const PaperStyled = styled(Paper)`
  width: 90%;
  min-height: 40vh;
  outline: none;
  max-width: 700px;
  @media screen and (max-width:1400px) {
    font-size: .8em;
  }
  @media screen and (max-width:1000px) {
    font-size: .8em;
  }
`
const Primary = styled.div`
  font-size: 3em;
  text-align: center;
  color: var(--blue-hover);
  @media screen and (max-width:500px) {
    font-size: 2em;
  }
`
const Name = styled.div`
  font-size: 3.3em;
  text-align: center;
  color: var(--blue);
  font-weight: bold;
  @media screen and (max-width:500px) {
    font-size: 2.5em;
  }
`
const Seconday = styled.div`
  font-size: 1.6em;
  line-height: 1.5em;
  text-align: center;
  color: var(--blue-hover);
  padding: 0px 50px;
  @media screen and (max-width:500px) {
    padding: 0px;
  }
`
const ButtonStyled = styled(Button)`
  border-radius: 50px;
  font-size: 1.2em;
  text-transform: none;
`

const SuccessRegisterModal = () => {
  const [isOpen, setopen] = useState(false)
  const session = useSession()
  const history = useHistory()
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleOpen = () => setopen(true)
  const handleClose = () => setopen(false)

  const handleAction = () => {
    handleClose()
    history.push('/Cargar')
  }

  // set handlers on window
  useEffect(() => {
    window.successRegister = {
      open: handleOpen,
      close: handleClose
    }
  }, [])

  return (
    <ModalStyled
      open={isOpen}
      onClose={handleClose}
      BackdropProps= {{
        style: { background: 'rgb(255 255 255 / 93%)' }  
      }}
    >
      <PaperStyled elevation={3}>
        <Box p={isMobile ? 2 : 5}>
          <Box pt={1} pb={1}>
            <Primary>¡Hola</Primary>
          </Box>
          <Box pt={1} pb={1}>
            <Name>{session.Name || session.authName }!</Name>
          </Box>
          <Box pt={1} pb={1}>
            <Seconday>Es un gusto recibirte en witideal, subamos juntos el primer inmueble</Seconday>
          </Box>
          <Box pt={4} pb={2}>
            <Grid container justify='center'>
              <ButtonStyled  onClick={handleAction} variant='contained' color='primary' size={isMobile ? 'medium' : 'medium'}>
                <span style={{ margin: isMobile ? '0px 10px' : '0px 20px' }}>
                  Comenzar
                </span>
              </ButtonStyled>
            </Grid>
          </Box>
        </Box>
      </PaperStyled>
    </ModalStyled>
  )
}

export default SuccessRegisterModal
