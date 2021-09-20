import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const colorText = "#1E0E6F";
const colorDateText = "#707070";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 3),
    borderLeft: props => props.borderLefth,
    borderRadius: 10,
  },

  boldText: {
    color: props => props.colorType,
    fontWeight: 700
  },
  generalText: {
    color: colorText,
    minHeight: '50px'
  },
  dateText: {
    color: colorDateText
  }
}));

const MovementCard = (props) => {

  const propsStyle = {
    borderLefth: props.type === 'add' ? "10px solid #32ffd2" :  props.type === 'sub' ? "10px solid #1e0e6f" : "10px solid #3F19F9",
    colorType: props.type === 'add' ? '#32ffd2' : props.type === 'sub' ? '#1e0e6f' : '#3F19F9'
  }
  
  const classes = useStyles(propsStyle);

  return (
    <React.Fragment>
      <Grid item xs={12} md={7}>
        <Paper className={classes.paper} type={props.type} >
          <Grid container justify="center" alignItems="center" >
            <Grid item xs={6} fz={1}>
              <Typography align="left" className={classes.dateText} variant="body1">{props.date}</Typography>
            </Grid>
            <Grid item xs={6} fz={1}>
              <Typography align="right" className={classes.boldText} variant="body1">{props.type === 'add' ? 'Abono' : props.type === 'sub' ? 'Consumo' : 'Promoción' }</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" className={classes.generalText} variant="body2">{props.movement}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

export default MovementCard