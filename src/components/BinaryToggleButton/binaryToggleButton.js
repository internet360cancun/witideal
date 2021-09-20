import React, { useState } from 'react';
import { Grid, Button, makeStyles} from '@material-ui/core';


const wdLightBlue = "#41B8F9";
const useStyles = makeStyles(theme => ({
  wdBtnItem: {
    //borderWidth: 1,,
    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    '@media (max-width:600px)': {
      padding: 4,
    },
    '&:hover': {
      background: "#1E0E6F"
    }
  },
  outlinedButton: {
    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    '@media (max-width:600px)': {
      padding: 4,
    },
  },
  spanStyle: {
    width: '100%',
    textTransform: "none",
    '@media (max-width:600px)': {
      fontSize: 14
    },
  }
}));

export const BinaryToggleButton = props => {

  /*
      props ->
      setter : parent handler to assign value
      defaultValue : initial value assigned by the parent. The same value
      that is being modified by the setter
  */

  const classes = useStyles();

  //const [val,setVal] = useState(props.defaultValue);

  const handleClick = event => {
    props.setter(event.target.id === 'true')
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            className={props.defaultValue ? classes.wdBtnItem : classes.outlinedButton}
            size='large'
            onClick={handleClick}
            fullWidth id='true'
            color='primary'
            variant={props.defaultValue ? 'contained' : 'outlined'}>
            <span className={classes.spanStyle} id='true'>Si</span>
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            className={!props.defaultValue ? classes.wdBtnItem : classes.outlinedButton}
            size='large'
            color='primary'
            onClick={handleClick}
            fullWidth id='false'
            variant={!props.defaultValue ? 'contained' : 'outlined'}>
            <span className={classes.spanStyle} id='false'>No</span>
          </Button>

        </Grid>


      </Grid>
    </React.Fragment>
  )
}

export default BinaryToggleButton
