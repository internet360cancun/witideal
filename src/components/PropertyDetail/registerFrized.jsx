import React, { useState } from 'react'
import styled from 'styled-components'
import { Paper, Box, FormControlLabel, Checkbox, Button, CircularProgress, Grid, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import InputGroup from '../../layouts/inputGroup'
import useObjectState from '../../Hooks/useObjectState'
import GoogleSrc from '.././../assets/google.png'
import { requires, validateEmail } from '../../helpers/validate'
import { setAlert } from '../../components/Alert/alert'
import { register, registerOrLoginWidthGoogle, add } from '../../firebase/user'
import useSession from '../../Hooks/useSession'
import analytics from 'react-ga'
import { isProduction } from '../../constants/globalConstraints'


const Text = styled.div`
  color: gray;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  @media screen and (max-width:800px) {
    font-size: 1.1em;
  }
`
const InputGroupStyled = styled(InputGroup)`
  margin: auto;
  display: block;
  margin-bottom: 15px;
  width: 70%;
  @media screen and (max-width:1600px) {
    width: 80%;
  }
  @media screen and (max-width:1280px) {
    width: 100%;
  }
  fieldset {
    border-color: var(--blue-light);
  }
  :hover fieldset {
    border-color: var(--blue-light)!important
  }
`

const ButtonStyled = styled(Button)`
  border-radius: 50px;
  text-transform: none;
`
const Limiter = styled(Box)`
  width: 70%;
  margin: auto;
  @media screen and (max-width:800px) {
    width: 90%;
  }
`

const SecondaryText = styled.div`
  text-align: center;
  margin-top: 15px;
`

const Icon = styled.img`
  width: 18px;
  margin-right: 30px;
`

const Register = props => {
  const [state, setState] = useObjectState({})
  const [terms, setTerms] = useState(true)
  const [loading, setLoading] = useState(false)
  const [onlyCompleting, setOnlyCompleting] = useState(false)
  const session = useSession()
  const [showpass, setShowpass ] = useState(false)
  console.log('sessionsession', session)

  const onTermChange = event => {
    setTerms(event.target.checked)
  }

  const handleRegisterWidthGoogle = async () => {
    setLoading(true)
    try {
      const responseGoogle = await registerOrLoginWidthGoogle()
      console.log('responseGoogle', responseGoogle)
      const { isComplete = false, phoneNumber = '', uid = '', email = '', given_name = '', photoURL = null, family_name } = responseGoogle
    
      if (!isComplete) {
        setOnlyCompleting(uid)
        setState({
          errors: false,
          name: given_name,
          lastname: family_name,
          photo: photoURL,
          phone: phoneNumber,
          mail: email,
        })
      } else {
        if(props.handleClose) props.handleClose()
      }
    } catch (error) {
      console.log('error')
    }
    setLoading(false)
  }

  const handleCompleting = async () => {
    const errors = requires(state, ['name', 'lastname', 'mail', 'phone'])
    if (errors) {
      setState({ errors: errors })
      return setAlert(null, ' ', 'Todos los campos son requeridos', 'error')
    }
    if (state.phone.toString().length < 10) {
      setState({ errors: ['phone'] })
      return setAlert(null, ' ', 'El número no es válido', 'error')
    }
    if (!terms) {
      return setAlert(null, ' ', 'Debes aceptar los términos y condiciones', 'error')
    }
    setLoading(true)
    await add(onlyCompleting, {...state, isRegisterComplete: true, isPromoter: false })
    
    if (props.handleClose) props.handleClose()
    setLoading(false)
    if (isProduction) {
      analytics.event({
        action: 'register',
        category: 'null',
        label: 'searcher'
      })
    }
    // await new Promise(resolve => setTimeout(resolve, 1000))
    session.refresh()
  }

  const handleRegister = async () => {
    const errors = requires(state, ['name', 'lastname', 'mail', 'phone', 'password'])
    if (errors) {
      setState({ errors: errors })
      return setAlert(null, ' ', 'Todos los campos son requeridos', 'error')
    }
    if (state.phone.toString().length < 10) {
      setState({ errors: ['phone'] })
      return setAlert(null, ' ', 'El número no es válido', 'error')
    }
    if (state.password.toString().length < 8) {
      setState({ errors: ['password'] })
      return setAlert(null, ' ', 'La contraseña es muy corta', 'error')
    }
    if (!validateEmail(state.mail)) {
      setState({ errors: ['mail'] })
      return setAlert(null, ' ', 'El correo no es válido', 'error')
    }
    if (!terms) {
      return setAlert(null, ' ', 'Debes aceptar los términos y condiciones', 'error')
    }
    setLoading(true)
    const { error, message }  = await register(state)
    setLoading(false)
    if (error) {
      setAlert(null, ' ', message, 'error')
    } else {
      if (isProduction) {
        analytics.event({
          action: 'register',
          category: 'null',
          label: 'searcher'
        })
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      session.refresh()
      if (props.handleClose) props.handleClose()
    }
  }

  return (
    <Paper>
      <Box p={2}>
        {loading && (
          <Grid container alignItems='center' justify='center' style={{ minHeight: '300px' }}>
            <CircularProgress />
          </Grid>
        )}
        {!loading && (
          <>
            <Text>
            Ingresa tus datos  <br /> <span style={{ color: 'var(--blue)' }}> para ver la información </span> <br /> del promotor
            </Text>
            <Limiter p={2}>
              <Box mb={2}>
                {!onlyCompleting && (
                  <>
                    <ButtonStyled onClick={handleRegisterWidthGoogle} fullWidth variant='outlined'> <Icon src={GoogleSrc} />Continuar con Google</ButtonStyled>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', marginBottom: '5px' }}>
                      <div style={{ borderBottom: '1px solid gray', flexGrow: 1 }}/>
                        <div style={{ flexGrow: 1, fontSize: '1.2em', textAlign: 'center' }}>
                          o
                        </div>
                      <div style={{ borderBottom: '1px solid gray', flexGrow: 1 }}/>
                    </div>
                  </>
                )}
                  
              </Box>
              
                <InputGroupStyled
                  margin='none'
                  size='small'
                  label='Nombre *'
                  limit={50}
                  state={state}
                  setState={setState}
                  name='name'
                />

                <InputGroupStyled
                  margin='none'
                  size='small'
                  label='Apellidos *'
                  limit={50}
                  state={state}
                  setState={setState}
                  name='lastname'
                />

              <InputGroupStyled
                margin='none'
                size='small'
                label='Celular *'
                filter='number'
                limit={10}
                state={state}
                setState={setState}
                name='phone'
              />

                <InputGroupStyled
                  margin='none'
                  size='small'
                  label='Correo Electrónico *'
                  limit={50}
                  state={state}
                  setState={setState}
                  name='mail'
                  disabled={onlyCompleting}
                />

              {!onlyCompleting && (
                <InputGroupStyled
                  type={showpass ? 'string' : 'password'}
                  margin='none'
                  size='small'
                  label='Crear Contraseña *'
                  limit={50}
                  state={state}
                  setState={setState}
                  name='password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={ event => setShowpass(pass => !pass)} >
                          {showpass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={terms}
                    onChange={onTermChange}
                    name='termsNconditions'
                    color="primary"
                  />
                }
                label="Acepto términos y condiciones"
              />
              <Box>
                <ButtonStyled onClick={ evenet => { onlyCompleting ? handleCompleting() : handleRegister() }} color='primary' variant='contained' fullWidth>Ver información del Promotor</ButtonStyled>
              </Box>
              <SecondaryText>
                ¿Ya tienes una cuenta? <span style={{ color: 'var(--blue)', cursor: 'pointer' }}onClick={event => {if (props.handleClose) props.handleClose(); window.login()}}>Inicia Sesión</span>
              </SecondaryText>
              </Box>
            </Limiter>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default Register
