import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import {styled, createTheme, MuiThemeProvider} from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',
    },
  },
});
const wdPurpleSubtitle = '#1E0E6F';

const StyleRadio=styled(Radio)({
  color:'#41B8F9'
})

const TextLabel = styled(FormLabel)({
  color: wdPurpleSubtitle,
})

const RadioOption = styled(FormControlLabel)({
  ['@media (max-width:400px)']: {
    width: '45%',
    boxSizing: 'border-box'
  }
})


export function RegularRadioGroup(props) {
  const value = props.defaultValue

  function handleChange(event) {
    console.log(event.target)
    props.handler(event)
  }

  const handleUnselect = event => {
    if (event.target.value === value && !!props.onUnselect) {
      props.onUnselect(event.target.name)
    }
  }

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <Box p={0}>
        <TextLabel component="h4" align="left">{props.children}</TextLabel>
          <RadioGroup id={props.id} row  name={props.name} value={value !== undefined ? value : ''} onChange={handleChange}>
            {props.cats.map(element=>{
              return(
                <RadioOption 
                  value={element !== undefined ? element : ''}
                  key={element}
                  id={props.id}
                  control={<StyleRadio color="primary"/>}
                  label={element}
                  labelPlacement="end"
                  onClick={handleUnselect}
                />
              )
            })}
            
          </RadioGroup>
        </Box>
      </MuiThemeProvider>
    </React.Fragment>
  );
}