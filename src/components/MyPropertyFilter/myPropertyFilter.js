import React, {  Fragment } from 'react';
import { styled} from '@material-ui/core/styles'
import { Box, Grid, Button, MenuItem, FormControl, Select, TextField, RadioGroup, Radio, FormControlLabel, Typography } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons';
import mapObject from '../../helpers/mapObjects'
import Types from '../../helpers/types'

const types = Types('promoter')

const transform = (data) => {
  if (data === null) return ""
  if (data === false) return "0"
  if (data === true) return "1"
  if (data === "") return null
  if (data === "0") return false
  if (data === "1") return true
  return data
}

const transformNum = (string) => {
  if (string === null) return ""
  if (string === "") return null
  let stringParsed = string
  stringParsed = stringParsed.replace(/,/g, '')
  stringParsed = stringParsed.replace('$', '')
  stringParsed = stringParsed.replace(' ', '')
  if (stringParsed === "") return null
  stringParsed = stringParsed > 99999999 ? 99999999 : parseInt(stringParsed)
  return stringParsed
}

const transformNumReverse = (string) => {
  if (string === null) return ""
  let stringParsed = string.toString();
  stringParsed = stringParsed.replace(/,/g, '')
  stringParsed = stringParsed.replace('$', '')
  stringParsed = stringParsed.replace(/[a-zA-Z]/g, '')
  stringParsed = stringParsed.replace(' ', '')
  stringParsed = parseInt(stringParsed)
  stringParsed = stringParsed > 99999999 ? 99999999 : stringParsed
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumSignificantDigits: 9
  })
  stringParsed = formatter.format(stringParsed)
  return stringParsed.length > 0 ? `$ ${stringParsed}` : ""
}


//styles 
// const Container = styled(Paper)({
//   minHeight: '100vh',
//   position: 'fixed',
//   width: '100%',
//   maxWidth: '420px',
//   zIndex: 1200,
//   background: '#fff',
//   boxSizing: 'border-box',
// })

// const Header = styled(Grid)({
//   background: '#fff'
// })

// const BackgroundTransparent = styled('div')({

//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   position: "fixed",
//   width: "100%",
//   height: "100%",
//   zIndex: 1200
// })

const ButtonHeader = styled(Button)({
  width: '100%',
  padding: '20px 0px'
})

const Secctions = styled(Box)(({ theme }) => ({
  padding: '15px',
  borderColor: theme.wdPurpleSubtitle,
  borderBottom: '1px dashed #1E0E6F',
}))

const FormControllerStyled = styled(FormControl)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#41B8F9',
    },
    '&:hover fieldset': {
      borderColor: '#3F19F9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3F19F9',
    },
  },
})

const SelectStyled = styled(Select)(({ theme }) => ({
  borderRadius: '20px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.wdLightBlue,
    borderWidth: '1px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px'
  },

}))

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.wdLightBlue,
    borderWidth: '1px',
    padding: '8px'
  },
  '& label': {
    transform: 'translate(33px, 11px) scale(1)',
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px'
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: '#3F19F9'
  },
}))

const SectionText = styled(Typography)(({ theme }) => ({
  color: theme.wdPurpleSubtitle,
  textAlign: "left",
  fontWeight: "bold",
  marginBottom: "10px",

}))

const FormControlLabelStyled = styled(FormControlLabel)({
  width: '32%',
  boxSizing: 'border-box',
  '& .MuiTypography-body1': {
    fontSize: '.8em'
  },
  ['@media (max-width:400px)']: {
    width: 'auto'
  }

})
const StyleButton = styled(Button)({
  backgroundColor: '#3F19F9',
  color: "white",
  textTransform: "none",
  '&:hover': {
    backgroundColor: "#1E0E6F"
  }
})
const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: theme.wdLightBlue,
  textTransform: "none",
  color: '#3F19F9',
  '&:hover': {
    borderColor: '#3F19F9'
  }
}))

const RadioColor = styled(Radio)({
  color: '#41B8F9'
})


const SelectComponet = (props) => (
  <FormControllerStyled variant="outlined">
    <SelectStyled value={props.value} onChange={props.handleChange} displayEmpty={true}>
      {mapObject(props.options, (key, value) => (
        <MenuItem key={value} value={value}>{key}</MenuItem>
      ))}
    </SelectStyled>
  </FormControllerStyled>
)


const MyPropertyFilter = (props) => {
  const { filter, updateFilter } = props

 

  return (
    <Fragment>
      <Secctions>
        <ButtonHeader onClick={() => { props.setFilterActive(false) }}>
          <ArrowBackIos />
              Filtrar mis inmuebles
            </ButtonHeader>
        <SectionText>Tipo de acción</SectionText>
        <SelectComponet
          value={transform(filter.action)}
          options={{ Todos: '', ...types.actionType }}
          handleChange={e => updateFilter({ ...filter, action: transform(e.target.value) })}
        />
      </Secctions>
      <Secctions>
        <SectionText>Tipo de inmueble</SectionText>
        <SelectComponet
          value={transform(filter.propertyType)}
          options={{ Todos: '', ...types.propertyType }}
          handleChange={e => updateFilter({ ...filter, propertyType: transform(e.target.value) })}

        />
      </Secctions>
      <Secctions>
        <SectionText>Precio</SectionText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextFieldStyled
              value={transformNumReverse(filter.priceMxnMin)}
              label="Desde"
              variant="outlined"
              onChange={event => updateFilter({ ...filter, priceMxnMin: transformNum(event.target.value) })}
              onInput={e => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldStyled
              label="Hasta"
              variant="outlined"
              onChange={event => updateFilter({ ...filter, priceMxnMax: transformNum(event.target.value) })}
              value={transformNumReverse(filter.priceMxnMax)}
              onInput={e => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
              }}
            />
          </Grid>
        </Grid>
      </Secctions>
      <Secctions>
        <RadioGroup aria-label="position" value={transform(filter.isEnabled)} onChange={event => updateFilter({ ...filter, isEnabled: transform(event.target.value) })} row>
          <Grid item xs={4}>
            <FormControlLabelStyled
              value=""
              control={<RadioColor color="primary" />}
              label="Todos"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabelStyled
              value="1"
              control={<RadioColor color="primary" />}
              label="Activados"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabelStyled
              value="0"
              control={<RadioColor color="primary" />}
              label="Desactivados"
            />
          </Grid>
        </RadioGroup>
      </Secctions>
      <Secctions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OutlinedButton
              onClick={props.removeFilters}
              fullWidth
              variant="outlined"
              color="primary">Quitar Filtros
              </OutlinedButton>
          </Grid>
          <Grid item xs={6}>
            <StyleButton
              fullWidth
              variant="contained"
              onClick={props.ApplyFilters}
              color="primary">Aplicar Filtros
              </StyleButton>
          </Grid>
        </Grid>
      </Secctions>
      {/* </Container> */}
    </Fragment>
  )
}

export default MyPropertyFilter
