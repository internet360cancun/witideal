import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  SnackbarContent,
  Grid,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import WarningIcon from "../../assets/warningIcon.png";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  blueText: {
    color: "#1E0E6f",
    fontWeight: 700,
    marginTop: 10,
  },
  greyText: {
    color: "#545454",
  },
  colorButton: {
    background: "#FF9D00",
    marginRight: 15,
    color: "white",
    marginTop: 20,
  },
  cancelButton: {
    border: " 1px solid #E5E5E5",
    color: "#888888",
    marginRight: 20,
    marginTop: 20,
  },
  paper: {
    outline: "none",
    borderLeft: "4px solid #FF9D00",
  },
  root: {
    outline: "none",
    backgroundColor: "white",
    borderLeft: "6px solid #FF9D00",
  },
}));

export function WarningModal(props) {
  const classes = useStyles();
  const modal = (
    <React.Fragment>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}>*/}
          <Box pt={4} pb={4}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <img src={WarningIcon} alt="Advertencia" />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.blueText}
                  align="center"
                  variant="h6"
                >
                  {props.title}
                </Typography>
                <Typography
                  className={classes.greyText}
                  align="center"
                  variant="body2"
                >
                  {props.message}
                </Typography>
                <Typography
                  className={classes.greyText}
                  align="center"
                  variant="body2"
                >
                  {props.alarmText}
                </Typography>
              </Grid>
              {props.buttons ? (
                <Grid item>
                  <Button className={classes.cancelButton}>Cancelar</Button>
                  <Button className={classes.colorButton}>Ok</Button>
                </Grid>
              ) : (
                <span></span>
              )}
            </Grid>
          </Box>
          {/* </Paper>*/}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Snackbar
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={SlideTransition}
      >
        <SnackbarContent className={classes.root} message={modal} />
      </Snackbar>
    </React.Fragment>
  );
}
