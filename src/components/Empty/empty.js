import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const Container = styled(Grid)({
  minHeight: '50vh',
})

const Message = styled(Typography)(({theme}) => ({
  color: theme.wdPurpleSubtitle,
}))

const EmptyMessage = (props) => {
  return (
    <Container container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Message variant="h4">
          {props.message}
        </Message>
      </Grid>
    </Container>    
  )
}

export default EmptyMessage
