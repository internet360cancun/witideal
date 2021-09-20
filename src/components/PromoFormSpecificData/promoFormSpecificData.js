import React, { useState } from 'react';
import { Typography, Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { fisicas, espacios, seguridad, amenidades, especiales, entorno, tiempo } from '../../assets/Strings';
import { DatePicker } from '../DatePicker/datePicker';
import { RegularRadioGroup } from '../RegularRadioGroup/regularRadioGroup';
import { SwitchComponent } from '../SwitchComponent/switchComponent';
import { setAlert } from '../Alert/alert'
import { genderArray, propertyType_es, } from '../../assets/Strings';

const wdPurpleSubtitle = '#1E0E6F';
const wdLightBlue = '#41B8F9';
const wdDarkBlue = '#3F19F9';

var theme = createTheme({
  palette: {
    primary: {
      main: "#3F19F9"
    }
  }
});

const useStyles = makeStyles(theme => ({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41B8F9',
        borderRadius: 30,
      },
      '&:hover fieldset': {
        borderColor: '#3F19F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: wdDarkBlue,
      },
    }

  },
  formControl: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: wdLightBlue,
    fontWeight: 700,
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(0,0,255,0.1)'
    },
    marginLeft:'0.1rem',
    textAlign: "left",
    '& span': {
      '@media (max-width:1550px) and (min-width:1280px)': {
        maxWidth: '205px',
        textAlign: 'left',
      },
      '@media (max-width:1050px) and (min-width:960px)': {
        maxWidth: '205px',
        textAlign: 'left',
      }
    }
  },
  borderColorRadioAndCheck: {
    color: '#41B8F9'
  },
  textDescription: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41B8F9',
       
      },
      '&:hover fieldset': {
        borderColor: '#3F19F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: wdDarkBlue,
      },
    }
  },
  titles:{
    color:'#1E0E6F'
  }
}));

export function PromoFormSpecificData(props) {
  const classes = useStyles();
  const categoriasInmuebleConTit = {
    catFisicas: {
      valor: fisicas,
      titulo: "Características Físicas"
    },
    catEspacios: {
      valor: espacios,
      titulo: "Espacios Internos"
    },
    catSeguridad: {
      valor: seguridad,
      titulo: "Seguridad"
    },
    catAmenidades: {
      valor: amenidades,
      titulo: "Amenidades"
    },
    catEspeciales: {
      valor: especiales,
      titulo: "Servicios"
    },
    catEntorno: {
      valor: entorno,
      titulo: "Características de la zona"
    },
    catTiempo: {
      valor: tiempo,
      titulo: "Tiempo"
    }
  };

  const specificData = props.specificData || {}



  // const tipoInmueble = genderArray;
  // const catEdoConser = ['Excelente', 'Bueno', 'Regular', 'Remodelar']

  /*
  Gender
  0-CasaSola
  1-CasaCondo
  2-Depto
  3-Local
  4-Oficina
  5-Terreno
  6-Tipos(Desarrollo)
  7-CasaUsoSuelo
  8-Bodega
  9-Edificio
  */

  //const [actualGender, setGender] = useState(tipoInmueble.indexOf(props.properData.gender));
  // const [actualGender, setGender] = useState(1);
  // const [formData, setFormData] = useState(props.properData);
  // const [countHelpText, setCountHelpText] = useState(props.properData.propertyDescription !== undefined ? `${props.properData.propertyDescription.length}/260` : '0/260');


  /* VALIDATION HOOKS ---------*/

  // const [countHelpTextError, setCountHelpTextError] = useState(false)

  /*VALIDATION HOOKS END -------- */

  //console.log('specificData: ', specificData);

  // const refreshSpecificData = event =>{
  //     if(event.target!= undefined){
  //         setSpecificData({
  //             ...specificData,
  //             [event.target.name]: event.target.value
  //         })}
  //     return {...specificData}
  // }

  const handleChange = (event) => {
    if (event.target.value.length === 0) {
      let auxObj = props.properData.specificData;
      delete props.properData.specificData[event.target.name]
      props.setProperData({
        ...props.properData,
        specificData: { ...auxObj }
      })
    } else {
      props.setProperData({
        ...props.properData,
        specificData: {
          ...specificData,
          [event.target.name]: event.target.value < 0 || event.target.value === 'e' ? '' : event.target.value
        }
      })
    }
  }

  const onUnselect = name => {
    const newSpecificData = { ...props.properData.specificData }
    delete newSpecificData[name]
    console.log(newSpecificData)
    props.setProperData({
      ...props.properData,
      specificData: newSpecificData
    })
  }



  const handleCheckBox = (event) => {
    props.setProperData({
      ...props.properData,
      specificData: {
        ...specificData,
        [event.target.id]: event.target.checked
      }
    })
  }

  const handleSwitch = (event) => {
    props.setProperData({
      ...props.properData,
      specificData: {
        ...specificData,
        [event.target.name]: event.target.checked
      }
    })
  }

  function selectComponent(title, tipo, keyName, options) {
    //console.log('titles', title)
    var com;
    //console.log(`title ${props.properData[specificDataSection[title]]}`)
    switch (tipo) {
      case "numbers":

        com = (
          <Grid item xs={12} md={6} lg={6} xl={4} key={title}>
            <TextField
              className={classes.textField}
              label={title}
              name={keyName}
              type="number"
              variant="outlined"
              id={title}
              // value={isSomethingSaved ? `props.properData.SpecificData.`}
              // defaultValue={props.properData[specificDataSection[title]]}
              value={specificData[keyName] !== undefined ? specificData[keyName] : ''}
              onChange={handleChange}
              fullWidth
              onInput={e => {
                e.target.value = e.target.value.slice(0, 5)
              }}
            //InputLabelProps={{ shrink: true }}
            />
          </Grid>
        )
        break;

      case "text":
        com = (
          <Grid item xs={12} md={6} lg={4} xl={4} key={title}>
            <TextField
              className={classes.textField}
              label={title}
              name={keyName}
              fullWidth
              onChange={handleChange}
              type="text"
              variant="outlined"
              value={specificData[keyName] !== undefined ? specificData[keyName] : ''}
              id={title}
            />
          </Grid>
        )
        break;

      case "date":
        com = (
          <Grid item xs={12} sm={6} key={title}>
            <DatePicker>{title}</DatePicker>
          </Grid>
        )
        break;

      case 'checkbox':
        com = (
          <Grid item xs={12} md={6} lg={4} xl={4} key={title}>
            <MuiThemeProvider theme={theme}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    onChange={handleCheckBox}
                    id={keyName}
                    color="primary"
                    checked={specificData[keyName] !== undefined ? specificData[keyName] : false}
                    className={classes.borderColorRadioAndCheck}
                  />
                }
                label={title}
              />
            </MuiThemeProvider>
          </Grid>

        )
        break;

      case "radio":
        com = (
          <Grid item xs={12} key={title}>
            <RegularRadioGroup
              onUnselect={onUnselect}
              id={title}
              name={keyName}
              handler={handleChange}
              defaultValue={specificData[keyName] !== undefined ? specificData[keyName] : ''}
              cats={options}>{title}
            </RegularRadioGroup>
          </Grid>
        )
        break;

      case "switch":
        com = (
          <Grid item xs={12} key={title}>
            <SwitchComponent name={keyName} handler={handleSwitch}>{title}</SwitchComponent>
          </Grid>
        )
        break;

      default:
        com = null
        break;
    }
    return com
  }

  function renderComponent(obj) {
    var components = [];
    for (var concept in obj) {
      var category = obj[concept]
      if (category.genders.includes(genderArray.indexOf(propertyType_es[props.properData.propertyType]))) {
        let comp = selectComponent(category.name, category.tipo, concept, category.options)
        components.push(comp)

      }
    }
    return components
  }

  function renderSection() {

    var components = []

    for (var cat in categoriasInmuebleConTit) {
      var section = categoriasInmuebleConTit[cat];

      if (renderComponent(section.valor).length > 0) {
        components.push(
          <React.Fragment key={cat}>

            <Grid item xs={12}>
              <Typography variant='h6' align='left' className={classes.subtitleText}>{section.titulo}</Typography>
            </Grid>

            {renderComponent(section.valor).map((element, index) => {
              //console.log(section.valor)
              return (
                <React.Fragment key={index}>
                  {element}
                </React.Fragment>

              )
            })}
          </React.Fragment>)
      } else {
        components.push(<span key={cat}></span>)
      }

    }



    return components
  }

  // const handleCounterHelpText = event =>{
  //     let auxCount = event.target.value.length;
  //     if(auxCount <= 260){
  //         setCountHelpText(`${event.target.value.length}/260`)
  //         if (countHelpTextError) setCountHelpTextError(false);
  //         props.setProperData({
  //             ...props.properData,
  //             [event.target.name] : event.target.value
  //         }) 
  //     } else{
  //         setCountHelpText(`Excedes el número por ${260 - auxCount} caracteres`);
  //         if (!countHelpTextError) setCountHelpTextError(true);
  //     } 

  // }

  const handleCounterHelpText = event => {
    var value = event.target.value.toString()
    value = value.replace(/[0-9]/g, '')
    if (event.target.value.length > 750) {
      value = value.slice(0, 750)
      setAlert(null, ' ', 'El texto que intentas ingresar supera los 750 caracteres', 'warning')
    }

    props.setProperData({
      ...props.properData,
      specificData: {
        ...specificData,
        [event.target.name]: value
      }
    })
  }

  return (
    <React.Fragment>

      <Grid container spacing={2}>
        <Typography className={classes.titles}variant='h4'> El tipo de inmueble que seleccionaste fue {propertyType_es[props.properData.propertyType]}</Typography>
        <Typography className={classes.titles} align='left'>
          Llena el siguiente formulario, mientras
          más completa la información, mejor oportunidad tendrá el anuncio de aparecer en la búsqueda de los
          usuarios.
        </Typography>
        {renderSection().map(element => {
          return element
        })}

        <Grid item xs={12}>
          <Typography variant='h6' align='left' className={classes.subtitleText}>Descripción del Inmueble</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            className={classes.textDescription}
            variant='outlined'
            label='Descripción'
            multiline
            rows={3}
            name='propertyDescription'
            rowsMax={3}
            onChange={handleCounterHelpText}
            helperText={specificData !== undefined ? `${specificData.propertyDescription !== undefined ? specificData.propertyDescription.length : '0'}/750 ` : '0/750'}
            fullWidth
            value={specificData.propertyDescription || ''}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}