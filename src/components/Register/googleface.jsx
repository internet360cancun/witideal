import React, { Fragment } from 'react'
import { Grid, Button, Divider, Typography } from '@material-ui/core'
import useSession from '../../Hooks/useSession'
import Google from '../../assets/google.svg';
import useStyles from './styles'

const GoogleFace = (props) => {
  const session = useSession()
  const classes = useStyles()
  console.log('session.SesState,', session.SesState)

  if (props.federated) return null
  
  return (
    <Fragment>
      <Grid item xs={12}>
      <Button
        onClick={props.handleLogInG}
        className={classes.buttonGoogle}
        fullWidth={true}
        variant='outlined'
        size='large'>
        <img className={classes.logoSocial} src={Google} alt='google_icon' /> Continuar con Google
      </Button>
      </Grid>
      <Grid item xs={5}>
        <Divider />
      </Grid>
      <Grid item xs={2}>
        <Typography color="primary" className={classes.typeSubtitle} align='center'> o </Typography>
      </Grid>
      <Grid item xs={5}>
        <Divider />
      </Grid>
    </Fragment>
  )
}

export default GoogleFace

