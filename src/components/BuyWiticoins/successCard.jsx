import React from 'react'
import { Box, Paper, styled } from '@material-ui/core'


const SuccessCard = props => {
  return (
    <Container p={2}>
      <Paper elevation={5}>
        <Box p={{xs: 2 , sm: 8, lg: 12}}>
          <Title variant='h3'>¡Tu compra de witicoins se realizó con éxito !</Title>
          <Text variant='h5'>La actualización de tus witicoins puede tardar un momento, para cualquier duda o aclaración favor de contactarse al 55 4731 8243 o mandar un correo a soporte@witideal.com</Text>
          <Order variant='body1'>Número de orden OID: {props.data.oId}</Order>
        </Box>
      </Paper>
    </Container>
  )
}

const Container = styled(Box)({
  width: '80%',
  maxWidth: '800px',
  boxSizing: 'border-box',
  '@media (max-width:600px)': {
    width: '95%',
  }
})

const Title = styled('div')({
  fontSize: '2em',
  fontWeight: 'bold',
  marginBottom: '20px',
  lineHeight: '1.6em',
  color: 'var(--blue-hover)',
  '@media (max-width:600px)': {
    fontSize: '1.5em',
  }
})

const Text = styled(Title)({
  fontSize: '1.4em',
  '@media (max-width:600px)': {
    fontSize: '1.1em',
  }
})
const Order = styled(Title)({
  fontSize: '1em',
  fontWeight: 'normal'
})
export default SuccessCard
