import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import { Modal, Typography, CircularProgress } from '@material-ui/core'
import { Select, MenuItem } from '@material-ui/core'
import { TextField, ButtonBase } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import api from '../../api'

const Report = props => {
  const [type, setType] = useState('porn')
  const [description, setDescription] = useState('')
  const [errorDescription, setErrorDescription] = useState(false)
  const [currentView, setCurrentView] = useState('form') //form || loading || success

  const onTypeChange = event => {
    setType(event.target.value)
  }

  const onDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const onSendClick = async event => {
    const {uId, pId} = props
    if (!description.length) {
      setErrorDescription(true)
      setTimeout(event => setErrorDescription(false), 5000)
    } else {
      setCurrentView('loading')
      await api.property.report({ uId, pId, type, description })
      setCurrentView('success')
    }
  }

  const onFinalizeClick = event => {
    setCurrentView('form')
    setType('porn')
    setDescription('')
    props.onClose()
  }

  return (
    <ModalContent open={props.open} onClose={props.onClose}>
      <Body>
        {currentView === 'form' && (
          <LimiterWidth>
            <TypographyStyled variant='h5'>Selecciona un problema</TypographyStyled>
            <TypographyStyled>
              Puedes reportar este contenido después de seleccionar un problema
            </TypographyStyled>
            {errorDescription && (
              <AlertStyled severity='error'>Porfavor agrega una descripción</AlertStyled>
            )}
            <SelectStyled  onChange={onTypeChange} value={type} variant="outlined">
              <MenuItem value='porn'>Contiene pornografía</MenuItem>
              <MenuItem value='stolen'>Este anuncio es mío</MenuItem>
              <MenuItem value='fraud'>La información parece fraudulenta</MenuItem>
              <MenuItem value='violence'>Contiene violencia de género</MenuItem>
              <MenuItem value='other'>Otro</MenuItem>
            </SelectStyled>
            <TextFiledStyled
              inputProps={{maxLength: 280}}
              label='Descripción'
              onChange={onDescriptionChange}
              value={description}
              multiline
              rows={6}
              variant='outlined'
              fullWidth
              error={errorDescription}
            />
            <Limiter>{description.length}/280</Limiter>
            <Button onClick={onSendClick}>Enviar</Button>
          </LimiterWidth>
        )}
        {currentView === 'loading' && (
          <CircularProgress />
        )}
        {currentView === 'success' && (
          <LimiterWidth>
            <TypographyStyled variant='h5'>
              Gracias por tu reporte, se envió correctamente.
            </TypographyStyled>
            <TypographyStyled>
              Tus reportes nos ayudan a que nuestro sistema determine cuando algo no es apropiado.
            </TypographyStyled>
            <Button onClick={onFinalizeClick}>Finalizar</Button>
          </LimiterWidth>
        )}
      </Body>
    </ModalContent>
  )
}

const ModalContent = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center;'
})

const Body = styled('div')({
  width: '95%',
  boxSizing: 'border-box',
  minHeight: '400px',
  maxWidth: '500px',
  background: '#fff',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  outline: 'none'
})

const TextFiledStyled = styled(TextField)({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00abe9!important',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00abe9!important',
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red!important'
  }
})

const SelectStyled = styled(Select)({
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  marginBottom: '15px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00abe9!important',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00abe9!important',
  }
})

const Button = styled(ButtonBase)({
  background: "#3f19f9",
  width: "100%",
  padding: "8px 0px",
  borderRadius: "5px",
  marginTop: "15px",
  color: "#fff",
  fontSize: '1.1em',
  transition: 'all 0.3s',
  '&:hover': {
    background: '#1E0E6F'
  }
})
const LimiterWidth = styled('div')({
  width: '80%',
  margin: 'auto',
  '@media (max-width:400px)': {
    width: '100%'
  }
})

const TypographyStyled = styled(Typography)(options => ({
  color: options.theme.colors.blue_black,
  textAlign: 'center',
  marginBottom: '15px',
}))

const Limiter = styled('div')({
  color: '#00abe9',
  marginBottom: '15px',
  
})

const AlertStyled = styled(Alert)({
  marginBottom: '10px'
})

export default Report
