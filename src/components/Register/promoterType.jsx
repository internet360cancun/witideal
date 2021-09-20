import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Box, Button, TextField } from '@material-ui/core'
import { promoterType as promoterTypes } from '../../constants'
import { func } from 'prop-types'

const Content = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  @media screen and (max-width:600px) {
    width: 85%;
    margin: auto;
  }
`

const Title = styled.div`
  color: var(--blue-hover);
  font-weight: bold;
  margin-bottom: 30px;
`
const BoxSelector = styled.div`
  box-shadow: 1px 1px 9px 2px #bbbaba;
  border-radius: 10px;
  padding: 20px 20px;
  font-size: .7em;
  color: var(--blue-hover);
  font-weight: bold;
`

const ButtonType = styled.div`
  border: ${props => !props.$selected ? '1px solid var(--blue-light)' : '1px solid var(--blue)'};
  color: ${props => !props.$selected ? '#331e98' : '#fff'};
  background: ${props => !props.$selected ? '#fff' : 'var(--blue)'};
  border-radius: 50px;
  font-size: .75em;
  padding: 10px 0px;
  margin-top: 20px;
  font-weight: normal;
  cursor: pointer;
`

const ButtonStyled = styled(Button)`
  border-radius: 50px;
  text-transform: none;
`

const TextFieldStyled = styled(TextField)`
  border-radius: 10px;
  fieldset {
    border-radius: 10px;
    border-color: var(--blue-light);
    
  }
  :hover fieldset {
    border-color: var(--blue)!important;
  }
`

const PromoterType = props => {
  const [promoterType, setPromoterType] = useState(null)
  const [companyName, setCompanyName] = useState('')
  
  const isButtonDisabled = () => {
    if (!promoterType) return true
    if (promoterType === 'company' && companyName.toString().length < 3) return true
    return false
  }

  const handleSet = () => {
    props.onSet({
      promoterType,
      companyName,
    })
  }

  const handlePromoterTypeChange = value => {
    setPromoterType(value)
    setCompanyName('')
  }

  return (
    <Content>
      <Title>Selecciona una opción</Title>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12} sm={8} md={4}>
          <BoxSelector>
            Soy una
            <ButtonType $selected={promoterType === 'company'} onClick={event => handlePromoterTypeChange('company')}>
              {promoterTypes['company']}
            </ButtonType>
          </BoxSelector>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <BoxSelector>
            Soy un
            <ButtonType $selected={promoterType === 'independenBroker'} onClick={event => handlePromoterTypeChange('independenBroker')}>
              {promoterTypes['independenBroker']}
            </ButtonType>
          </BoxSelector>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <BoxSelector>
            Soy
            <ButtonType $selected={promoterType === 'owner'} onClick={event => handlePromoterTypeChange('owner')}>
              {promoterTypes['owner']}
            </ButtonType>
          </BoxSelector>
        </Grid>
      </Grid>

      {promoterType === 'company' && (
        <Box mt={4}>
          <Grid container justify='center'>
            <Grid item xs={12} sm={8} md={4}>
              <TextFieldStyled value={companyName} onChange={event => setCompanyName(event.target.value)} fullWidth variant='outlined' color='primary' size='small' label='Nombre inmobiliaria' />
            </Grid>
          </Grid>
        </Box>
      )}

      <Box mt={4}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={8} md={4}>
            <ButtonStyled onClick={handleSet} disabled={isButtonDisabled()} fullWidth variant='contained' color='primary'>Siguiente</ButtonStyled>
          </Grid>
        </Grid>
      </Box>
    </Content>
  )
}

PromoterType.propTypes = {
  onSet: func
}

export default PromoterType
