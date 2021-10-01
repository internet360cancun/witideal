import React, { useState, Fragment, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, makeStyles, Button, CircularProgress, styled } from '@material-ui/core';
import Background from '../../assets/background_landing.png';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { isEmailExist } from '../../firebase/user'
import { ErrorModal } from '../ErrorModal/errorModal'
import { Check } from '@material-ui/icons'
import useSession from '../../Hooks/useSession'
import { Redirect } from 'react-router-dom'
import Head from '../head'

const wdDarkBlue = '#1E0E6F';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    paddingTop: 180,
    paddingBottom: 50
  },
  typeTitle: {
    fontWeight: 700,
    color:"#3F19F9"
  },
  typeSubtitle: {
    color: wdDarkBlue,
    fontWeight: 700
  },
  restoreBtn: {
    borderRadius:50,
    backgroundColor: '#3F19F9',
    color: "white",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "#2c11ae"
    }
  }
}));

const CheckStyled = styled(Check)({
  background: '#00c66d',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  color: '#fff',
  padding: '10px',
})

export function RestorePassword() {
  const session = useSession()
  const classes = useStyles();
  const [view, setView] = useState('form')
  const [Email, setEmail] = useState('')
  const [errorModal, setErrorModal] = useState({ open: false })


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const restorePass = async () => {
    setView('loading')
    const result = await isEmailExist(Email)
    if (!result) {
      setView('form')
      setErrorModal({open: true, alarmText: 'Correo  no encontrado'})
      return false
    } else {
      firebase.auth().sendPasswordResetEmail(Email).then(function () {
        setView('success')
        console.log('Enviado')
      }).catch(function (error) {
        setView('form')
        setErrorModal({open: true, alarmText: 'Intentalo de nuevo mas tarde'})
      })
    }
  }

  if(session.SesState) return (<Redirect to='/MyProfile'/>)

  return (
    <React.Fragment>
      <Head title='Recuperar contraseña' />
      <Box p={{ xs: 2, sm: 5, md: 6 }} className={classes.mainContainer}>
        <Grid container justify='center'>
          <Grid item xs={12} md={5} lg={5} xl={4}>
            <Paper elevation={5}>
              <Box p={{ xs: 2, sm: 5, md: 5, lg: 12 }}>
                <Grid container justify='center' spacing={2} style={{minHeight: '200px'}} alignItems='center'>
                  {view === 'loading' && (
                    <CircularProgress />
                  )}
                  {view === 'form' && (
                    <Fragment>
                      <Grid item sm={12}>
                        <Typography variant='h5' className={classes.typeTitle}>Recuperar contraseña</Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <Typography color="primary" className={classes.typeSubtitle}>Escribe tu correo electrónico para recuperar tu contraseña </Typography>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <TextField
                          id="user-email"
                          label="Correo Electrónico"
                          className={classes.textField}
                          type="email"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => { setEmail(e.target.value) }}
                          margin="normal"
                          variant="outlined"
                          fullWidth={true}
                          required
                        />
                      </Grid>

                      <Grid item sm={12}>
                        <Button
                          className={classes.restoreBtn}
                          onClick={restorePass}
                          fullWidth={true}
                          variant='contained'
                          size='large'>Recuperar Contraseña</Button>
                      </Grid>
                    </Fragment>
                  )}
                  {view === 'success' && (
                    <>
                      <Grid item xs={12}>
                        <CheckStyled />
                      </Grid>
                      <Grid item xs={12}>
                      <Typography variant='h4' style={{ color: 'var(--blue)', marginBottom: '20px' }}>
                        ¡Muy Bien!
                      </Typography>
                        <Typography variant='h6'>
                          Se ha enviado un correo a tu cuenta de correo. Por favor, revísalo para reestablecer tu contraseña.
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
      </Box>
      <ErrorModal
        open={errorModal.open}
        alarmText={errorModal.alarmText}
        handleClose={() => setErrorModal({...errorModal, open: false})}
      />
    </React.Fragment>
  )
}