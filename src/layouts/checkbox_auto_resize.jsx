import { Checkbox, Hidden } from '@material-ui/core'
import React from 'react'

const CheckBoxAutoResize = props => {
  return (
    <>
      <Hidden mdUp>
        <Checkbox size='small' {...props} />
      </Hidden>
      <Hidden smDown>
        <Checkbox {...props} />
      </Hidden>
    </>
  )
}

export default CheckBoxAutoResize
