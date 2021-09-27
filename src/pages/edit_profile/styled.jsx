import { styled } from '@material-ui/core/styles'
import { Paper, TextField, Button } from '@material-ui/core'
import { Check } from '@material-ui/icons'

export const Close = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  color: theme.wdPurpleSubtitle,
  padding: '3px 5px',
  borderRadius: '5px',
  border: '1px solid #fff',
  transition: 'all .2s',
  '&:hover': {
    transform: 'scale(1.1)',
    color: theme.wdLightBlue,
    border: '1px solid'
  }
}))

export const Background = styled('div')({
  background: 'rgba(249, 247, 252, 0.92)',
  position: "fixed",
  width: "100%",
  minHeight: '100%',
  zIndex: '10',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
export const CheckIconStyled = styled(Check)({
  color: '#41B8F9',
  width: '100px',
  height: '100px'
})
export const PaperStyled = styled(Paper)({
  position: 'relative',
  marginTop: '60px',
  width: '80%',
  maxWidth: '500px',
  minHeight: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width:500px)': {
    width: '90%',
  }
})

export const Form = styled('form')({
  width: '100%',
  height: '100%',
})

export const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: props => props.variant === 'contained' ? theme.colorBlue : '#fff',
  color: props => props.variant === 'contained' ? '#fff' : 'var(--blue)',
  fontFamily: 'Open Sans',
  textTransform: 'none',
  borderRadius: '10px',
  '& .MuiButton-label': {
    color: props => props.variant === 'contained' ? '#fff' : 'var(--blue)',
  },
  '&:hover': {
    backgroundColor: props => props.variant === 'contained' ? theme.wdRegularBlue : '#fff',
  },
}))

export const Input = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: 'rgb(30, 14, 111)'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.wdLightBlue,
    borderWidth: '2px',
  },
  '& *:hover': {
    borderColor: theme.wdLightBlue,
  },
  '& label': {
    transform: 'translate(10px, 14px) scale(1)',
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
    color: theme.wdPurpleSubtitle
  },
}))

export const Success = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

export const ExtrasPhoneContainer = styled('div')({
  position: 'relative',
  '& svg': {
    top: '8px',
    right: '8px',
    position: "absolute",
    cursor: 'pointer',
    color: 'var(--blue-light)',
    '&:hover': {
      color: 'var(--blue-hover)'
    }
  }
})

export const InputGroup = styled('div')({
  marginBottom: '15px',
})

export const InputGroupFlex = styled(InputGroup)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
})

export const Text = styled('div')({
  fontSize: '.9em',
  textAlign: 'left',
})