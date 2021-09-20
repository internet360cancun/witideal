import React from "react";
import { Grid, Box, Typography, FormControlLabel } from "@material-ui/core";
import {
  createTheme,
  MuiThemeProvider,
  styled,
} from "@material-ui/core/styles";
import { RegularRadioGroup } from "../RegularRadioGroup/regularRadioGroup";
import { SwitchComponent } from "../SwitchComponent/switchComponent";
import useStyles from "./styles";
import {
  propertyType_es,
  specificDataSection,
  genderArray,
  fFisicas,
  fEspacios,
  fSeguridad,
  fAmenidades,
  fEspeciales,
  // fEntorno,
  fTiempo,
} from "../../assets/Strings";
import TextFiledAutoResize from "../../layouts/textfield_auto_resize";
import CheckBoxAutoResize from "../../layouts/checkbox_auto_resize";
import TextFieldAutoResize from "../../layouts/textfield_auto_resize";
import currencyParser from "../../helpers/currencyParser";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F19F9",
    },
  },
});

const Container = styled(Box)({});

export const AdvanceFilters = (props) => {
  const classes = useStyles();

  const categoriasInmuebleConTit = {
    catFisicas: {
      valor: fFisicas,
      titulo: "Características Físicas",
    },
    catEspacios: {
      valor: fEspacios,
      titulo: "Espacios Internos",
    },
    catSeguridad: {
      valor: fSeguridad,
      titulo: "Especificaciones de Seguridad",
    },
    catAmenidades: {
      valor: fAmenidades,
      titulo: "Amenidades y Servicios",
    },
    catEspeciales: {
      valor: fEspeciales,
      titulo: "Características Especiales",
    },
    // catEntorno: {
    //   valor: fEntorno,
    //   titulo: "Características de la zona. Detalle del Entorno"
    // },
    catTiempo: {
      valor: fTiempo,
      titulo: "Tiempo",
    },
  };

  const handleChange = (event) => {
    let value = event.target.value;
    props.setProperData({
      ...props.properData,
      [event.target.name]: value,
    });
  };

  const handleCheckBox = (event) => {
    let value = event.target.checked;
    props.setProperData({
      ...props.properData,
      [event.target.id]: value,
    });
  };

  const handleSwitch = (event) => {
    props.setProperData({
      ...props.properData,
      [event.target.name]: event.target.checked,
    });
  };

  const setminArea = (selectedArea) => {
    props.setProperData({
      ...props.properData,
      minArea: currencyParser.toNumber(selectedArea.target.value),
    });
  };

  const setMaxArea = (selectedArea) => {
    props.setProperData({
      ...props.properData,
      maxArea: currencyParser.toNumber(selectedArea.target.value),
    });
  };

  function selectComponent(title, tipo, keyName, options) {
    var com;
    switch (tipo) {
      case "numbers":
        com = (
          <Grid item xs={12} md={6} key={title}>
            <TextFiledAutoResize
              className={classes.textField}
              label={title}
              name={keyName}
              type="number"
              variant="outlined"
              id={title}
              inputProps={{ min: 0 }}
              value={
                props.properData[specificDataSection[title]] !== undefined
                  ? props.properData[specificDataSection[title]]
                  : ""
              }
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        );
        break;

      case "text":
        com = (
          <Grid item xs={12} md={6} key={title}>
            <TextFiledAutoResize
              className={classes.textField}
              label={title}
              name={keyName}
              fullWidth
              onChange={handleChange}
              type="text"
              variant="outlined"
              value={props.properData[specificDataSection[title]] || ""}
              id={title}
            />
          </Grid>
        );
        break;
      case "date":
        com = (
          <Grid item xs={12} sm={6} key={title}>
            <span></span>
          </Grid>
        );
        break;
      case "checkbox":
        com = (
          <Grid item xs={12} md={6} key={title}>
            <MuiThemeProvider theme={theme}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <CheckBoxAutoResize
                    onChange={handleCheckBox}
                    id={keyName}
                    color="primary"
                    className={classes.borderColorRadioAndCheck}
                    checked={
                      props.properData[specificDataSection[title]] || false
                    }
                  />
                }
                label={title}
              />
            </MuiThemeProvider>
          </Grid>
        );
        break;

      case "radio":
        com = (
          <Grid item xs={12} key={title}>
            <RegularRadioGroup
              id={title}
              name={keyName}
              handler={handleChange}
              defaultValue={props.properData[specificDataSection[title]] || ""}
              cats={options}
            >
              {title}
            </RegularRadioGroup>
          </Grid>
        );
        break;

      case "switch":
        com = (
          <Grid item xs={12} key={title}>
            <SwitchComponent name={keyName} handler={handleSwitch}>
              {title}
            </SwitchComponent>
          </Grid>
        );
        break;
      default:
        com = null;
        break;
    }
    return com;
  }

  function renderComponent(obj) {
    var components = [];
    for (var concept in obj) {
      var category = obj[concept];

      if (
        category.genders.includes(
          genderArray.indexOf(propertyType_es[props.properData.propertyType])
        )
      ) {
        let comp = selectComponent(
          category.name,
          category.tipo,
          concept,
          category.options
        );
        components.push(comp);
      }
    }
    return components;
  }

  function renderSection() {
    var components = [];
    for (var cat in categoriasInmuebleConTit) {
      var section = categoriasInmuebleConTit[cat];
      if (renderComponent(section.valor).length > 0) {
        components.push(
          <React.Fragment key={cat}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="left"
                className={classes.subtitleText}
              >
                {section.titulo}
              </Typography>
            </Grid>
            {renderComponent(section.valor)}
          </React.Fragment>
        );
      } else {
        components.push(<span key={cat}></span>);
      }
    }
    return components;
  }

  const style = {};
  if (props.withoutBorder) style.border = "none";

  return (
    <React.Fragment>
      <Container
        className={classes.bgBox}
        p={props.p || { xs: 3, md: 2 }}
        style={style}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              align="left"
              variant="h6"
              className={classes.subtitleText}
            >
              Personaliza tu búsqueda
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.subtitleText}
            >
              Área en metros cuadrados
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={6}>
              <TextFieldAutoResize
                className={classes.textField}
                onChange={setminArea}
                fullWidth
                label="Desde m2"
                variant="outlined"
                type="number"
                value={props.properData.minArea || ""}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldAutoResize
                className={classes.textField}
                onChange={setMaxArea}
                fullWidth
                label="Hasta m2"
                variant="outlined"
                type="number"
                value={props.properData.maxArea || ""}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
          {renderSection()}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
