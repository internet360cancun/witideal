import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  styled,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MultiToggleButton } from "../MultiToggleButton/multiToggleButton";
import { DropdownWithButtons } from "../DropdownWithButtons/dropDownWithButtons";
import { Currency } from "../Currency/currency";
import { Searchbar } from "../Searchbar/searchbar";
import { AdvanceFilters } from "../AdvanceFilters/advanceFilters";
// import { LIST } from '../../constants/routes';
import { BinaryToggleButton } from "../BinaryToggleButton/binaryToggleButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { WarningModal } from "../WarningModal/warningModal";
import { setAlert } from "../Alert/alert";
import { useHistory } from "react-router-dom";
import analytics from "react-ga";
import useSession from "../../Hooks/useSession";
import { isProduction } from "../../constants/globalConstraints";
import makeUrl from "../../helpers/makeurl";

import {
  action,
  action_array,
  action_es,
  action_es_array,
  propertyType,
  propertyType_es,
  habitational_es_array,
  comercial_es_array,
} from "../../assets/Strings";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F19F9",
    },
  },
});

const wdPurpleSubtitle = "#1E0E6F";
const wdLightBlue = "#41B8F9";
const wdDarkBlue = "#3F19F9";

const useStyles = makeStyles((theme) => ({
  buttons: {
    color: "#fff",
    backgroundColor: wdDarkBlue,
    borderRadius: 50,
    padding: "12px 5px",
    "@media (max-width:600px)": {
      padding: "5px 5px",
    },
    borderColor: wdLightBlue,
    textTransform: "none",
    fontSize: 17,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
    "&:hover": {
      backgroundColor: "#1E0E6F",
    },
  },
  outlinedButton: {
    borderRadius: 50,
    padding: "12px 5px",
    "@media (max-width:600px)": {
      padding: "5px 5px",
    },
    borderColor: wdLightBlue,
    color: wdDarkBlue,
    textTransform: "none",
    fontSize: 17,
    "&:hover": {
      borderColor: wdDarkBlue,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  formPaper: {
    borderRadius: 30,
    position: "relative",
    "@media (max-width:1279px)": {
      marginTop: 70,
      marginBottom: 80,
    },
    "@media (max-width:960px)": {
      marginBottom: -30,
    },
  },
  formContainerColor: {
    padding: theme.spacing(0, 3, 3, 3),
    opacity: 13,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  iconButton: {
    padding: "0px",
    "& svg": {
      fontSize: 8,
    },
  },
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700,
  },
  link: {
    textDecoration: "none",
  },
  textInput: {
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
  borderColorRadioAndCheck: {
    color: "#41B8F9",
  },
}));

const Describre = styled("div")({
  fontSize: "1em",
  textAlign: "left",
  fontWeight: "bold",
  color: "var(--blue-hover)",
  "& span": {
    fontSize: "12px",
    fontWeight: "normal",
    color: "gray",
  },
});

export const UserForm = () => {
  const session = useSession();
  const classes = useStyles();
  const history = useHistory();
  const [searchPropertyObject, setSearchPropertyObject] = useState({
    action: action_array[0],
    propertyType: propertyType[habitational_es_array[0]],
    currency: "MXN",
    bankSale: false,
    landUse: false,
  });

  const [isBankSaleHidden, setIsBankSaleHidden] = useState(true);
  const [renderAdvanceFilters, setRenderAdvanceFilters] = useState(false);
  const [warning, setWarning] = useState({
    open: false,
    alarmText: "",
  });

  // Set action in object
  const setAction = (selectedAction) => {
    if (action[selectedAction] === "rent") {
      setIsBankSaleHidden(true);
    } else if (action[selectedAction] === "buy") {
      setIsBankSaleHidden(false);
    }
    setSearchPropertyObject({
      ...searchPropertyObject,
      action: action[selectedAction],
      bankSale: false,
    });
  };

  const setPropertyType = (selectedPropertyType) => {
    //console.log(propertyType[selectedPropertyType])
    setSearchPropertyObject({
      ...searchPropertyObject,
      propertyType: propertyType[selectedPropertyType],
    });
  };

  const setMinPrice = (selectedPrice) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      minPrice: parseInt(selectedPrice),
    });
  };

  const setMaxPrice = (selectedPrice) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      maxPrice: parseInt(selectedPrice),
    });
  };

  const setAddress = (selectedAddress) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      ...selectedAddress,
    });
    //console.dir(selectedAddress)
  };

  const setBankSale = (selectedBankSale) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      bankSale: selectedBankSale,
    });
  };

  const setLanduse = (selectedLandUse, firstDefaultValue) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      landUse: selectedLandUse,
      propertyType: propertyType[firstDefaultValue],
    });
  };

  const handleCurrency = (event) => {
    setSearchPropertyObject({
      ...searchPropertyObject,
      currency: event.target.value,
    });
  };

  const handleAdvanceFilters = () =>
    setRenderAdvanceFilters(!renderAdvanceFilters);

  const handleTop = () => window.scrollTo(0, 0);

  const handleWarning = () => {
    setWarning({
      open: !warning.open,
      alarmText: "",
    });
  };

  const handleSearch = (event) => {
    const { minPrice, maxPrice, minArea, maxArea } = searchPropertyObject;

    if (
      !isNaN(minPrice) &&
      !isNaN(maxPrice) &&
      parseInt(maxPrice) <= parseInt(minPrice)
    )
      return setAlert(null, " ", "El presupuesto no es válido");
    if (
      !isNaN(parseInt(minArea)) &&
      !isNaN(parseInt(maxArea)) &&
      parseInt(maxArea) <= parseInt(minArea)
    )
      return setAlert(null, " ", "Las medidas no son válidas");
    if (!searchPropertyObject.administrative_area_level_1) {
      setAlert(null, " ", "Indica donde te gustaría buscar.", "warning");
      document.getElementById("focusherewhenerrorocurred").scrollIntoView();
      document.getElementById("exampleInputEmail1").focus();
      return false;
    }
    handleTop();

    window.gtag("event", "conversion", {
      send_to: "AW-307620621/WegeCLLSioADEI3W15IB",
    });

    const url = makeUrl(searchPropertyObject);
    history.push(`/propiedades/${url}`, searchPropertyObject);

    if (isProduction) {
      analytics.event({
        category: session.SesState && session.uId ? session.uId : "anonymous",
        action: "search property",
        label: `${searchPropertyObject.action} ${searchPropertyObject.propertyType}`,
      });
    }
  };

  useEffect(() => {
    handleTop();
  }, []);

  return (
    <React.Fragment>
      <Paper elevation={5} className={classes.formPaper}>
        <Box p={{ xs: 2, md: 4, lg: 6 }}>
          <Grid container spacing={1}>
            {/* Select Action */}
            <Grid item xs={12}>
              <Describre>¿Qué acción quieres realizar?</Describre>
            </Grid>
            <Grid item xs={12}>
              {/* <MultiToggleButton btns={pAction_es_array} selectedOption={pAction_es[props.properData.action]} setter={setAction} >{pAction_es[props.properData.action]}</MultiToggleButton> */}
              <MultiToggleButton
                xs={6}
                btns={action_es_array}
                setter={setAction}
                selectedOption={action_es[searchPropertyObject.action]}
              />
            </Grid>
            <Grid item xs={12}>
              <Describre>¿Qué tipo de propiedad te interesa?</Describre>
            </Grid>
            <Grid item xs={12}>
              <DropdownWithButtons
                xs={6}
                buttons={["Habitacional", "Comercial"]}
                dataA={habitational_es_array}
                dataB={comercial_es_array}
                selectedOption={
                  propertyType_es[searchPropertyObject.propertyType]
                }
                setParentData={setPropertyType}
                secondSetter={setLanduse}
              />
            </Grid>
            <Grid item xs={12} id="focusherewhenerrorocurred">
              <Describre>
                ¿Cuál es tu presupuesto? <span>Opcional</span>
              </Describre>
            </Grid>
            <Grid item xs={6}>
              <Currency setter={setMinPrice} label={"Desde"}></Currency>
            </Grid>
            <Grid item xs={6}>
              <Currency setter={setMaxPrice} label={"Hasta"}></Currency>
            </Grid>
            <Grid item xs={12}>
              <MuiThemeProvider theme={theme}>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={searchPropertyObject.currency}
                  onChange={handleCurrency}
                  row
                >
                  <FormControlLabel
                    value="MXN"
                    control={
                      <Radio
                        color="primary"
                        className={classes.borderColorRadioAndCheck}
                      />
                    }
                    label="MXN"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="USD"
                    control={
                      <Radio
                        color="primary"
                        className={classes.borderColorRadioAndCheck}
                      />
                    }
                    label="USD"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </MuiThemeProvider>
            </Grid>

            <Grid item xs={12}>
              <Describre>¿Dónde te gustaría buscar?</Describre>
            </Grid>
            <Grid item xs={12}>
              <Searchbar
                setIsLoading={() => false}
                getAddress={setAddress}
              ></Searchbar>
            </Grid>
            {!isBankSaleHidden && (
              <Grid item xs={12}>
                <Box pb={2}>
                  <Describre>Excluir remate bancario</Describre>
                  <br />
                  <BinaryToggleButton
                    setter={setBankSale}
                    defaultValue={searchPropertyObject.bankSale}
                  />
                </Box>
              </Grid>
            )}
          </Grid>

          {renderAdvanceFilters && (
            <Box pb={2}>
              <AdvanceFilters
                p={{ xs: 0 }}
                properData={searchPropertyObject}
                setProperData={setSearchPropertyObject}
              />
            </Box>
          )}

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                className={classes.outlinedButton}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth={true}
                onClick={handleAdvanceFilters}
              >
                {renderAdvanceFilters
                  ? "Cerrar Filtros Avanzados"
                  : "Agregar más Filtros"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleSearch}
                className={
                  !!searchPropertyObject.administrative_area_level_1
                    ? classes.buttons
                    : classes.outlinedButton
                }
                variant={
                  !!searchPropertyObject.administrative_area_level_1
                    ? "contained"
                    : "outlined"
                }
                size="small"
                color="primary"
                fullWidth={true}
              >
                Mostrar Inmuebles
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <WarningModal
        open={warning.open}
        alarmText={warning.alarmText}
        handleClose={handleWarning}
      />
    </React.Fragment>
  );
};
