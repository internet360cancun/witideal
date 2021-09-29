import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/compat/app";
import { makeStyles, styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { propertyType_es } from "../../assets/Strings";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { UPLOAD } from "../../constants/routes";
import useFirebaseTools from "../../Hooks/useFirebaseTools";
import { Link } from "react-router-dom";
import SesContext from "../../contexts/sessionContext";
import copy from "copy-to-clipboard";
import { setAlert } from "../Alert/alert";
import urlTranslator from "../../helpers/urlTranslator";
import { useRole } from "../../Hooks/useRole";

const wdRegularBlue = "#3F19F9";
const wdGeneralText = "#160A53";

const LoadingContent = styled("div")({
  height: "100%",
  minHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const useStyles = makeStyles((theme) => ({
  card_loading: {
    display: "",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    textAlign: "left",
    borderRadius: 10,
    height: "100%",
    boxSizing: "border-box",
  },
  hamBtn: {
    top: 0,
    float: "right",
    position: "relative",
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
  },
  media: {
    height: 350,
    "@media (min-width: 960px)": {
      height: 370,
    },
  },
  regularBlueButton: {
    backgroundColor: wdRegularBlue,
    color: "white",
    borderRadius: 100,
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#1E0E6F",
    },
  },
  outlineButton: {
    border: "1px solid #41B8F9",
    color: wdRegularBlue,
    borderRadius: 100,
    fontSize: ".8rem",
    textTransform: "capitalize",
  },
  errorText: {
    color: "red",
    fontWeight: 700,
  },

  regularBlueText: {
    color: wdRegularBlue,
    fontWeight: 700,
  },
  generalText: {
    color: wdGeneralText,
  },
  generalTextBold: {
    color: wdGeneralText,
    fontWeight: 700,
    letterSpacing: 1,
  },

  link: {
    textDecorationLine: "none",
    cursor: "pointer",
    "&:hover": {
      color: "transparent",
    },
  },
  containerText: {
    height: 360,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    "@media (min-width: 960px)": {
      height: 390,
    },
  },
  principal: {
    height: 360,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      "& .MuiCardContent-root": {
        padding: 0,
      },
      "@media (min-width: 960px)": {
        height: 390,
      },
    },
  },
}));

const action_es = {
  buy: "Vender",
  rent: "Rentar",
};

/*
Props 
propertyPhoto: shows the main photo of the property
price: property price
location: property location

*/

export function MyPropertyCard(props) {
  const propsData = props.properData;
  const db = firebase.firestore();
  const classes = useStyles();
  const { toggleEnable, updateDestProperty, setDest, setDest2 } =
    useFirebaseTools();
  const context = useContext(SesContext);
  const { subscription } = useRole();
  const [misDestacados, setMisDestacados] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let d =
    propsData.uploadDate !== undefined ? propsData.uploadDate.toDate() : "";
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const uploadDate = d.toLocaleDateString("es-mx", options);

  let history = useHistory();

  // Trae mis destacados
  useEffect(() => {
    const getDest = async (uId) => {
      try {
        const docSnap = await db
          .doc(`production/Users/${uId}/properties/`)
          // .where("current_period_end", ">=", Date.now() / 1000)
          //Se le debe de agregar el current_period_end a los destProperties del usuario
          .get()
          .then((snapshot) => {
            snapshot.data().destProperties.forEach((element) => {
              element.get().then((snap) => {
                setMisDestacados((oldArray) => [
                  ...oldArray,
                  { id: snap.id, ...snap.data() },
                ]);
              });
            });
          });
        return docSnap;
      } catch (error) {
        console.log("error", error);
        return undefined;
      }
    };
    getDest(context.uId);
  }, [context.uId, db, subscription]);

  const [isDestProperty, setIsDestProperty] = useState(
    propsData.isDestProperty !== undefined ? propsData.isDestProperty : false
  );
  // const [isAvailDestProperty, setIsAvailDestProperty] = useState(
  //   props.destNumber <= props.subscriptionNumber ? true : false
  // );

  props.setIsDestAvailable(
    props.destNumber <= props.subscriptionNumber ? true : false
  );

  const handleToggleDestacados = (pId, uId, gender, action, subscription) => {
    //Destaca la propiedad

    setDest(pId, gender, action, uId);
    setDest2(pId, gender, action, subscription);

    //Cambia estado de la propiedad
    updateDestProperty(!isDestProperty, pId, uId);
    setIsDestProperty(!isDestProperty);
    if (!isDestProperty === true) {
      props.setDestNumber(props.destNumber + 1);
      props.destNumber + 1 <= props.subscriptionNumber
        ? props.setIsDestAvailable(true)
        : props.setIsDestAvailable(false);
    }

    //Notificación
    toast.success("Propiedad destacada con éxito", {
      duration: 2800,
      position: "top-center",
      style: {
        backgroundColor: "#41b8f9",
        color: "white",
      },
    });
  };

  console.log(props.destNumber, "numero destacado");

  // user decides the value (1 or 0) for isEnabled
  const [isEnabled, setIsEnabled] = useState(
    propsData.isEnabled !== undefined ? propsData.isEnabled : false
  );
  var isActive = propsData.isActive !== undefined ? propsData.isActive : false;

  const handleShareModal = () => {
    copy(
      `${window.location.origin}/propiedad/${urlTranslator(
        propsData.propertyType
      )}/${urlTranslator(propsData.action)}/${props.properData._id}`
    );
    setAlert(
      null,
      " ",
      "El link del inmueble se ha copiado al portapapeles",
      "info"
    );
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log(propsData);
    return history.push(UPLOAD, {
      properData: { ...propsData, _ref: null },
      pId: props.properData._id,
    });
  };

  const publicWithThisTemplate = () => {
    console.log(propsData);
    return history.push(UPLOAD, { template: { ...propsData, _ref: null } });
  };

  const handleEnableOn = () => {
    let uId = context.uId;
    let pId = props.properData._id;

    toggleEnable(true, pId, uId);
    setIsEnabled(true);
  };

  const handleEnableOff = () => {
    let uId = context.uId;
    let pId = props.properData._id;
    toggleEnable(false, pId, uId);
    setIsEnabled(false);
  };

  const showMessageContacts = () => {
    if (!props.properData.interestedCount) return "Ver Contacto";
    if (props.properData.interestedCount === 1)
      return `Ver Contacto (${props.properData.interestedCount})`;
    return `Ver Contactos (${props.properData.interestedCount})`;
  };

  //define status
  if (!isActive) {
    //1 missing witicoins
    var activeStatus = 1;
  } else if (isActive && !isEnabled) {
    //2 user sets inactive
    var activeStatus = 2;
  } else if (isActive && isEnabled) {
    //3 succes, active ad
    var activeStatus = 3;
  }

  //renderStatus();
  const renderButtons = () => {
    switch (activeStatus) {
      case 1:
        return (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <Button
                size="medium"
                disabled
                fullWidth
                className={classes.outlineButton}
              >
                Activar Anuncio
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={4} xl={4}>
              <Button
                size="medium"
                fullWidth
                onClick={handleEdit}
                className={classes.outlineButton}
              >
                Editar
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={4} xl={4}>
              <Button
                onClick={() =>
                  history.push(`/contactos/${props.properData._id}`)
                }
                size="medium"
                fullWidth
                className={classes.outlineButton}
              >
                {showMessageContacts()}
              </Button>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <Button
                size="medium"
                onClick={handleEnableOn}
                fullWidth
                className={classes.regularBlueButton}
              >
                Activar Anuncio
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={4} xl={4}>
              <Button
                size="medium"
                fullWidth
                onClick={handleEdit}
                className={classes.outlineButton}
              >
                Editar
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={4} xl={4}>
              <Button
                onClick={() =>
                  history.push(`/contactos/${props.properData._id}`)
                }
                size="medium"
                fullWidth
                className={classes.outlineButton}
              >
                {showMessageContacts()}
              </Button>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Toaster />
            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Button
                size="medium"
                onClick={handleEnableOff}
                fullWidth
                className={classes.outlineButton}
              >
                Desactivar Anuncio
              </Button>
            </Grid>
            <Grid item xs={6} md={6} lg={3} xl={3}>
              <Button
                size="medium"
                fullWidth
                onClick={handleEdit}
                className={classes.outlineButton}
              >
                Editar
              </Button>
            </Grid>

            {subscription && !isDestProperty &&  props.destNumber < props.subscriptionNumber && (
                <Grid item xs={6} md={6} lg={3} xl={3}>
                  <Button
                    size="medium"
                    fullWidth
                    onClick={() =>
                      handleToggleDestacados(
                        propsData._id,
                        context.uId,
                        propsData.propertyType,
                        propsData.action,
                        subscription
                      )
                    }
                    className={classes.outlineButton}
                  >
                    Destacar propiedad
                  </Button>
                </Grid>
              )}

            {isDestProperty && (
              <Grid item xs={6} md={6} lg={3} xl={3}>
                <Button
                  size="medium"
                  fullWidth
                  disabled
                  className={classes.outlineButton}
                >
                  Propiedad destacada
                </Button>
              </Grid>
            )}

            <Grid item xs={6} md={6} lg={3} xl={3}>
              <Button
                onClick={() =>
                  history.push(`/contactos/${props.properData._id}`)
                }
                size="medium"
                fullWidth
                className={classes.regularBlueButton}
              >
                {showMessageContacts()}
              </Button>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const renderStatusMessage = () => {
    switch (activeStatus) {
      case 1:
        return (
          <React.Fragment>
            <Typography className={classes.errorText} variant="subtitle1">
              Anuncio inactivo por falta de witicoins
            </Typography>
            <Typography className={classes.errorText} variant="subtitle2">
              {" "}
              Te sugerimos recargar tus witicoins para que tus clientes puedan
              seguir viendo tus anuncios.
            </Typography>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography className={classes.generalTextBold} variant="subtitle1">
              Anuncio Inactivo
            </Typography>
            <Typography className={classes.generalTextBold} variant="subtitle2">
              {" "}
              Si deseas activar este anuncio, sólo presiona el boton "Activar
              Anuncio".
            </Typography>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <Typography className={classes.regularBlueText} variant="subtitle1">
              Anuncio Activo
            </Typography>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  if (props.properData.loading)
    return (
      <LoadingContent>
        <CircularProgress />
      </LoadingContent>
    );

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div className={classes.hamBtn}>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClose={handleClose} onClick={handleShareModal}>
              Compartir
            </MenuItem>
            <MenuItem
              onClose={handleClose}
              onClick={() => history.push(`/contactos/${props.properData._id}`)}
            >
              {showMessageContacts()}
            </MenuItem>
            <MenuItem
              onClose={handleClose}
              onClick={() => {
                publicWithThisTemplate(props.properData);
                setAnchorEl(null);
              }}
            >
              Usar inmueble como plantilla
            </MenuItem>
            <MenuItem
              onClose={handleClose}
              onClick={() => {
                props.handleDelete(props.properData._id);
                setAnchorEl(null);
              }}
            >
              Eliminar Anuncio
            </MenuItem>
          </Menu>
        </div>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 45 }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" align="center">
              PID:{props.properData._id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" align="center">
              Publicado: {uploadDate}
            </Typography>
          </Grid>
        </Grid>
        {/*link area */}
        <CardActionArea>
          <Link
            className={classes.link}
            to={`/propiedad/${
              urlTranslator(propsData.propertyType) !== undefined
                ? urlTranslator(propsData.propertyType)
                : ""
            }/${
              urlTranslator(propsData.action) !== undefined
                ? urlTranslator(propsData.action)
                : ""
            }/${props.properData._id}`}
          >
            <Grid container className={classes.principal} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  style={activeStatus !== 3 ? { opacity: 0.5 } : { opacity: 1 }}
                  className={classes.media}
                  image={
                    propsData.principalPhotoPath !== undefined
                      ? propsData.principalPhotoPath
                      : "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg"
                  }
                  title="Foto del Inmueble"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent>
                  <Grid container className={classes.containerText}>
                    <Box pl={3} pr={2}>
                      {
                        <NumberFormat
                          value={
                            propsData.price !== undefined ? propsData.price : 0
                          }
                          thousandSeparator={true}
                          displayType={"text"}
                          prefix={"$"}
                          suffix={` ${propsData.currency}`}
                          renderText={(value) => (
                            <Typography
                              style={
                                activeStatus !== 3
                                  ? { opacity: 0.5 }
                                  : { opacity: 1 }
                              }
                              gutterBottom
                              className={classes.regularBlueText}
                              variant="h5"
                              align="left"
                            >
                              {value}
                            </Typography>
                          )}
                        />
                      }
                      <Grid item xs={12}>
                        <Typography
                          style={
                            activeStatus !== 3
                              ? { opacity: 0.5 }
                              : { opacity: 1 }
                          }
                          className={classes.generalTextBold}
                          variant="h5"
                        >
                          {
                            propertyType_es[
                              propsData.propertyType !== undefined
                                ? propsData.propertyType
                                : 0
                            ]
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          style={
                            activeStatus !== 3
                              ? { opacity: 0.5 }
                              : { opacity: 1 }
                          }
                          className={classes.generalText}
                          gutterBottom
                          align="left"
                          variant="subtitle1"
                        >
                          {
                            action_es[
                              propsData.action !== undefined
                                ? propsData.action
                                : "buy"
                            ]
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          style={
                            activeStatus !== 3
                              ? { opacity: 0.5 }
                              : { opacity: 1 }
                          }
                          className={classes.generalText}
                          variant="h6"
                        >
                          {propsData.route !== undefined ? propsData.route : ""}{" "}
                          {propsData.street_number !== undefined
                            ? propsData.street_number
                            : ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          style={
                            activeStatus !== 3
                              ? { opacity: 0.5 }
                              : { opacity: 1 }
                          }
                          gutterBottom
                          className={classes.generalText}
                          variant="body1"
                        >
                          {propsData.sublocality_level_1 !== undefined
                            ? propsData.sublocality_level_1 + ","
                            : ""}{" "}
                          {propsData.administrative_area_level_2_3 !== undefined
                            ? propsData.administrative_area_level_2_3 + ","
                            : ""}{" "}
                          {propsData.administrative_area_level_1 !== undefined
                            ? propsData.administrative_area_level_1
                            : ""}
                        </Typography>
                      </Grid>
                      <Divider />
                      <Grid item xs={12}>
                        {renderStatusMessage()}
                      </Grid>
                    </Box>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Link>
        </CardActionArea>

        <CardActions>{renderButtons()}</CardActions>
      </Card>
    </React.Fragment>
  );
}
