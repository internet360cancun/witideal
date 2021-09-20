import React from 'react';
import { Grid, Box, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { MultiToggleButton } from '../MultiToggleButton/multiToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import { Currency } from '../Currency/currency';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { DropdownWithButtons } from '../DropdownWithButtons/dropDownWithButtons';
import { dollarValue } from '../../assets/Strings';

import {
  pAction_es_array,
  habitational_es_array,
  comercial_es_array,
  //credit_es_array,

  action,
  propertyType,
  //credit,

  pAction_es,
  propertyType_es,
  //credit_es

} from '../../assets/Strings';


const wdPurpleSubtitle = '#1E0E6F';

const useStyles = makeStyles(theme => ({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  borderColor: {
    color: '#41B8F9',
    '&.MuiTypography-body1':{
     background:"red"
    }
  }
}));

export function PromoFormGeneralData(props) {
  const classes = useStyles();
  const setAction = selectedAction => {
    props.setProperData({
      ...props.properData,
      action: action[selectedAction]
    })
  }

  const setPropertyType = selectedPropertyType => {
    const {specificData, ...propertyData} = props.properData
    props.setProperData({
      ...propertyData,
      propertyType: propertyType[selectedPropertyType]
    })
    props.setPropertyTypeError(false)
  }

  const setCom = event => {
    props.setProperData({
      ...props.properData,
      sharesCom: event.target.checked
    })
  }

  const setBankSale = event => {
    props.setProperData({
      ...props.properData,
      bankSale: event.target.checked
    })
  }

  const setPrice = inputPrice => {
    if (isNaN(inputPrice) || !inputPrice) return (
      props.setProperData({
        ...props.properData,
        price: null,
        priceMxn: null,
      })
    )
    if (inputPrice < 1000000000) {
      props.setProperData({
        ...props.properData,
        price: parseInt(inputPrice),
        priceMxn: props.properData.currency === 'USD' ? parseInt(inputPrice) * dollarValue : parseInt(inputPrice),
      })
    } else {
      props.setProperData({
        ...props.properData,
        price: 999999999,
        priceMxn: props.properData.currency === 'USD' ? parseInt(999999999) * dollarValue : parseInt(999999999),
      })
    }

  }

  const setLanduse = (selectedLandUse, firstDefaultValue) => {
    console.log('el tipo de propiedad es', firstDefaultValue)
    const {specificData, ...propertyData} = props.properData //delete spesific data
    props.setProperData({
      ...propertyData,
      isCommercial: selectedLandUse, //boolean input
      propertyType: propertyType[firstDefaultValue]
    })
  }

  const handleRadio = event => {
    props.setProperData({
      ...props.properData,
      currency: event.target.value,
      priceMxn: event.target.value === 'USD' ? props.properData.price * dollarValue : props.properData.price,
    })
  }

  return (


    <Grid container justify='center' alignContent='center' spacing={2}>
      {
        props.renderActionAndProperty ?
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant='h6' align='left' className={classes.subtitleText}>
                Selecciona el tipo de operación
                        </Typography>
            </Grid>
            <Grid item xs={12}>
              <MultiToggleButton btns={pAction_es_array} selectedOption={pAction_es[props.properData.action]} setter={setAction} >{pAction_es[props.properData.action]}</MultiToggleButton>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' align='left' className={classes.subtitleText}>
                Selecciona el tipo de inmueble
                            </Typography>
            </Grid>
            <Grid item xs={12}>
              {console.log('esComercial', props.properData.isCommercial)}
              <DropdownWithButtons
                buttons={["Habitacional", "Comercial"]}
                dataA={habitational_es_array}
                dataB={comercial_es_array}
                selectedOption={propertyType_es[props.properData.propertyType]}
                setParentData={setPropertyType}
                buttonsVal={props.properData.isCommercial}
                secondSetter={setLanduse}
                exact
                error={props.propertyTypeError}
              />
            </Grid>
          </React.Fragment> :
          <React.Fragment>
            <Grid item xs={12}>
              <Box p={5}></Box>
            </Grid>
          </React.Fragment>
      }

      <Grid item xs={12}>
        <Typography variant='h6' align='left' className={classes.subtitleText}>
          Escribe el precio
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Currency setter={setPrice} label={'Precio'}>{props.properData.price}</Currency>
      </Grid>
      {/* <MuiThemeProvider theme={theme}> */}
        <Grid item sm={6} md={4}>
          <RadioGroup aria-label="position" name="position" value={props.properData.currency} onChange={handleRadio} row>
            <FormControlLabel
              value="MXN"
              control={<Radio color="primary" className={classes.borderColor} />}
              label="MXN"
              labelPlacement="end"
            />
            <FormControlLabel
              value="USD"
              control={<Radio color="primary" className={classes.borderColor} />}
              label="USD"
              labelPlacement="end"
            />
          </RadioGroup>
        </Grid>
        {/* <Grid item xs={}>
                    <Typography variant='h6' align='left' className={classes.subtitleText}>
                        ¿Aceptas crédito para trabajadores?
                    </Typography>
                </Grid> */}

        <Grid item xs={6}>
          <FormControlLabel
            control={

              <Checkbox
                checked={props.properData.sharesCom !== undefined ? props.properData.sharesCom : true}
                onChange={setCom}
                value={true}
                color="primary"
                className={classes.borderColor}
              />

            }
            label="¿Compartes comisión?"
          />
        </Grid>
        {
          props.properData.action === 'buy' ?
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.properData.bankSale !== undefined ? props.properData.bankSale : true}
                    onChange={setBankSale}
                    value={props.properData.bankSale}
                    color="primary"
                    className={classes.borderColor}
                  />
                }
                label="¿Es remate bancario?"
              />
            </Grid>
            :
            <span />
        }
       {/* </MuiThemeProvider> */}
    </Grid>

  )
}
