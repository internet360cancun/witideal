import { styled } from '@material-ui/core/styles'
import { ButtonBase } from '@material-ui/core'

export const ButtonPrimary = styled(ButtonBase)({
  padding: '8px',
  background: 'var(--blue)',
  color: '#fff',
  fontSize: '1em',
  borderRadius: '5px',
  '&:hover': {
    background: 'var(--blue-hover)'
  }
})

export const ButtonSecondary = styled(ButtonBase)({
  border: '1px solid var(--blue-light)',
  padding: '8px',
  background: '#fff',
  color: 'var(--blue)',
  fontSize: '1em',
  borderRadius: '5px',
  '&:hover': {
    background: 'var(--blue-hover)'
  }
})

export const ButtonAlert = styled(ButtonBase)({
  
})
