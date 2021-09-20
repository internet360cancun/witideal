import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Grid, Button, Box, Typography, SnackbarContent, Paper } from "@material-ui/core";
import InformationIcon from '../../assets/informationIcon.svg'
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  blueText: {
    color: '#1E0E6f',
    fontWeight: 700,
    marginTop: 10

  },
  greyText: {
    color: '#545454'
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
  paper: {
    outline: 'none',
    borderLeft: '4px solid #00ABE9'
  },
  root: {
    outline: 'none',
    borderLeft: '4px solid #00ABE9',
    backgroundColor: "white"
  }

}));
export default function InformationModal(props) {

  /* 
    props ===========
    alarmText = string, text to be rendered
    buttons = boolean, if true render [cancel] and [ok] else render span
    open = boolean, open or close
    handleClose = !open, toggle open
  */
 
  const classes = useStyles();


  const modal = (<Box p={{ xs: 3 }}>
    <Grid container justify="center" alignItems="center" >

      <Grid item xs={12}>

        {/*<Paper className={classes.paper}>*/}
        <Box p={2} pt={4} pb={4}>
          <Grid container justify='center' alignItems='center'>
            <Grid item >
              <img src={InformationIcon} alt='Advertencia' />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.blueText} align='center' variant="h6">Información</Typography>
              <Typography className={classes.greyText} align='center' variant="body2">{props.alarmText}</Typography>
            </Grid>

            {
              props.buttons ?
                <Grid item>
                  <Button className={classes.cancelButton}>Cancelar</Button>
                  <Button className={classes.colorButton}>Ver</Button>
                </Grid>
                :
                <span></span>
            }
          </Grid>

        </Box>
        {/*</Paper>*/}

      </Grid>
    </Grid>
  </Box>)
  return (
    <React.Fragment>
      <Snackbar
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={SlideTransition}
      >

        <SnackbarContent
          className={classes.root}
          message={modal}
        />
      </Snackbar>

    </React.Fragment>
  );
}
