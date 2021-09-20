import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField, SnackbarContent } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",

  },
  greyText: {
    color: '#545454'
  },
  title: {
    fontWeight: 700
  },
  button: {
    color: '#D8D8D8',
    marginLeft: 40,
  },
  buttonSendSMS: {
    marginBottom: '10px',
    borderRadius: 200,
    background: "#3F19F9",
    color: "white",
    '&:hover': {
      background: '#1E0E6F'
    }
  },
  paper: {
    outline: 'none',
    borderLeft: '4px solid #D8D8D8',
    '& img': {
      marginRight: 20
    }
  },
  snackbarContent: {
    outline: 'none',
    backgroundColor: "white",
    color: '#1E0E6f',
    borderLeft: '6px solid #1E0E6f',
    padding: theme.spacing(3, 0, 3, 0)
  },
  snackbarContainer: {
    top: 0
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41B8F9',
      },
      '&:hover fieldset': {
        borderColor: '#3F19F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: wdDarkBlue,
      },
    }
  },

}));
export function VeryModal(props) {
  const [view, setView] = useState('confirm')
  /* 
  props ===========
  alarmText = string, text to be rendered
  buttons = boolean, if true render [cancel] and [ok] else render span
  open = boolean, open or close
  handleClose = !open, toggle open
*/
  const classes = useStyles();

  const onUpdateNumber = async event => {
    setView('confirm')
    const result = await props.updateNumber()
    console.log('result to update', result)
    if (!result) setView('changeNumber')
  }

  const onClickChangeNumber = event => {
    setView('changeNumber')
  }
  


  const modal = (
    <>
      {view === 'confirm' && (
        <Grid container justify="center" alignItems="center" >
          <Grid item xs={10}>
            <Grid container justify='center' alignItems='center' spacing={1}>
              <Grid item xs={11} md={10}>
                <Typography className={classes.title} gutterBottom align='center' variant="h5">Ya casi terminas !</Typography>
                <Typography gutterBottom align='center' variant="subtitle1">Verifica tu celular. Revisa tus mensajes SMS y escribe el código que recibiste.</Typography>
              </Grid>
              <Grid item xs={11} md={6} >
                <TextField
                  className={classes.textField}
                  autoFocus
                  id="veriCode"
                  label="Código de Verificación"
                  type="number"
                  value={props.code}
                  margin='normal'
                  onChange={props.setCode}
                  fullWidth
                  variant='outlined'
                />
                <Button className={classes.buttonSendSMS} variant='contained' color='primary' id="btn_resend" fullWidth={true}> Reenviar SMS </Button>
                <Button onClick={onClickChangeNumber} className={classes.buttonSendSMS} variant='contained' color='primary' id="btn_resend" fullWidth={true}> Cambiar número </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {view !== 'confirm' && (
        <Grid container justify="center" alignItems="center" >
          <Grid item xs={10}>
            <Grid container justify='center' alignItems='center' spacing={1}>
              <Grid item xs={11} md={10}>
                <Typography className={classes.title} gutterBottom align='center' variant="h5">Nuevo número</Typography>
              </Grid>
              <Grid item xs={11} md={6} >
                <TextField
                  className={classes.textField}
                  autoFocus
                  id="user-cellphone"
                  label="Número"
                  type="number"
                  value={props.number}
                  margin='normal'
                  onChange={props.setNumber}
                  fullWidth
                  variant='outlined'
                  name='phone'
                />
                <Button onClick={onUpdateNumber}className={classes.buttonSendSMS} variant='contained' color='primary' id="btn_resend" fullWidth={true}> Guardar </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )

  return (
    <React.Fragment>
      <Snackbar
        open={props.open}
        onClose={props.handleClose}
        className={classes.snackbarContainer}
        TransitionComponent={SlideTransition}
      >
        <SnackbarContent
          className={classes.snackbarContent}
          message={modal}
        />
      </Snackbar>
    </React.Fragment>
  );
}
