import { styled } from '@material-ui/core/styles'
import { ButtonBase } from '@material-ui/core'

export const Button = styled(ButtonBase)({
  color: '#fff',
  background: 'var(--blue)',
  padding: '10px',
  fontWeight: 'bold',
  borderRadius: '8px',
  '&:hover': {
    background: 'var(--blue-hover)',
  }
})

export default Button
