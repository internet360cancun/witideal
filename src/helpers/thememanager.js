import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'

const theme = createTheme({
  wd_bgColor: '#F9F7FC',
  wd_bgBotBorder: '#3F19F9',
  wdPurpleSubtitle: '#1E0E6F',
  purple: '#1E0E6F',
  wdLightBlue: '#41B8F9',
  wdRegularBlue:  '#1E0E6F',
  colorTextButton: '#32ffcc',
  colorBlue: '#3f19f9',
  layer: '#00000052',
  colors: {
    blue_black: '#1E0E6F',
    blue: '#3F19F9',
    blue_light: '#41B8F9',
    blue_sky: '#E8E5FD',
    background: '#F7F6FF',
    border: '#32FFD2',
  },
  palette:{
    primary:{
      main:'#3F19F9'
    },
    secondary: {
      main: '#32FFD2'
    }
  }
})

const Provider = (props) => (
  <MuiThemeProvider theme={theme}>
    {props.children}
  </MuiThemeProvider>
)

export default Provider