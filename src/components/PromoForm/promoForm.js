/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from '@material-ui/core';
import { useStyles, ButtonStyled } from './styles';
import { PromoFormGeneralData } from '../PromoFormGeneralData/promoFormGeneralData';
import { PromoFormLocation } from '../PromoFormLocation/promoFormLocation';
import { PromoFormSpecificData } from '../PromoFormSpecificData/promoFormSpecificData';
import { PromoFormMultimedia } from '../PromoFormMultimedia/multimedia';
import { PromoFormSummary } from '../PromoFormSummary/promoFormSummary';
import SesContext from '../../contexts/sessionContext';
import { ErrorModal } from '../ErrorModal/errorModal';
import { useLocation, Link } from 'react-router-dom';
import { MYPROPERTIES } from '../../constants/routes';
import { Prompt } from 'react-router-dom';
import {
  action_array,
  minimumRent,
  minimumSell,
  dollarValue,
} from '../../assets/Strings';
import GalleryModal from '../../layouts/galleryModal';
import { setAlert } from '../Alert/alert';
import Alert from '../../highOrderComponents/alert';
import useFetch from '../../Hooks/useFetch';
import { get } from '../../firebase/wallet';
import Head from '../head';

function PromoForm(props) {
  const context = useContext(SesContext);
  let location = useLocation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    'Datos generales',
    'Ubicación del Inmueble',
    'Datos Específicos',
    'Multimedia',
    'Resumen del Anuncio',
  ];
  const [isGalleryModalActive, setIsGalleryModalActive] = useState(false);
  const [propertyTypeError, setPropertyTypeError] = useState(false);
  const [witicoins, setWiticoins] = useState(0);


  const initial_property_data = {
    action: action_array[0],
    price: null,
    currency: 'MXN',
    location: { lat: 19.3736078, lng: -99.17359640000001 },
    isExactLocation: true,
    isCommercial: false,
    sharesCom: true,
    bankSale: false,
    isActive: true,
    isEnabled: true,
    uId: context.uId,
    uploadDate: new Date(),
  };

  // if editing transform properdata url pictures to react state
  const url_property_data_files_to_state =
    !!location.state && location.state.properData
      ? {
          ...location.state.properData.photos,
          principalPhotoPath: location.state.properData.principalPhotoPath,
        }
      : {};

  const initial_property_data_from_location =
    !!location.state && !!location.state.properData
      ? location.state.properData
      : null;
  if (initial_property_data_from_location) {
    initial_property_data_from_location.photos =
      initial_property_data_from_location.photos || { extras: [] };
  }

  //delete pictures if using as template
  if (location.state && location.state.template) {
    delete location.state.template.principalPhotoPath;
    delete location.state.template.photos;
    delete location.state.template._id;
    delete location.state.template._ref;
    location.state.template.isActive = true;
    location.state.template.isEnabled = true;
  }

  // set initial data for template or properdata
  var proper_data_state = initial_property_data;
  if (location.state && location.state.properData)
    proper_data_state = location.state.properData;
  if (location.state && location.state.template)
    proper_data_state = location.state.template;
  const [properData, setProperData] = React.useState(proper_data_state);
  const pId =
    location.state && location.state.properData ? location.state.pId : null;

  const [openWarning, setOpenWarning] = React.useState({
    open: false,
    text: '',
  });
  const [orderedPictures, setOrderedPictures] = useState(
    url_property_data_files_to_state.extras || []
  ); // extras [FILES && URLS]
  const [principalPhotoPath, setPrincipalPhotoPath] = useState(
    url_property_data_files_to_state.principalPhotoPath || null
  ); //FILE || URL

  //get witiwallet
  useFetch(async () => {
    const wallet = await get(context.uId);
    setWiticoins(wallet.witicoins);
  }, []);

  // calculate price always in mxn
  const priceCalculated =
    properData.currency === 'USD'
      ? properData.price * dollarValue
      : properData.price;

  //create a array of pictures for gallery modal
  var photos_src_transformed = [];
  if (principalPhotoPath && orderedPictures.length > 0) {
    photos_src_transformed = [
      typeof principalPhotoPath === 'string'
        ? principalPhotoPath
        : principalPhotoPath.preview,
      ...orderedPictures.map((item) =>
        typeof item === 'string' ? item : item.preview
      ),
    ];
  }

  const handleGalleryModalActive = () => {
    setIsGalleryModalActive(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  //define user confirmation to leave
  const [get_user_confirm, set_get_user_confirm] = React.useState(false);
  const disableUserConfirmation = () => set_get_user_confirm(false);
  useEffect(() => {
    set_get_user_confirm(true);
  }, []);

  const handleOpenWarning = (data) => {
    setOpenWarning(data);
    setTimeout(() => {
      setOpenWarning({ ...openWarning, open: false });
    }, 4000);
  };

  //define proper data
  useEffect(() => {
    setProperData({
      ...properData,
      uId: context.uId,
      uploadDate: new Date(),
    });
  }, [context.uId]);

  function handleNext() {
    if (activeStep === 0) {
      if (!properData.propertyType) {
        setAlert(null, ' ', 'Selecciona el tipo de inmueble', 'warning');
        setPropertyTypeError(true);
        return false;
      }

      if (properData.action === 'buy' && priceCalculated < minimumSell)
        return handleOpenWarning({
          ...openWarning,
          open: true,
          text: 'Favor de colocar un precio',
        });

      if (properData.action === 'rent' && priceCalculated < minimumRent)
        return handleOpenWarning({
          ...openWarning,
          open: true,
          text: 'Favor de colocar un precio',
        });

      if (properData.action === 'buy' && priceCalculated < 500000)
        return setAlert(
          (event) => setActiveStep((prevActiveStep) => prevActiveStep + 1),
          'Este precio parece no corresponder a una venta',
          ' ',
          'warning',
          'Continuar',
          null,
          'Modificar precio'
        );

      if (properData.action === 'rent' && priceCalculated > 500000)
        return setAlert(
          (event) => setActiveStep((prevActiveStep) => prevActiveStep + 1),
          'Este precio parece no corresponder a una renta',
          ' ',
          'warning',
          'Continuar',
          null,
          'Modificar precio'
        );
    }

    if (activeStep === 1 && !properData.administrative_area_level_1)
      return handleOpenWarning({
        ...openWarning,
        open: true,
        text: 'Revisa que todos los campos de la dirección estén completos',
      });

    if (activeStep === 3 && !principalPhotoPath)
      return handleOpenWarning({
        ...openWarning,
        open: true,
        text: 'Falta colocar la fotografía principal. Recuerda que esta fotografía te ayuda mucho en la promoción de tu inmueble.',
      });

    // validaete description field that has no info contact
    // if (activeStep === 2 && properData.specificData && properData.specificData.propertyDescription) {
    //   const regEx = /(\.+\w{2})|([0-9]\s*){8}|(\w+\s*@\w+)/i
    //   var hasContact = properData.specificData.propertyDescription.match(regEx)
    //   if (hasContact) return setAlert(
    //     null,
    //     ' ',
    //     'No puedes colocar datos de contacto',
    //     'error'
    //   )
    // }

    setActiveStep((currentStep) => currentStep + 1);
    window.scrollTo(0, 0);
  }

  function handleBack() {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleReset() {
    location.state = null;
    window.scrollTo(0, 0);
    setProperData(initial_property_data);
    setOrderedPictures([]);
    setPrincipalPhotoPath(null);
    setActiveStep(0);
    set_get_user_confirm(true);
  }

  return (
    <React.Fragment>
      <Head title="Subir inmueble" />
      {isGalleryModalActive && (
        <GalleryModal
          handleClose={() => setIsGalleryModalActive(false)}
          photos={photos_src_transformed}
        />
      )}
      <Prompt when={get_user_confirm} message="" />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} lg={12} xl={10}>
          <Paper className={classes.paperWrapper}>
            <Box pt={8} pb={8}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={10}>
                  <Typography className={classes.text} variant="h4">
                    {initial_property_data_from_location
                      ? 'Editar anuncio'
                      : 'Anuncio nuevo'}
                  </Typography>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>
                          <span className={classes.label}>{label}</span>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {activeStep === steps.length && (
                      <div style={{ minHeight: '65vh' }}>
                        <Typography
                          className={classes.instructions}
                          variant="h5"
                        >
                          Listo, tu inmueble ha sido cargado con éxito !
                        </Typography>
                        <ButtonStyled
                          color="primary"
                          variant="outlined"
                          onClick={handleReset}
                        >
                          Subir otro inmueble
                        </ButtonStyled>
                        <Link className={classes.link} to={MYPROPERTIES}>
                          <ButtonStyled color="primary" variant="outlined">
                            Ver Mis Inmuebles
                          </ButtonStyled>
                        </Link>
                      </div>
                    )}
                    {steps !== steps.length && (
                      <div>
                        <Grid container alignContent="center" justify="center">
                          <Grid item xs={10} xl={10}>
                            {activeStep === 0 && (
                              <PromoFormGeneralData
                                propertyTypeError={propertyTypeError}
                                setPropertyTypeError={setPropertyTypeError}
                                properData={properData}
                                setProperData={setProperData}
                                renderActionAndProperty={
                                  location.state && location.state.properData
                                    ? false
                                    : true
                                }
                              />
                            )}
                            {activeStep === 1 && (
                              <PromoFormLocation
                                properData={properData}
                                setProperData={setProperData}
                              />
                            )}
                            {activeStep === 2 && (
                              <PromoFormSpecificData
                                properData={properData}
                                setProperData={setProperData}
                                specificData={
                                  properData.specificData !== undefined
                                    ? properData.specificData
                                    : undefined
                                }
                              />
                            )}
                            {activeStep === 3 && (
                              <PromoFormMultimedia
                                properData={properData} // data of the property
                                orderedPictures={orderedPictures}
                                setOrderedPictures={setOrderedPictures}
                                principalPhotoPath={principalPhotoPath}
                                setPrincipalPhotoPath={setPrincipalPhotoPath}
                              />
                            )}
                            {activeStep === 4 && (
                              <PromoFormSummary
                                witicoins={witicoins}
                                handleGalleryModalActive={
                                  handleGalleryModalActive
                                }
                                properData={properData}
                                orderedPictures={orderedPictures}
                                principalPhotoPath={principalPhotoPath}
                                setActiveStep={setActiveStep}
                                pId={pId}
                                disableUserConfirmation={
                                  disableUserConfirmation
                                }
                                initial_property_data_from_location={
                                  initial_property_data_from_location
                                }
                              />
                            )}
                          </Grid>
                        </Grid>
                        <div>
                          {activeStep !== steps.length && (
                            <ButtonStyled
                              color="primary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              variant="outlined"
                            >
                              Regresar
                            </ButtonStyled>
                          )}
                          {activeStep < steps.length - 1 && (
                            <ButtonStyled
                              hover="#1E0E6F"
                              color="primary"
                              variant="contained"
                              onClick={handleNext}
                            >
                              {steps[activeStep + 1]}
                            </ButtonStyled>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ErrorModal
        alarmText={openWarning.text}
        open={openWarning.open}
        handleClose={handleOpenWarning}
      />
    </React.Fragment>
  );
}

export default Alert(PromoForm);
