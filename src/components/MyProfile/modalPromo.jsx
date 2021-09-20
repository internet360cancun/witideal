import React from 'react'
import { Modal as ModalBase, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import useSession from '../../Hooks/useSession'
import Button from '../../layouts/button'
import { setAlert } from '../Alert/alert'
import copy from 'copy-to-clipboard'

export const ModalPromo = props => {
  const session = useSession()
  
  const handleCopyCode = async _event => {
    copy(session.uId)
    setAlert(null, ' ', 'Tú código se ha copiado al portapapeles', 'success')
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Content>
        <TypographyStyled variant='h5'> ¿Quieres conseguir más witicoins?</TypographyStyled>
        <Sentence>
          Obtén 50 witicoins gratuitas al compartir este código.
        </Sentence>
        <Sentence>
          Envía a tus colegas el código y cuando alguno de ellos compre un paquete por primera vez, a ambos se les abonarán 50 witicoins.
        </Sentence>
          <TextFieldStyled label='Tú código de invitación' defaultValue={session.uId} variant="outlined" disabled fullWidth/>
        <ButtonStyled onClick={handleCopyCode}>Copiar código</ButtonStyled>
      </Content>
    </Modal>
  )
}

const Modal = styled(ModalBase)({
  margin: 'auto',
  border: '0px',
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Content = styled('div')({
  padding: '50px',
  boxSizing: 'border-box',
  border: '0px',
  outline: 'none',
  borderRadius: '10px',
  width: '80%',
  minHeight: '400px',
  maxWidth: '500px',
  background: '#fff',
  '@media (max-width: 500px)': {
    padding: '20px',
    width: '90%',
  }
})

const TypographyStyled = styled(Typography)({
  color: 'var(--blue-hover)',
  fontWeight: 'bold',
  marginBottom: '30px',
})

const Sentence = styled('p')({
  lineHeight: '1.5em',
  color: 'var(--blue)',
  marginBottom: '10px',
})

const ButtonStyled = styled(Button)({
  margin: 'auto',
  marginTop: '20px',
  borderRadius: '50px',
  padding: '8px 15px',
  display: 'block',
  minWidth: '200px',
})

const TextFieldStyled = styled(TextField)({
  marginTop: '30px',
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    boder: '2px solid',
    borderColor: 'var(--blue-light)!important',
  },
  '& .MuiInputBase-root.Mui-disabled': {
    color: 'var(--blue)!important'
  },
  '& .PrivateNotchedOutline-legendLabelled-385': {
    color: 'var(--blue)!important'
  }
})
export default ModalPromo
