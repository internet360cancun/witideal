import React from 'react'
import { TextField, Hidden, styled } from '@material-ui/core'

const TextFieldAutoResize = props => (
  <>
    <Hidden smUp>
      <STyledTextFiled size='small' {...props} />
    </Hidden>
    <Hidden xsDown>
      <TextField {...props} />
    </Hidden>
  </>
)

const STyledTextFiled = styled(TextField)({
  '& .MuiOutlinedInput-inputMarginDense': {
    paddingTop: '5.5px',
    paddingBottom: '10.5px'
  }
})

export default TextFieldAutoResize
