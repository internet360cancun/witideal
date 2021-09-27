import React from 'react'
import { Box, Paper, Grid, Button, useMediaQuery } from '@material-ui/core'
import styled from 'styled-components'
// import { Close } from '@material-ui/icons'


const PaperStyled = styled(Paper)`
  position: relative;
  width: 90%;
  min-height: 40vh;
  outline: none;
  max-width: 900px;
  @media screen and (max-width:1400px) {
    max-width: 800px;
    font-size: .8em;
  }
  @media screen and (max-width:1000px) {
    font-size: .8em;
  }
`
const Primary = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
  color: var(--blue-hover);
  @media screen and (max-width:500px) {
    font-size: 1.7em;
  }
`
const Name = styled.div`
  font-size: 2.7em;
  text-align: center;
  color: var(--blue);
  font-weight: bold;
  width: 80%;
  margin: auto;
  @media screen and (max-width:500px) {
    font-size: 2.3em;
  }
`
const Seconday = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: var(--blue-hover);
  max-width: 480px;
  margin: auto;
  @media screen and (max-width:1400px) {
    max-width: 350px;
  }
  @media screen and (max-width:500px) {
    font-size: 1.6em;
  }
`

// const IconButtonStyled = styled(IconButton)`
//   position: absolute;
//   right: 0px;
// `

const ButtonStyled = styled(Button)`
  border-radius: 50px;
  font-size: 1.2em;
  text-transform: none;
`

const SuccessWithoutWiticoins = props => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <PaperStyled elevation={3}>
        <Box p={isMobile ? 3 : 5}>
          <Box pt={2} pb={2}>
            <Primary>¡Listo, tu inmueble ha sido cargado con éxito!</Primary>
          </Box>
          <Box pt={1} pb={1}>
            <Name>Tus witicoins están por agotarse</Name>
          </Box>
          <Box pt={1} pb={1}>
            <Seconday>te invitamos a que compres un paquete, para que tus anuncios sigan siendo visibles.</Seconday>
          </Box>
          <Box pt={4} pb={2}>
            <Grid container justify='center'>
              <ButtonStyled fullWidth={isMobile} onClick={props.onClose} style={{ marginRight: isMobile ? ' 0px' : '15px',  marginBottom: isMobile ? ' 15px' : '0px' }} variant='outlined' color='primary' size={isMobile ? 'medium' : 'medium'}>Elegir más tarde</ButtonStyled>
              <ButtonStyled fullWidth={isMobile} onClick={props.onAction} variant='contained' color='primary' size={isMobile ? 'medium' : 'medium'}>Elegir paquete</ButtonStyled>
            </Grid>
          </Box>
        </Box>
      </PaperStyled>
  )
}

export default SuccessWithoutWiticoins
