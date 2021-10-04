/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/searchbar';
import { Grid, TextField, Typography, CircularProgress, Box, MuiThemeProvider, createTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',
    },
  },
});
const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
  inputForm: {
    marginBottom: 10,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41B8F9',
        borderRadius: 30,
      },
      '&:hover fieldset': {
        borderColor: '#3F19F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: wdDarkBlue,
      },
    }
  },
  loader: {
    zIndex: 3,
    color: "#3F19F9"
  },
  title: {
    color: "#1E0E6F"
  }
}));


export function PromoFormLocation(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(<span></span>);


  useEffect(() => {
    if (isLoading) {
      setLoader(
        <Box pt={10} pb={10}>
          <CircularProgress className={classes.loader} />
        </Box>
      )
    }

  }, [isLoading])


  const getAddress = (addressData) => {


    let newKeys = Object.keys(addressData),
      oldKeys = Object.keys(props.properData),
      completeKeys = ['int_number', 'sublocality_level_1', 'locality', 'administrative_area_level_2', 'administrative_area_level_1', 'country', 'postal_code', 'administrative_area_level_2_3', 'street_number', 'route']

    completeKeys.forEach(key => {
      if (oldKeys.includes(key) && !newKeys.includes(key)) {
        let auxObj = props.properData
        delete auxObj[key]
        props.setProperData(() => { return auxObj })
      }
    });

    let mergedObj = { ...props.properData, ...addressData }
    if (mergedObj.location !== undefined) delete mergedObj.location;
    props.setProperData(mergedObj)
  }

  const handleChange = e => {
    setExactLoc(!ExactLoc)
    props.setProperData({
      ...props.properData,
      isExactLocation: !ExactLoc
    })
  }

  const handleInput = e => {
    props.setProperData({
      ...props.properData,
      [e.target.name]: e.target.value,
    })
  }


  const [MapData, setMapData] = useState({
    location: {
      lat: props.properData.lat || 19.3739432,
      lng: props.properData.lng || -99.17390759999999
    },
    zoom: 14,
  })

  const [ExactLoc, setExactLoc] = useState(props.properData.isExactLocation);

  const handleDrag = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    props.setProperData({ ...props.properData, lat: e.latLng.lat(), lng: e.latLng.lng() })
    setMapData({ ...MapData, location: latLng })
  }



  return (
    <React.Fragment>
      <Box pb={10}>

        <Grid container spacing={6} justify='center' alignContent='center'>
          <Grid item md={12}>
            <Box pt={10}>
              <Typography className={classes.title} align='left' variant='h6'>Escribe la dirección de tu inmueble en el buscador.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Searchbar setIsLoading={setIsLoading} getNewPos={setMapData} getAddress={getAddress} />
          </Grid>

          {(props.properData.sublocality_level_1 || props.properData.administrative_area_level_1) && !isLoading ?
              <React.Fragment>
                <Grid item xs={12} >
                  <Grid container justify='flex-end'>
                    <MuiThemeProvider theme={theme}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!ExactLoc}
                            onChange={handleChange}
                            value="approximate"
                            color="primary"
                          />
                        }
                        label="Ubicación Apróximada"
                      />
                    </MuiThemeProvider>
                  </Grid>

                </Grid>
                <Grid item md={5} >
                  <TextField fullWidth value={props.properData.route !== undefined ? props.properData.route : ''}
                    label='Calle'
                    variant='outlined'
                    className={classes.inputForm}
                    name="route"
                    onChange={handleInput}>
                  </TextField>
                  <TextField fullWidth value={props.properData.street_number !== undefined ? props.properData.street_number : ''}
                    label='Número Ext.'
                    variant='outlined'
                    className={classes.inputForm}
                    name="street_number"
                    onChange={handleInput}>
                  </TextField>
                  <TextField fullWidth value={props.properData.int_number !== undefined ? props.properData.int_number : ''}
                    label='Número Int.'
                    variant='outlined'
                    className={classes.inputForm}
                    name="int_number"
                    onChange={handleInput}>
                  </TextField>
                  <TextField fullWidth value={props.properData.sublocality_level_1 !== undefined ? props.properData.sublocality_level_1 : ''} disabled
                    label='Colonia'
                    variant='outlined'
                    name='sublocality_level_1'
                    className={classes.inputForm}>
                  </TextField>
                  <TextField fullWidth value={props.properData.administrative_area_level_2_3 !== undefined ? props.properData.administrative_area_level_2_3 : ''} disabled
                    label='Municipio/Alcaldía'
                    variant='outlined'
                    name='administrative_area_level_2_3'
                    className={classes.inputForm}>
                  </TextField>
                  <TextField fullWidth value={props.properData.postal_code !== undefined ? props.properData.postal_code : ''}
                    label='C.P.'
                    name="postal_code"
                    variant='outlined'
                    className={classes.inputForm}
                    onChange={handleInput}
                    onInput={e => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '')
                    }}
                  >
                  </TextField>
                  <TextField fullWidth value={props.properData.locality !== undefined ? props.properData.locality : ''} disabled
                    label='Ciudad'
                    variant='outlined'
                    name='locality'
                    className={classes.inputForm}>
                  </TextField>
                  <TextField fullWidth value={props.properData.administrative_area_level_1 !== undefined ? props.properData.administrative_area_level_1 : ''} disabled
                    label='Estado'
                    variant='outlined'
                    name='administrative_area_level_1'
                    className={classes.inputForm}>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={7}>
                  <GoogleMap center={MapData.location} zoom={MapData.zoom} mapContainerStyle={{ 'width': '100%', 'height': '350px' }} >
                    {ExactLoc && (
                      <Marker 
                        draggable={true}
                        position={MapData.location}
                        onDragEnd={handleDrag} 
                      />
                    )}
                    {!ExactLoc && (
                      <Circle radius={250}
                        options={{ fillColor: '#3CB8F9', strokeOpacity: 0 }}
                        draggable={true}
                        onDragEnd={handleDrag}
                        center={MapData.location}
                      />
                    )}
                  </GoogleMap>
                </Grid>
              </React.Fragment> :
              <React.Fragment>
                {loader}
              </React.Fragment>
          }
        </Grid>
      </Box>
    </React.Fragment>
  )
}