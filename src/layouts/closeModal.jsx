import { IconButton, styled} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'

const IconButtonStyled = styled(IconButton)({
  position: "absolute",
  top: '10px',
  right: '10px'
})

const CloseModal = (props) => {
  return (
    <IconButtonStyled {...props}>
      <Close />
    </IconButtonStyled>
  )
}

export default CloseModal


