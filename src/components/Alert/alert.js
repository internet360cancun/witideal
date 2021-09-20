import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContent,Grid, Button, Box, Typography } from "@material-ui/core";
import WarningIcon from '../../assets/warningIcon.png'
import InformationIcon from '../../assets/informationIcon.svg'
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import SuccessIcon from '../../assets/successIcon.png'
import ErrorIcon from '../../assets/errorIcon.svg';

const warning = makeStyles(theme => ({
  blueText: {
    color: '#1E0E6f',
    fontWeight: 700,
    marginTop: 10

  },
  greyText: {
    color: '#545454',
    fontSize: '1.3em',
    maxWidth: '500px',
    margin: 'auto'

  },
  colorButton: {
    background: '#FF9D00',
    marginRight: 15,
    color: 'white',
    marginTop: 20,
    '&:hover':{
      backgroundColor: '#FF9D00'
    }
  },
  cancelButton: {
    border: ' 1px solid #E5E5E5',
    color: '#888888',
    marginRight: 20,
    marginTop: 20
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    backgroundColor: "white",
    borderLeft: '6px solid #FF9D00',
  }

}));

const information = makeStyles(theme => ({
  blueText: {
    color: '#1E0E6f',
    fontWeight: 700,
    marginTop: 10

  },
  greyText: {
    color: '#545454',
    fontSize: '1.3em',
    maxWidth: '500px',
    margin: 'auto'

  },
  colorButton: {
    background: '#00ABE9',
    marginRight: 15,
    color: 'white',
    marginTop: 20

  },
  cancelButton: {
    border: ' 1px solid #E5E5E5',
    color: '#888888',
    marginRight: 20,
    marginTop: 20
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    borderLeft: '4px solid #00ABE9',
    backgroundColor: "white"
  }

}));

const success = makeStyles(theme => ({
  modal: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",

  },
  greyText: {
    color: '#545454',
    fontSize: '1.3em',
    maxWidth: '500px',
    margin: 'auto'
  },
  blueText: {
      color: '#1E0E6f',
      fontWeight: 700,
  },

  button: {
      color: '#D8D8D8',
      marginLeft: 40,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    borderLeft: '4px solid #00C66D',
    backgroundColor: "white",
  }


}));

const error = makeStyles(theme => ({
  modal: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",

  },
  greyText: {
    color: '#545454',
    fontSize: '1.3em',
    maxWidth: '500px',
    margin: 'auto'
  },
  blueText: {
      color: '#1E0E6f',
      fontWeight: 700,
  },

  button: {
      color: '#D8D8D8',
      marginLeft: 40,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    borderLeft: '4px solid red',
    backgroundColor: "white",
  }
}));


function WarningModal(props) {

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  const [nonuse, update] = useState({})

  ModalController.update = update;

  const handleCancel = () => {
    if (ModalController.handleClose) ModalController.handleClose()
    ModalController.setModal()
  }

  if (ModalController.type === 'warning'){
    var classes = warning()
    var icon = WarningIcon
  } else if (ModalController.type === 'success') {
    var classes = success()
    var icon =  SuccessIcon 
  } else if (ModalController.type === 'error') {
    var classes = error()
    var icon =  ErrorIcon
  } else {
    var classes = information()
    var icon = InformationIcon
  }

  if (!ModalController.open) return null

  
  return (
    <React.Fragment>
      <Snackbar
        open={ModalController.open}
      
        TransitionComponent={SlideTransition}
      >
        <SnackbarContent
          className={classes.root}
          message={(
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} >
                <Box pt={4} pb={4}>
                  <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12}>
                      <img src={icon} alt='Advertencia' />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.blueText} align='center' variant="h6">{ModalController.title}</Typography>
                      <Typography className={classes.greyText} align='center' variant="body1">{ModalController.message}</Typography>
                    </Grid>
                    {ModalController.handleOk && (
                      <Grid item sx={12}>
                        <Button className={classes.cancelButton} onClick={handleCancel} >{ModalController.buttonCloseMssage || 'Cancelar'}</Button>
                        <Button className={classes.colorButton} onClick={() => { ModalController.handleOk(); ModalController.setModal()}} >{ModalController.buttonMessage}</Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          )}
        />
      </Snackbar>
    </React.Fragment>
  );
}

const ModalController = {
  setModal: (handleOk, title, message, type = 'warning', buttonMessage = 'OK', handleClose = null, buttonCloseMssage = null) => {
    if (ModalController.message === message && ModalController.type === type && ModalController.open) return false
    if (handleOk === null) setTimeout(() => {
      ModalController.setModal()
    }, 4000);

    if (handleClose) ModalController.handleClose = handleClose
    else ModalController.handleClose = null

    if (title && message){
      ModalController.handleOk = handleOk
      ModalController.title = title
      ModalController.message = message
      ModalController.open = true
      ModalController.type = type
      ModalController.buttonMessage = buttonMessage
      ModalController.buttonCloseMssage = buttonCloseMssage
    } else {
      ModalController.handleOk = () => {}
      ModalController.title = ''
      ModalController.message = ''
      ModalController.open = false
      ModalController.type = 'warning'
      ModalController.buttonMessage = 'OK'
    }
    ModalController.update({})
  }, 
  Component: WarningModal
}
export const setAlert = ModalController.setModal

export default ModalController