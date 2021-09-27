import React from 'react'
import { Typography, Grid, Button, Box } from '@material-ui/core'
import { styled, MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import Head from '../head';


const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',
    },
  },
});

const Container = styled(Box)({
  backgroundColor: 'white'
})

const Title = styled(Typography)({
  color: '#1E0E6F',
  padding: '30px 0px',
  fontWeight: 700
})

const ButtonStyle = styled(Button)({
  textAlign: 'center',
  width: '100%',
  borderRadius: 50,
  padding:10,
  textTransform:"none",
  borderColor: "#41B8F9",
})


const MyFavoritePage = () => {


  return (
    <Container paddingTop={10} pb={4} margin={1}>
      <Head title='Mis favoritos' />
      <Title align="center" variant="h4">Mis Favoritos</Title>
      <Grid container justify='center' alignItems='stretch' spacing={2}>
        <Grid item xs={12} >
          <Grid container spacing={2} justify='center' >
            
            {/* <Grid item xs={6} md={4}>
              <MuiThemeProvider theme={theme}>
                <ButtonStyle
                  onClick={() => { setView('contacted') }}
                  selected={view === 'contacted'}
                  color='primary'
                  variant={view === 'contacted' ? 'contained' : 'outlined'} >
                  Contactados
                </ButtonStyle>
              </MuiThemeProvider>
            </Grid> */}
            <Grid item xs={6} md={4} >
              <MuiThemeProvider theme={theme}>
                <ButtonStyle
                  // onClick={() => { setView('favorites') }}
                  // selected={view === 'favorites'}
                  color='primary'
                  variant='contained' >
                  Favoritos
                </ButtonStyle>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Box minHeight='65vh'>
            {/* <Grid container justify='flex-start' alignItems='stretch' spacing={2}>
              {view === 'favorites'
                ? (<FavoriteList />)
                : (<MyInterestedList />)
              }
            </Grid> */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyFavoritePage