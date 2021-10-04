import React, { useState } from 'react'
import connect from '../../firebase'
import { Background, PaperStyled, Form, Input, ButtonStyled, ExtrasPhoneContainer, InputGroup, Text, InputGroupFlex } from './styled'
import { Box, CircularProgress, Typography} from '@material-ui/core'
import Avatar from './avatar'
import { setAlert } from '../../components/Alert/alert'
import timer from '../../helpers/timer'
import { Checkbox, InputAdornment, IconButton, Grid, styled } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { getProviders } from '../../firebase/user'
import useFetch from '../../Hooks/useFetch'
import { updatePassword, createPassword } from '../../firebase/user'
import { Visibility, VisibilityOff, Check } from '@material-ui/icons'
import  CloseModal  from '../../layouts/closeModal'

const EditProfile = (props) => {
  const [newPhoto, setNewPhotoCrud] = useState(null)
  const [disable, setDisable] = useState(true)
  const [errors, setErrors] = useState([])
  const [existPasswod, setExistPAssword] = useState(false)
  const [showPassword, setShowPassword] = useState([false, false, false])

  const toggleShowPassword = index => {
    const password = [...showPassword]
    password[index - 1] = !password[index - 1]
    setShowPassword(password)
  }

  const setNewPhoto = data => {
    setNewPhotoCrud(data)
    setDisable(false)
  }

  const [state, setState] = useState({
    name: props.Name || '',
    lastname: props.lastname || '',
    companyname: props.companyName || '',
    photo: props.PhotoURL || '',
    view: 'generaldata', // 'generaldata' || loading || password || success_create
    extraPhones: props.extraPhones || [],
    showMainPhone: props.showMainPhone === undefined || props.showMainPhone === null ? true : props.showMainPhone,
    password: '',
    new_password: '',
    re_new_password: ''
  })

  const handleRemoveError = event => {
    setErrors(errors.filter(error => error !== event.target.name))
  }
  
  // get auth providers
  useFetch(async () => {
    const providers = await getProviders()
    setExistPAssword(providers.includes('password'))
  }, [])

  const onCheckboxChange = event => {
    if (disable) setDisable(false)
    if (event.target.checked) return setState({ ...state, showMainPhone: true })
    if (state.extraPhones.length === 0) return setAlert(null, ' ', 'Primero agrega otro número de teléfono', 'error')
    setAlert(
      () => setState({ ...state,  showMainPhone: false }),
      ' ',
      'Si desactivas el teléfono principal los usuarios no recibirán este número como dato de contacto',
      'warning',
      'Aceptar'
    )
  }

  const handleChange = event => {
    if (disable) setDisable(false)
    const {name, value} = event.target
    setState({...state, [name]: value})
  }

  const handleChangeExtraNumber = event => {
    if (disable) setDisable(false)
    var { value, name } = event.target
    value = isNaN(parseInt(value)) ? '' : parseInt(value).toString()
    if (value.length > 10) return false
    const extraPhones = [...state.extraPhones]
    extraPhones[name] = value
    setState({ ...state, extraPhones })
  }

  const addNewNumber = _event => {
    if (disable) setDisable(false)
    const extraPhones = [...state.extraPhones]
    extraPhones.push('')
    setState({ ...state, extraPhones })
  }

  const handleUpdate = async () => {
    const errors = getErrors()
    if (errors) {
      setErrors(errors)
      setAlert(null, ' ', 'Todos los campos son obligatorios ', 'error')
      return false
    }
    
    setState({...state, view: 'loading'})
    const data = {
      name: state.name,
      lastname: state.lastname,
      extraPhones: state.extraPhones,
    }
    if (props.isPromoter) data.companyName = state.companyname
    if (props.isPromoter) data.showMainPhone = state.showMainPhone
    await connect.users.updateInfo(props.uId, data, newPhoto, props.PhotoURL)
    await timer(3000)
    props.setModalActive(false); props.refresh()
    setAlert(null, 'Guardado', 'Los datos del perfil se cambiaron correcamente.', 'success')
  }

  const setPhoto = (photo) => {
    setState({...state, photo})
  }

  const handleDeleteExtraNumber = (indexToDelete) => {
    setDisable(false)
    const newExtraPhones = state.extraPhones.filter((phone, index) => index !== indexToDelete)
    const showMainPhone = newExtraPhones.length === 0 || state.showMainPhone
    setState({ ...state, extraPhones: newExtraPhones, showMainPhone })
  }
  
  const getErrors = () => {
    const error = []
    if (state.name.length === 0) error.push('name')
    if (state.lastname.length === 0) error.push('lastname')
    if (state.companyname.length === 0 && props.isPromoter) error.push('companyname')
    state.extraPhones.map((value, index) => {
      if (value.toString().length !== 8 && value.toString().length !== 10)
      error.push(index.toString())
    })
    return error.length > 0 ? error : null
  }

  const handleEditPassword = () => {
    setDisable(true)
    setState({
      ...state,
      view: 'security'
    })
  }

  const saveNewPassword = async () => {
    if (state.password.length < 8) {
      setAlert(null, ' ', 'Contraseña incorrecta', 'error')
      return setErrors(['password'])
    }
    if (state.new_password.length < 8) {
      setAlert(null, ' ', 'La contraseña debe tener mínimo 8 caracteres', 'error')
      return setErrors(['new_password'])
    }
    if (state.new_password !== state.re_new_password) {
      setAlert(null, ' ', 'Las contraseñas no coinciden', 'error')
      return setErrors(['re_new_password'])
    }

    setState({...state, view: 'loading'})
    const result = await updatePassword(state.password, state.new_password)
    
    if (result.error) {
      setAlert(null, ' ', result.errorMessage, 'error')
      setState({
        ...state,
        password: '',
        new_password: '',
        re_new_password: '',
        view: 'security'
      })
    } else {
      setAlert(null, ' ', 'La contraseña se actualizó correctamente', 'success')
      props.setModalActive(false)
      props.refresh()
    }
  }

  const sendLinkTopassword = async () => {
    setState({
      ...state,
      view: 'loading',
    })
    const result = await createPassword(props.authAnon || props.Email)
    if (result) {
      setState({
        ...state, 
        view: 'success_create'
      })
    } else {
      setState({
        ...state, 
        view: 'security'
      })
      setAlert(null, ' ', 'Error interno del servidor, inténtalo de nuevo mas tarde')
    }
  }

  return (
    <Background>
      <div style={{width: '100%', height: '100%', position: 'absolute'}} onClick={() => {props.setModalActive(false)}} />
     
      <PaperStyled elevation={3}>
        <CloseModal onClick={() => props.setModalActive(false)} />
        <Box p={2} style={{ width: '80%', margin: 'auto' }}>
          {state.view === 'loading' && (
            <CircularProgress />
          )}
          {state.view === 'generaldata' && (
            <Form autoComplete="off">
              <Avatar photo={state.photo} setPhoto={setPhoto} setNewPhoto={setNewPhoto}/>
              <InputGroup>
                <Input onFocus={handleRemoveError} error={errors.includes('name')} autoComplete='off' onChange={handleChange} value={state.name} fullWidth name='name' label="Nombre" variant="outlined" />
              </InputGroup>
              <InputGroup>
                <Input onFocus={handleRemoveError} error={errors.includes('lastname')} autoComplete='off' onChange={handleChange} value={state.lastname} fullWidth name='lastname' label="Apellidos" variant="outlined" />
              </InputGroup>
              {props.isPromoter && (
                <InputGroup>
                  <Input onFocus={handleRemoveError} error={errors.includes('companyname')} autoComplete='off' onChange={handleChange} value={state.companyname} fullWidth name='companyname' label="Inmobiliaria" variant="outlined" />
                </InputGroup>
              )}
              {props.isPromoter && (
                <InputGroupFlex>
                  <Checkbox color='primary' checked={state.showMainPhone} onChange={onCheckboxChange} />
                  <Text>Mostrar teléfono principal como dato de contacto</Text>
                </InputGroupFlex>
              )}
              {state.extraPhones.map((number, index) => (
                <InputGroup key={index}>
                  <ExtrasPhoneContainer>
                    <Input onFocus={handleRemoveError} error={errors.includes(index.toString())} autoComplete='off' onChange={handleChangeExtraNumber} value={number} fullWidth name={index.toString()} label="Número de teléfono" variant="outlined" />
                    <Delete onClick={() => handleDeleteExtraNumber(index)} />
                  </ExtrasPhoneContainer>
                </InputGroup>
              ))}
              {state.extraPhones.length < 2 && (
                <InputGroup>
                  <ButtonStyled onClick={addNewNumber} variant="outlined" fullWidth>
                    Agregar número de teléfono
                  </ButtonStyled>
                </InputGroup>
              )}
              <InputGroup>
                <ButtonStyled 
                  fullWidth 
                  variant="outlined"
                  onClick={handleEditPassword}
                  >Cambiar contraseña
                </ButtonStyled>
              </InputGroup>
              <InputGroup>
                <ButtonStyled 
                  fullWidth 
                  disabled={disable} 
                  variant="contained"
                  onClick={handleUpdate}
                  color="primary">Guardar
                </ButtonStyled>
              </InputGroup>
            </Form>
          )}

          {state.view === 'security' && existPasswod && (
            <Form autoComplete="off">
              <InputGroup>
                <Input
                type={showPassword[0] ? 'text' : 'password'}
                onFocus={handleRemoveError}
                error={errors.includes('password')}
                autoComplete='off'
                onChange={handleChange}
                value={state.password}
                fullWidth
                name='password'
                label="Contraseña actual"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword(1)}
                      edge="end"
                    >
                      {showPassword[0] ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  )
                }}
              />
              </InputGroup>
              <InputGroup>
                <Input
                  type={showPassword[1] ? 'text' : 'password'}
                  onFocus={handleRemoveError}
                  error={errors.includes('new_password')}
                  autoComplete='off'
                  onChange={handleChange}
                  value={state.new_password}
                  fullWidth name='new_password' 
                  label="Nueva contraseña" 
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => toggleShowPassword(2)}
                        edge="end"
                      >
                        {showPassword[1] ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }}
                />
              </InputGroup>
              <InputGroup>
                <Input 
                type={showPassword[2] ? 'text' : 'password'}
                onFocus={handleRemoveError} 
                error={errors.includes('re_new_password')} 
                autoComplete='off' onChange={handleChange} 
                value={state.re_new_password} 
                fullWidth name='re_new_password' 
                label="Confirmar nueva contraseña" 
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword(3)}
                      edge="end"
                    >
                      {showPassword[2] ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  )
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword(3)}
                      edge="end"
                    >
                      {showPassword[2] ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </InputGroup>

              <InputGroup>
                <ButtonStyled
                  fullWidth
                  disabled={disable}
                  variant="contained"
                  onClick={saveNewPassword}
                  color="primary"
                >
                  Cambiar contraseña
                </ButtonStyled>
              </InputGroup>
            </Form>
          )}

          {state.view === 'security' && !existPasswod && (
            <>
              <Box mb={5}>
                <Typography color='primary'>
                  Enviar correo con link para crear contraseña
                </Typography>
              </Box>
              <InputGroup>
                <ButtonStyled
                  fullWidth
                  variant="contained"
                  onClick={sendLinkTopassword}
                  color="primary"
                >
                Enviar
              </ButtonStyled>
            </InputGroup>
            </>
          )}

          {state.view === 'success_create' && (
             <>
              <Grid item xs={12}>
                <CheckStyled />
              </Grid>
              <Grid item xs={12}>
              <Typography variant='h5' style={{ color: 'var(--blue)', marginBottom: '20px' }}>
                ¡Muy Bien!
              </Typography>
                <Typography variant='h6'>
                  Se ha enviado un correo a tu cuenta de correo. Por favor, revísalo para crear tu contraseña.
                </Typography>
              </Grid>
            </>
          )}
        </Box>
      </PaperStyled>
    </Background>
  )
}

const CheckStyled = styled(Check)({
  position: 'relative',
  background: '#4caf82',
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  color: '#fff',
  padding: '10px',
  marginBottom: '20px',
})

export default EditProfile