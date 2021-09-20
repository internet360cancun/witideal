/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import { Drawer, Grid, Box, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core'
import { action ,action_es,action_es_array,propertyType,propertyType_es,habitational_es_array,comercial_es_array} from '../../assets/Strings';
import { MultiToggleButton } from '../MultiToggleButton/multiToggleButton'
import { DropdownWithButtons } from '../DropdownWithButtons/dropDownWithButtons'
import { Searchbar } from '../Searchbar/searchbar'
import getSpecificSections from '../../helpers/getSpecificSections'
import mapObjects from '../../helpers/mapObjects'
import currencyParser from '../../helpers/currencyParser'
import { setAlert } from '../Alert/alert'
import analytics from 'react-ga'
import  useSession from '../../Hooks/useSession'
import { isProduction } from '../../constants/globalConstraints'
import BinaryToggleButton from '../BinaryToggleButton/binaryToggleButton'
import TextFiledAutoResize from '../../layouts/textfield_auto_resize'

const QuickSearch = (props) => {
  const spesific_sections = getSpecificSections()
  const [filters, setFilters] = useState(props.filters || {})
  const session = useSession()
  
  //filters to persist and remove spesific sections
  var array_of_filters = mapObjects(filters, (keyname, value, index) => ({keyname, value}))
  array_of_filters = array_of_filters.filter(item => !spesific_sections.includes(item.keyname))
  const filter_to_persist = {}
  array_of_filters.forEach(item => { filter_to_persist[item.keyname] = item.value  })
  
  useEffect(() => {
    setFilters(props.filters)
  },[JSON.stringify(props.filters)])
 
 
  const setAction = (selectedAction) => {
    setFilters({
      ...filters,
      action: action[selectedAction],
      bankSale: false
    })
  }

  const setExcludeBankSale = value => {
    setFilters({
      ...filters,
      bankSale: value
    })
  }

  const setPropertyType = selectedPropertyType => {
    setFilters({
      ...filter_to_persist,
      propertyType: propertyType[selectedPropertyType]
    })
  }

  const setLanduse = (selectedLandUse, firstDefaultValue) => {
    setFilters({
      ...filter_to_persist,
      landUse: selectedLandUse,
      propertyType: propertyType[firstDefaultValue]
    })
  }

  const setMinPrice = event => {
    const value = currencyParser.toNumber(event.target.value)
    if (!value) {
      const {minPrice, ...others} = filters // delete key if not exist
      setFilters(others)
    } else {
      setFilters({
        ...filters,
        minPrice: value
      })
    }
  }

  const setMaxPrice = event => {
    const value = currencyParser.toNumber(event.target.value)
    if (!value) {
      const {maxPrice, ...others} = filters // delete key if not exist
      setFilters(others)
    } else {
      setFilters({
        ...filters,
        maxPrice: value
      })
    }
  }

  const handleCurrency = (event) => {
    setFilters({
      ...filters,
      currency: event.target.value,
    })
  }

  const setAddress = (selectedAddress) => {
    const valuesToPersist = {
      action: filters.action,
      propertyType:filters.propertyType,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      bankSale: filters.bankSale,
      currency: filters.currency
    }
    setFilters({ ...valuesToPersist, ...selectedAddress })
  }

  const handleSearch = () => {
    const { minPrice, maxPrice } = filters

    // invalid price
    if (!isNaN(parseInt(minPrice)) && !isNaN(parseInt(maxPrice)) && parseInt(minPrice) >= parseInt(maxPrice))
    return setAlert(null, ' ', 'El presupuesto no es válido')


    props.handleClose()
    props.handleFetch(filters)
    props.setFilters(filters)
    if (isProduction) {
      analytics.event({
        category: session.SesState && session.uId ? session.uId : 'anonymous',
        action: 'search property',
        label: `${filters.action} ${filters.propertyType}`
      })
    }
  }

  return (
    <Drawer open={props.open} onClose={props.handleClose}>
      <Box pt={2} pb={2}>
        <GridContaoner container justify="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={10}>
            <Section>
              <Title>¿Qué acción desea realizar?</Title>
              <MultiToggleButton
                xs={6}
                btns={action_es_array}
                setter={setAction}
                selectedOption={action_es[filters.action]}
              />
            </Section>
            <Section>
              <Title>¿Qué tipo de propiedad te interesa?</Title>
              <DropdownWithButtons
                xs={6}
                buttons={["Habitacional", "Comercial"]}
                dataA={habitational_es_array}
                dataB={comercial_es_array}
                selectedOption={propertyType_es[filters.propertyType]}
                setParentData={setPropertyType}
                secondSetter={setLanduse}
                buttonsVal={!habitational_es_array.includes(propertyType_es[filters.propertyType])}
              />
            </Section>
            <Section>
              <Title>¿Cuál es tu presupuesto? <span>opcional</span></Title>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextFieldStyled
                    onChange={setMinPrice}
                    fullWidth
                    label='Desde'
                    variant='outlined'
                    value={currencyParser.toCurrency(filters.minPrice) || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldStyled
                    onChange={setMaxPrice}
                    fullWidth
                    label='Hasta'
                    variant='outlined'
                    value={currencyParser.toCurrency(filters.maxPrice) || ''}
                  />
                </Grid>
              </Grid>
              <RadioGroup aria-label="position" name="position" value={filters.currency} onChange={handleCurrency} row>
                <FormControlLabel
                  value="MXN"
                  control={<RadioStyle color="primary" />}
                  label="MXN"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="USD"
                  control={<RadioStyle color="primary" />}
                  label="USD"
                  labelPlacement="end"
                />
              </RadioGroup>                
            </Section>
            <Section>
              <Title>¿Dónde te gustaría buscar?</Title>
              <Searchbar setIsLoading={() => false} getAddress={setAddress}></Searchbar>
            </Section>
            {filters.action === 'buy' && (
              <Section>
                <Title>Excluir remate bancario</Title>
                <BinaryToggleButton
                  defaultValue={filters.bankSale || false }
                  setter={setExcludeBankSale}
                />
              </Section>
            )}
          </Grid>
        </GridContaoner>
      </Box>
    
        <ActionContainer pr={2}pl={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant='outlined' color='primary' fullWidth onClick={props.handleClose} style={{textTransform: 'none', borderRadius: '50px'}}>
                Cerrar búsqueda
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='primary' fullWidth onClick={handleSearch} style={{textTransform: 'none', borderRadius: '50px'}}>
                Mostrar inmuebles
              </Button>
            </Grid>
          </Grid>
        </ActionContainer>
     
    </Drawer>
  )
}

//only styles

const ActionContainer = styled(Box)({
  zIndex: 10,
  backgroundColor: '#fff',
  boxShadow: '-5px 0 10px 0px #5f5f5f',
  padding: '15px',
  position: 'sticky',
  bottom: 0,
})



const GridContaoner = styled(Grid)({
  boxSizing: 'border-box',
  maxWidth: '450px',
})

const Section = styled('div')(({theme}) => ({
  color: theme.colors.blue_black,
  textAlign: 'center',
  marginBottom: '10px'
}))

const Title = styled(Typography)({
  marginBottom: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '1.1em',
  '@media (max-width:600px)': {
    fontSize: '1em',
  },
  '& span': {
    fontSize: '.9em',
    color: 'gray',
    fontWeight: 'normal'
  }
})



const TextFieldStyled = styled(TextFiledAutoResize)(({theme}) => ({
  marginBottom: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.colors.blue_light,
      borderRadius: 50,
    },
    '&:hover fieldset': {
      borderColor: theme.colors.blue,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.colors.blue,
    },
  },
}))
const RadioStyle = styled(Radio)(({theme}) => ({
   color:theme.colors.blue_light
}))

export default QuickSearch