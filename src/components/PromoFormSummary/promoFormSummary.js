import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Hidden,
} from "@material-ui/core";
import { ImgLoader } from "../ImgLoader/imageLoader";
import paymentIcon from "../../assets/tarjeta_circulo_azul.svg";
import NumberFormat from "react-number-format";
import { propertyType_es, pAction_es } from "../../assets/Strings";
import { StaticGoogleMap, Path, Marker } from "react-static-google-map";
import connect from "../../firebase";
import useSession from "../../Hooks/useSession";
import { PropertyDetailSpecificData } from "../PropertyDetailSpecificData/propertyDetailSpecificData";
import { SpecificDataIcons } from "../SpecificDataIcons/specificDataIcons";
import {
  uploadPicture,
  multipleUploadPictures,
  transformFileToUrl,
} from "../../firebase/storage";
import { update, create } from "../../firebase/property";
import useStyles from "./styles";
import analytics from "react-ga";
import { isProduction } from "../../constants/globalConstraints";
import useWiticoins from "../../Hooks/useWiticoins";
import { isMyFirstProperty } from "../../firebase/property";
import { useHistory } from "react-router-dom";

export const PromoFormSummary = (props) => {
  const domRef = useRef({});
  const principalPhotoPathSrc =
    typeof props.principalPhotoPath === "string"
      ? props.principalPhotoPath
      : props.principalPhotoPath.preview;
  const classes = useStyles();
  const [uploadingCounter, setUploadingCounter] = useState(0);
  const [isCardFixed, setIsCardFixed] = useState(false);
  const session = useSession();
  const [currentMargin, setCurrentMargin] = useState(0);
  const witicoins = useWiticoins();
  const history = useHistory();

  var total_to_upload = props.orderedPictures.filter(
    (item) => typeof item != "string"
  ).length;
  if (typeof props.principalPhotoPath != "string")
    total_to_upload = total_to_upload + 1;

  // update margin fotter
  useEffect(() => {
    const onSizeChange = () => {
      setTimeout(() => {
        if (window.matchMedia("(max-width:1279px)").matches)
          setCurrentMargin(domRef.current.clientHeight);
        else setCurrentMargin(0);
      }, 50);
    };
    onSizeChange();
    window.addEventListener("resize", onSizeChange);
    return (event) => window.removeEventListener("resize", onSizeChange);
  }, [domRef.current.clientHeight]);

  const gracias = () => {
    const history = useHistory();
    history.push("/gracias");
  };
  // set fixed card
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 250) {
        setIsCardFixed(true);
      } else {
        setIsCardFixed(false);
      }
    };
    return () => (window.onscroll = null); // clean event in unmounting
  }, [isCardFixed]);

  const handleClickUploadButton = async () => {
    props.disableUserConfirmation(); // remove leave confirmation
    const isMyFirstPropertyStatus = await isMyFirstProperty(session.uId);
    var property_id;
    var counter_uploaded = 1;
    setUploadingCounter(counter_uploaded);
    var principalPhotoPathUrl = null;

    //update or create property
    if (props.initial_property_data_from_location) {
      const not_delete_photos = props.orderedPictures.filter(
        (item) => typeof item === "string"
      );
      const secureData = {
        ...props.properData,
        photos: { extras: not_delete_photos },
        finished: 0,
      };
      delete secureData._ref;
      delete secureData._id;
      property_id = await update(session.uId, props.pId, secureData);
    } else {
      if (isProduction) {
        analytics.event({
          category: session.uId,
          action: "upload property",
          label: props.properData.action,
        });
      }
      var secureData = {
        specificData: {},
        ...props.properData,
        isActive: true,
        photos: { extras: [] },
        finished: 0,
        interestedCount: 0,
        principalPhotoPath: "",
      };
      property_id = await create(session.uId, secureData);
    }

    // upload principal photo path
    if (props.initial_property_data_from_location) {
      if (typeof props.principalPhotoPath !== "string") {
        principalPhotoPathUrl = await uploadPicture(
          `witideal/${session.uId}/${property_id}`,
          props.principalPhotoPath
        );
        await connect.property.deletePrincipalPhotoPath(
          session.uId,
          props.initial_property_data_from_location._id,
          props.initial_property_data_from_location.principalPhotoPath
        );
        counter_uploaded++;
        if (counter_uploaded <= total_to_upload)
          setUploadingCounter(counter_uploaded);
      } else {
        principalPhotoPathUrl = props.properData.principalPhotoPath;
      }
    } else {
      principalPhotoPathUrl = await uploadPicture(
        `witideal/${session.uId}/${property_id}`,
        props.principalPhotoPath
      );
      counter_uploaded++;
      if (counter_uploaded <= total_to_upload)
        setUploadingCounter(counter_uploaded);
    }

    // update pictures
    if (props.initial_property_data_from_location) {
      const files_to_upload = props.orderedPictures.filter(
        (item) => typeof item !== "string"
      );
      await multipleUploadPictures(
        `witideal/${session.uId}/${property_id}/extras`,
        files_to_upload,
        async () => {
          counter_uploaded = counter_uploaded + 1;
          if (counter_uploaded <= total_to_upload)
            setUploadingCounter(counter_uploaded);
        }
      );

      // delete old photos on storage
      const old_photos_url =
        props.initial_property_data_from_location.photos.extras || [];
      const not_deleted_photos = props.orderedPictures.filter(
        (item) => typeof item === "string"
      );
      const photos_to_delete = old_photos_url.filter(
        (item) => !not_deleted_photos.includes(item)
      );
      await Promise.all(
        photos_to_delete.map((photo) =>
          connect.property.deletePhoto(session.uId, props.pId, photo)
        )
      );
    } else {
      // upload pictures for new property
      const files_to_upload = props.orderedPictures.filter(
        (item) => typeof item !== "string"
      );
      await multipleUploadPictures(
        `witideal/${session.uId}/${property_id}/extras`,
        files_to_upload,
        async () => {
          counter_uploaded = counter_uploaded + 1;
          if (counter_uploaded <= total_to_upload)
            setUploadingCounter(counter_uploaded);
        }
      );
    }

    // update info
    const orderedPictures = props.orderedPictures.map((item) => {
      return typeof item === "string"
        ? item
        : transformFileToUrl(
            `witideal/${session.uId}/${property_id}/extras`,
            item
          );
    });
    await update(session.uId, property_id, {
      "photos.extras": orderedPictures,
      principalPhotoPath: principalPhotoPathUrl,
      finished: 2,
    });

    if (counter_uploaded <= total_to_upload) setUploadingCounter(0);
    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // open modal
    if (isMyFirstPropertyStatus) {
      history.push("/mis-propiedades");
      window.successUpload.open(isMyFirstPropertyStatus);
    } else if (witicoins < 100) {
      window.successUpload.open();
    }
  };

  const GMapCircle = (lat, lng, rad, detail = 10) => {
    var circlePoints = [];
    var r = 6371;
    var pi = Math.PI;
    var _lat = (lat * pi) / 180;
    var _lng = (lng * pi) / 180;
    var d = rad / 1000 / r;
    var i = 0;
    for (i = 0; i <= 360; i += detail) {
      var brng = (i * pi) / 180;
      var pLat = Math.asin(
        Math.sin(_lat) * Math.cos(d) +
          Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
      );
      var pLng =
        ((_lng +
          Math.atan2(
            Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
            Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
          )) *
          180) /
        pi;
      pLat = (pLat * 180) / pi;
      circlePoints.push({ lat: pLat, lng: pLng });
    }
    return circlePoints;
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        {/* Left Side render */}
        <Grid item xs={12} lg={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
                className={classes.subtitleText}
              >
                Confirma la información de tu inmueble
              </Typography>
              <Grid item xs={12}>
                <img
                  className={classes.mainPhoto}
                  src={principalPhotoPathSrc}
                  alt="ainphoto"
                  onClick={props.handleGalleryModalActive}
                />
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.subtitleText}
                >{`Se subirán ${total_to_upload} imágenes.`}</Typography>
              </Grid>
              <Box p={3}>
                <Typography className={classes.subtitles}>
                  {" "}
                  El costo del inmueble es:{" "}
                </Typography>
                <NumberFormat
                  value={props.properData.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" " + props.properData.currency}
                  renderText={(value) => (
                    <Typography
                      variant="h4"
                      align="center"
                      className={classes.subtitleText}
                    >
                      $ {value}{" "}
                    </Typography>
                  )}
                />
              </Box>
              <Typography
                variant="h5"
                align="center"
                className={classes.subtitleText}
              >
                {propertyType_es[props.properData.propertyType]}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                className={classes.subtitles}
                gutterBottom
              >
                {pAction_es[props.properData.action]}
              </Typography>
              <Typography align="center">
                {props.properData.specificData
                  ? props.properData.specificData.propertyTitle
                  : ""}
              </Typography>
              <Typography align="center">
                {props.properData.specificData
                  ? props.properData.specificData.propertyDescription
                  : ""}
              </Typography>
            </Grid>

            {props.properData.action === "buy" && (
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.card}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle1"
                      className={classes.subtitleText}
                      align="left"
                    >
                      {" "}
                      Remate Bancario
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      align="left"
                      className={classes.cardTextRes}
                    >
                      {props.properData.bankSale ? "Sí" : "No"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <SpecificDataIcons properData={props.properData.specificData} />
            </Grid>
            {props.properData.specificData && (
              <Grid item xs={12}>
                <PropertyDetailSpecificData
                  specificData={props.properData.specificData}
                />
              </Grid>
            )}

            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  className={classes.subtitleText}
                >
                  Ubicación
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StaticGoogleMap
                  apiKey="AIzaSyCVzD2DnsLYxkD5sNF_IOSF24h5r6JiR9o"
                  center={
                    props.properData.lat === undefined ||
                    props.properData.lng === undefined
                      ? "19.432608,-99.133209"
                      : `${props.properData.lat},${props.properData.lng}`
                  }
                  zoom="17"
                  size="350x350"
                >
                  {props.properData.isExactLocation ? (
                    <Marker
                      iconURL="https://tinyurl.com/y4wlmdeb"
                      location={
                        props.properData.lat === undefined ||
                        props.properData.lng === undefined
                          ? "19.432608,-99.133209"
                          : `${props.properData.lat},${props.properData.lng}`
                      }
                    /> //Poner bandera en la vista para saber si es exacto o no
                  ) : (
                    <Path
                      fillcolor="0x4eb2e490"
                      weight="2"
                      points={GMapCircle(
                        props.properData.lat === undefined ||
                          props.properData.lng === undefined
                          ? 19.432608
                          : props.properData.lat,
                        props.properData.lat === undefined ||
                          props.properData.lng === undefined
                          ? -99.133209
                          : props.properData.lng,
                        200
                      )}
                    />
                  )}
                </StaticGoogleMap>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  {props.properData.route || ""}
                  {props.properData.street_number || ""}
                  {props.properData.int_number || ""},
                  {props.properData.sublocality_level_1 || ""},
                  {props.properData.administrative_area_level_2_3 || ""},
                  {props.properData.postal_code || ""}
                </Typography>
                {props.properData.administrative_area_level_1 && (
                  <Typography variant="subtitle2" align="center">
                    {props.properData.administrative_area_level_1}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side render */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            className={
              isCardFixed ? classes.floatingCard_fixed : classes.floatingCard
            }
            ref={domRef}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `.master_footer {margin-bottom: ${currentMargin}px}`,
              }}
            />
            <Box p={2}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Hidden mdDown>
                  <Grid item xs={12}>
                    <img src={paymentIcon} alt="payment method icon" />
                  </Grid>
                </Hidden>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.subtitleText}
                  >
                    {!props.initial_property_data_from_location
                      ? "Publicar anuncio"
                      : "Guardar cambios"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={gracias}
                    variant="contained"
                    size="large"
                    className={classes.confirm}
                    onClick={handleClickUploadButton}
                  >
                    Confirmar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ImgLoader
        open={uploadingCounter ? true : false}
        handleClose={() => {}}
        uploadedElems={uploadingCounter}
        total_to_upload={total_to_upload}
      ></ImgLoader>
    </React.Fragment>
  );
};
