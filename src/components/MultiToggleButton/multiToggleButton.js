import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles, MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F19F9',

    },
  },
});

const wdLightBlue = "#41B8F9";
const useStyles = makeStyles(theme => ({
  wdBtnItem: {

    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    '@media (max-width:600px)': {
      padding: 4,
      
    },
    '&:hover': {
      background: "#1E0E6F"
    }
  },
  outlinedButton: {
    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    '@media (max-width:600px)': {
      padding: 4,
    },
   
  },
  spanStyle: {
    width: '100%',
    textTransform: "none",
    fontSize: 17,
    '@media (max-width:600px)': {
      fontSize: 14,
    },
    
  }
}));

export const MultiToggleButton = props => {

  /* 
    Object Props:
      btns = <array> of buttons to be rendered
      selectedOption = <object> selected option
      setter = <function> to set the selected option
  */

  const classes = useStyles();

  const handleClick = event => {
    props.setter(event.target.id);
  }

  const renderButtons = () => {
    return (
      props.btns.map(element => {
        return (
          <Grid item xs={props.xs || 12} md key={element}>
            <MuiThemeProvider theme={theme}>
              <Button
                fullWidth
                color='primary'
                size='small'
                className={props.selectedOption === element ? classes.wdBtnItem : classes.outlinedButton}
                id={element}
                onClick={handleClick}
                variant={props.selectedOption === element ? 'contained' : 'outlined'}
              >
                <span className={classes.spanStyle} id={element}>{element}</span>
              </Button>
            </MuiThemeProvider>
          </Grid>
        )
      })
    )
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {renderButtons()}
      </Grid>
    </React.Fragment>
  )
}