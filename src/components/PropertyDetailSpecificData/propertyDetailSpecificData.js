import React from 'react';
import { Paper, Box, Grid, Typography, makeStyles } from '@material-ui/core';
import { fisicas, espacios, seguridad, amenidades, especiales, entorno, tiempo } from '../../assets/Strings';
import CheckIcon from '@material-ui/icons/Check';
import mapObject from '../../helpers/mapObjects'

const wdExtraLightPurple = '#F7F6FF';
const wdPurpleSubtitle = '#1E0E6F';
const wdRegularBlue = '#303f9f';

const useStyles = makeStyles({
  card: {
    backgroundColor: wdExtraLightPurple,
    borderRadius: 10
  },
  subtitleText: {
    color: wdPurpleSubtitle,
  },
  titleText:{
    color: wdPurpleSubtitle,
    fontWeight:700
  },
  counter: {
    color: wdRegularBlue,
    minWidth: '50px',
    textAlign: 'center',
  }
})

export const PropertyDetailSpecificData = props => {

  //deleting items for not repeat
  const {m2Build, room, bath, parkingSlots, propertyDescription, ...specificData} = props.specificData
  var array_of_specific_data = mapObject(specificData, (keyname, value) => ({name: keyname, value}))
  array_of_specific_data = array_of_specific_data.filter(item => item.value !== 0)
  console.log('array_of_specific_data', array_of_specific_data)
  
  

  /*
    props ========
    specificData = obj with atributes
  */

  const classes = useStyles();

  const features = {
    ...fisicas,
    ...espacios,
    ...seguridad,
    ...amenidades,
    ...especiales,
    ...entorno,
    ...tiempo
  }


  return (
    <React.Fragment>
      <Grid container justifyContent='center' alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' align='center' gutterBottom className={classes.titleText}>Datos Específicos</Typography>
        </Grid>
        {array_of_specific_data.map(item => (
          <Grid key={item.name} item xs={12}  lg={12} xl={6}>
            <Paper className={classes.card} elevation={0}>
                <Box p={1}>
                  <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs={6}>
                      <Typography variant='subtitle2' align='left' className={classes.subtitleText}>{features[item.name] ? features[item.name].name : ''}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='subtitle2' align='left' className={classes.counter}>
                        {typeof item.value === 'string' ? item.value : <CheckIcon />}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
          </Grid>
        ))}
        
       
      </Grid>
    </React.Fragment>
  )
}