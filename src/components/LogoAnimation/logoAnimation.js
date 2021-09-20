import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid } from "@material-ui/core";
import Lottie from "react-lottie";
import animationData from "./jsonData.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer - 1
  }
}));



export function AnimationBackdrop(props) {

    /* 
    props ===========
    toggle = checks if it perform the change 
    buttonText = button text required
    open = boolean, open or close
    handleClose = !open, toggle open
  */

  const classes = useStyles();

  const logoAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      }
    };

    return (
      <Grid item>
        <Lottie options={defaultOptions} height={200} width={200} />
      </Grid>
    );
  };

  return (
    <Grid>
      <Backdrop
        className={classes.backdrop}
        open={props.open}
        onClick={props.handleClose}
      >
        {
        logoAnimation()
        }
      </Backdrop>
    </Grid>
  );
}
