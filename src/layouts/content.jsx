import React from 'react'
import { Grid, Box, Paper } from '@material-ui/core'

const Content = (props) => {
  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item xs={12} lg={10}>
        <Paper elevtion={3} >
          <Box p={3}>
            {props.children}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Content