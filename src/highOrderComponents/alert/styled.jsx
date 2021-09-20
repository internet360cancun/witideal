import { Modal as ModalBase } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { ButtonPrimary } from '../../components/layout'

export const Modal = styled(ModalBase)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& *': {
    boxSizing: "border-box",
  }
})

export const Box = styled('div')({
  borderTop: '3px solid var(--blue-light)',
  outline: 'none',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff',
  width: '80%',
  maxWidth: '500px',
  minHeight: '400px',
  padding: '50px',
  flexDirection: "column",
  '@media (max-width:600px)': {
    padding: '10px',
    width: '95%',
    minHeight: '350px',
  }
})

export const ButtonContent = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: "wrap",
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '50px',
  '@media (max-width:600px)': {
    justifyContent: 'center',
    fontSize: '.9em',
  },
  
})

export const Button = styled(ButtonPrimary)({
  marginBottom: '10px',
  fontSize: '.9em',
  minWidth: '180px',
  fontWeight: 'bold',
  marginRight: '10px',
  '&:last-of-type': {
    marginRight: '0px!important'
  },
  '@media (max-width:600px)': {
    marginRight: '0px!important'
  },
  
})

export const Text = styled('div')({
  lineHeight: '1.8em',
  fontSize: '1.2em',
  textAlign: 'center',
  '@media (max-width:600px)': {
    lineHeight: '1.6em',
  }
})