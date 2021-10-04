import React, { useState } from "react";
import {
  Grid,
  FormControl,
  Select,
  Button,
  MenuItem,
  // OutlinedInput,
  InputLabel,
  useMediaQuery,
} from "@material-ui/core";

import {
  makeStyles,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F19F9",
    },
  },
});

const wdDarkBlue = "#3F19F9";
const wdLightBlue = "#41B8F9";

const useStyles = makeStyles((theme) => ({
  wdBtnItem: {
    //borderWidth: 1,,
    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    "@media (max-width:600px)": {
      padding: 4,
    },
    "&:hover": {
      background: "#1E0E6F",
    },
  },
  outlinedButton: {
    borderColor: wdLightBlue,
    borderRadius: 50,
    fontWeight: 700,
    transition: "0.2 s",
    padding: 11,
    "@media (max-width:600px)": {
      padding: 4,
    },
  },
  spanStyle: {
    width: "100%",
    textTransform: "none",
    fontSize: 17,
    "@media (max-width:600px)": {
      fontSize: 14,
    },
  },
  wdDropDown: {
    "& .MuiOutlinedInput-input": {
      "@media (max-width:600px)": {
        padding: 8,
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: wdLightBlue,
        borderRadius: 50,
      },
      "&:hover fieldset": {
        borderColor: wdDarkBlue,
      },
      "&.Mui-focused fieldset": {
        borderColor: wdDarkBlue,
      },
    },
  },
}));

export const DropdownWithButtons = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  // hooks
  //const [dropdownVal, setDropDownVal] = useState(props.dataA.includes(props.selectedOption) || props.dataB.includes(props.selectedOption) ? props.selectedOption : props.dataA[0]);
  /* 
  buttonsVal has an embed condition inside a ternary condition. 
  The reason is that there are 3 possible values for buttonsVal: 
  1) The inputData exists in props.dataA so that the the category is buttonsVal = buttons[0].
  2) the inputData exists in props.dataB so that the category is buttonsVal = buttons[1].
  3) or the default value buttonsVal = buttons[0] when the inputValue is null,
  which means that the user is filling the formulary for the very first time;
  4) exact ? never selecte automaticaly first value of buttons */
  const [buttonsVal, setButtonsVal] = useState(
    props.buttonsVal ? props.buttons[1] : props.buttons[0]
  );

  //handlers
  const handleDropDownChange = (event) => {
    props.setParentData(event.target.value);
  };

  // if exact ? set values null, if not take first value of the array
  const handleClickButton = (event) => {
    if (props.exact) {
      if (event.target.id === props.buttons[1]) {
        props.secondSetter(true, null);
      } else {
        props.secondSetter(false, null);
      }
    } else {
      if (event.target.id === props.buttons[1]) {
        props.secondSetter(true, props.dataB[0]);
      } else {
        props.secondSetter(false, props.dataA[0]);
      }
    }
    setButtonsVal(event.target.id);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <React.Fragment>
              {props.buttons.map((element) => {
                return (
                  <Grid key={element} item xs={props.xs || 12} md={6}>
                    <MuiThemeProvider theme={theme}>
                      <Button
                        fullWidth
                        onClick={handleClickButton}
                        color="primary"
                        name={element}
                        value={element}
                        id={element}
                        className={
                          buttonsVal === element
                            ? classes.wdBtnItem
                            : classes.outlinedButton
                        }
                        variant={
                          buttonsVal === element ? "contained" : "outlined"
                        }
                        size="medium"
                      >
                        <span className={classes.spanStyle} id={element}>
                          {element}
                        </span>
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                );
              })}
            </React.Fragment>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.wdDropDown}
            size={isMobile ? "small" : "medium"}
          >
            <InputLabel id="propertytype">Selecciona una opción</InputLabel>
            {buttonsVal === props.buttons[0] && (
              <Select
                labelId="propertytype"
                label="Selecciona una opción"
                error={props.error}
                value={
                  props.exact
                    ? props.selectedOption
                    : props.dataA.includes(props.selectedOption)
                    ? props.selectedOption
                    : props.dataA[0]
                }
                name="drodownComponent"
                onChange={handleDropDownChange}
                fullWidth
                size="medium"
              >
                {props.dataA.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
            {buttonsVal === props.buttons[1] && (
              <Select
                labelId="propertytype"
                label="Selecciona una opción"
                error={props.error}
                value={
                  props.exact
                    ? props.selectedOption
                    : props.dataB.includes(props.selectedOption)
                    ? props.selectedOption
                    : props.dataB[0]
                }
                name="drodownComponent"
                onChange={handleDropDownChange}
                fullWidth
                size="medium"
              >
                {props.dataB.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
