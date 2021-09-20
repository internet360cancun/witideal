import { Button, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { Dropdown } from '../Dropdown/dropdown'
import { setAlert } from '../Alert/alert'

const montshValues = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

const TextFieldStyled = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#41B8F9',
    },
    '&:hover fieldset': {
      borderColor: '#3F19F9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3F19F9',
    },
  }
})

const ButtonStyled = styled(Button)({
  backgroundColor: '#3F19F9',
  color: "white",
  textTransform: "none",
  fontSize: 17,
  '&:hover': {
    backgroundColor: "#1E0E6F"
  }
})


const CardForm = props => {
  const [errors, setErrors] = useState([])
  const { onChange, onPay, cvv2, expirationMonth, holderName, cardNumber, expirationYear } = props

  const handleClick = () => {
    if (holderName.toString().length < 2) {
      setErrors(['holderName'])
      return setAlert(null, ' ', 'Nombre inválido', 'error' )
    }
    if (!window.OpenPay.card.validateCardNumber(cardNumber)) {
      setErrors(['cardNumber'])
      return setAlert(null, ' ', 'Número de tarjeta inválido', 'error' )
    }
    if (!window.OpenPay.card.validateCVC(cvv2)) {
      setErrors(['cvv2'])
      return setAlert(null, ' ', 'CVV inválido', 'error' )
    }
    if (!window.OpenPay.card.validateExpiry(expirationMonth, `20${expirationYear}`)) {
      setErrors(['expirationDate'])
      return setAlert(null, ' ', 'Fecha de expiración inválido', 'error' )
    }
    onPay()
  }
  
  const handleRemoveError = event => {
    if (errors && errors.length) setErrors([])
  }

  return (
    <React.Fragment>
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item xs={12}>
          <TextFieldStyled
            onChange={onChange}
            value={holderName}
            fullWidth
            id='holderName'
            label='Nombre en la Tarjeta'
            variant='outlined'
            error={errors.includes('holderName')}
            onFocus={handleRemoveError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldStyled
            fullWidth
            value={cardNumber}
            type='string'
            id='cardNumber'
            onChange={onChange}
            label='16 Dígitos de la Tarjeta'
            variant='outlined'
            error={errors.includes('cardNumber')}
            onFocus={handleRemoveError}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Dropdown
            inputLabel='Mes'
            value={expirationMonth}
            handler={onChange}
            name='expirationMonth'
            fullWidth={true}
            valuesArray={montshValues}
            error={errors.includes('expirationDate')}
            onFocus={handleRemoveError}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Dropdown
            inputLabel='Año'
            value={expirationYear}
            handler={onChange}
            name='expirationYear'
            fullWidth={true}
            valuesArray={Array.from([...Array(31).keys()], x => (x + 1) + 19)}
            error={errors.includes('expirationDate')}
            onFocus={handleRemoveError}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextFieldStyled
            label='CVV'
            value={cvv2}
            type='password'
            id='cvv2'
            fullWidth={true}
            onChange={onChange}
            variant='outlined'
            error={errors.includes('cvv2')}
            onFocus={handleRemoveError}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonStyled onClick={handleClick} size='large' variant='contained'>Realizar Pago</ButtonStyled>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

CardForm.propTypes = {
  onChange: func,
  onPay: func,
  cvv2: string,
  expirationMonth: string,
  holderName: string,
  cardNumber: string,
  expirationYear: string
}

export default CardForm
