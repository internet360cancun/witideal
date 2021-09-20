
/**
 * @deprecated
 * @important this modules has been rewrited 
 * **/
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Grid, Paper, Box, Typography, Button, TextField } from '@material-ui/core';
import { MultiToggleButton } from '../MultiToggleButton/multiToggleButton';
import { DropdownWithButtons } from '../DropdownWithButtons/dropDownWithButtons';
import { FilterList, LocationCity } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Currency } from '../Currency/currency';
import { Searchbar } from '../Searchbar/searchbar';
import { FilterTags } from '../FilterTags/filterTags';
import { AdvanceFilters } from '../AdvanceFilters/advanceFilters';
import { LIST } from '../../constants/routes';
import { action,action_array,action_es,action_es_array,propertyType,propertyType_es,habitational_es_array,comercial_es_array,credit,credit_es,credit_es_array,tags} from '../../assets/Strings';

const wdPurpleSubtitle = '#1E0E6F';
const wdLightBlue = '#41B8F9';
const wdGlowBlue = '#32FFD2';
const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
  list: {
    [theme.breakpoints.up('lg')]: {
      width: '50vw'
    },
    [theme.breakpoints.down('md')]: {
      width: '80vw'
    },
  },
  fullList: {
    width: 'auto',
  },
  buttons: {
    borderRadius: 50,
    padding: 15,
    fontSize: 15,
    backgroundColor: wdDarkBlue,
    textTransform: "none",
    fontSize: 17,
    '&:hover':{
      backgroundColor:'#1E0E6F'
    }
  },
  formContainerColor: {
    backgroundColor: 'rgba(65,184,249,0.13)',
    opacity: 13,
  },
  iconButton: {
    paddingRight: 5
  },
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  link: {
    textDecoration: 'none',
  },

  textInput: {
    '& fieldset': {
      borderColor: wdLightBlue,
      borderRadius: 50,

    },
    '&:hover fieldset': {
      borderColor: wdGlowBlue,
    },
    '&.Mui-focused fieldset': {
      borderColor: wdDarkBlue,
    },
  },
  containedButton: {
    backgroundColor: wdDarkBlue,
    textTransform: "none",
    fontSize: 17,
    '&:hover':{
      backgroundColor:'#1E0E6F'
    }
  },
  outlineButton: {
    borderColor: wdLightBlue,
    textTransform: "none",
    color: wdDarkBlue,
    fontSize: 17,
    '&:hover':{
      borderColor:wdLightBlue
    }
  }

}));

export function PropertiesListControls(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [hiddenMenu, setHiddenMenu] = useState({
    advanceFilters: false,
    quickSearch: false,
  })

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!open) {
      setHiddenMenu({
        advanceFilters: false,
        quickSearch: false
      })
    }

    setState(open);
  };

  const [renderAdvanceFilters, setRenderAdvanceFilters] = useState(false);

  // Set action in object

  const setAction = selectedAction => {
    props.setForm({
      ...props.form,
      action: action[selectedAction]
    })
  }

  const setPropertyType = selectedPropertyType => {
    props.setForm({
      ...props.form,
      propertyType: propertyType[selectedPropertyType]
    })
  }

  const setLanduse = (selectedLandUse, firstDefaultValue) => {
    props.setForm({
      ...props.form,
      landUse: selectedLandUse,
      propertyType: firstDefaultValue
    })
  }

  const setMinPrice = selectedPrice => {
    props.setForm({
      ...props.form,
      minPrice: selectedPrice
    })
  }

  const setMaxPrice = selectedPrice => {
    props.setForm({
      ...props.form,
      maxPrice: selectedPrice
    })
  }

  const setAddress = selectedAddress => {
    const new_form = {
      action: props.form.action,
      propertyType:props.form.propertyType,
      minPrice: props.form.minPrice,
      maxPrice: props.form.maxPrice,
      bankSale: props.form.bankSale,
    }
    props.setForm({
      ...new_form,
      ...selectedAddress
    })
    //console.dir(selectedAddress)
  }

  const setCredit = selectedCredit => {
    props.setForm({
      ...props.form,
      credit: credit[selectedCredit]
    })
  }

  const handleAdvanceFilters = () => {
    //setRenderAdvanceFilters(!renderAdvanceFilters);
    //setRenderAdvanceFilters(true);
    setHiddenMenu({
      ...hiddenMenu,
      advanceFilters: true
    })
    setState(true);
  }

  const handleCurrency = event => {
    props.setForm({
      ...props.form,
      currency: event.target.value
    })
  }

  const handleQuickSearch = () => {
    // console.log('quickSearch')
    setHiddenMenu({
      ...hiddenMenu,
      quickSearch: true
    })
    setState(true);
  }

  const deleteTagFromForm = label => {
    let auxObj = props.form
    delete auxObj[label]
    props.setForm({
      ...auxObj
    })
  }

  React.useEffect(() => {
    getFiltersArray();
  }, [])

  React.useEffect(() => {
    props.updatePropertiesWeight()
    getFiltersArray()
  }, [props.form]);



  console.log('advance props filter:::::::', props.form)

  const sideList = side => {
    if (hiddenMenu.quickSearch) {
      return (
        <div
          className={classes.list}
          role="presentation"
        
        >
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} lg={7}>
              <Box p={5}>
                <Grid container justify='center' alignItems='center' spacing={2}>

                  {/* Select Action */}
                  <Grid item xs={12}>
                    <Typography variant='h6' align='left' className={classes.subtitleText}>
                      ¿Qué acción deseas realizar?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <MultiToggleButton btns={pAction_es_array} selectedOption={pAction_es[props.properData.action]} setter={setAction} >{pAction_es[props.properData.action]}</MultiToggleButton> */}
                    <MultiToggleButton
                      btns={action_es_array}
                      setter={setAction}
                      selectedOption={action_es[props.form.action]}
                    />
                  </Grid>

                  {/* Select Property Type */}
                  <Grid item xs={12}>
                    <Typography variant='h6' align='left' className={classes.subtitleText}>
                      ¿Qué tipo de propiedad te interesa?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <DropdownWithButtons
                      buttons={["Habitacional", "Comercial"]}
                      dataA={habitational_es_array}
                      dataB={comercial_es_array}
                      selectedOption={propertyType_es[props.form.propertyType]}
                      setParentData={setPropertyType}
                      secondSetter={setLanduse}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' align='left' className={classes.subtitleText}>
                      ¿Cuál es tu presupuesto?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Currency setter={setMinPrice} label={'Desde'}></Currency>
                  </Grid>
                  <Grid item xs={12}>
                    <Currency setter={setMaxPrice} label={'Hasta'}></Currency>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioGroup aria-label="position" name="position" value={props.form.currency} onChange={handleCurrency} row>
                      <FormControlLabel
                        value="MXN"
                        control={<Radio color="primary" />}
                        label="MXN"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="USD"
                        control={<Radio color="primary" />}
                        label="USD"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant='h6' align='left' className={classes.subtitleText}>
                      ¿Dónde te gustaría buscar?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Searchbar setIsLoading={() => false} getAddress={setAddress}></Searchbar>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Box p={5} className={classes.formContainerColor}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Button
                      className={classes.buttons}
                      variant="contained"
                      size='medium'
                      color='primary'
                      fullWidth={true}
                      onClick={() => {props.handleFetch(); setState(false)}}
                    >
                    <LocationCity className={classes.iconButton}></LocationCity>
                      Mostrar Inmuebles
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      )
    } else if (hiddenMenu.advanceFilters) {
      return (

          <div
            className={classes.list}
            role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
          >
            <Grid container>
              <Grid item xs={12}>
                <AdvanceFilters
                  properData={props.form}
                  setProperData={props.setForm}
                />
              </Grid>
            </Grid>
          </div>

      )
    }


  };

  const getFiltersArray = () => {
    let auxArr = [];
    let index = 0;
    for (var input in props.form) {

      auxArr.push({
        key: index, label: input, value: props.form[input],
        isDeletable: input === 'action' || input === 'propertyType' || input === 'minPrice' || input === 'maxPrice' ? false : true
      })
      index += 1;
    }
    setFilterTags(auxArr);
  }


  return (
    <React.Fragment>
      <Paper elevation={1}>
        <Box pt={3} p={2}>
          <Grid container justify='center' alignItems='center' spacing={2}>
            <Grid item xs={12} lg={8}>
              <FilterTags
                tags={filterTags}
                delAndUpd={deleteTagFromForm}
              />
            </Grid>
            <Grid item xs={6} lg={2}>
              <Button
                size='medium'
                fullWidth
                onClick={handleQuickSearch}
                variant='outlined'
                className={classes.outlineButton}
                color='primary'>Búsqueda Rápida</Button>
            </Grid>
            <Grid item xs={6} lg={2}>
              <Button
                size='medium'
                fullWidth
                onClick={handleAdvanceFilters}
                variant='contained'
                className={classes.containedButton}
                color='primary'>Filtros Avanzados</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Drawer open={state} onClose={toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>

    </React.Fragment>
  );
}


