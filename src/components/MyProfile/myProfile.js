/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState, Fragment } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import thirdSec from "../../assets/balanceBackground.png";
import EmailIcon from "../../assets/emailIcon.png";
import PhoneIcon from "../../assets/phoneIcon.png";
import CompanyIcon from "../../assets/CompanyIcon.png";
import witiwalletIcon from "../../assets/witiwalletIcon.svg";
import SesContext from "../../contexts/sessionContext";
import useFirebaseTools from "../../Hooks/useFirebaseTools";
import { Link } from "react-router-dom";
import { COMPRARPAQUETES, MYMOVEMENTS } from "../../constants/routes";
import EditProfile from "../../pages/edit_profile";
import ModalPromo from "./modalPromo";
import Head from "../head";

import { useRole } from "../../Hooks/useRole";
import { risingStar, rockStar, superStar } from "../../constants/subscriptions";

const profilePhoto =
  "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40logIn.svg?alt=media&token=b5b57bad-a437-4691-bd6c-194c98514983";

const wdRegularBlue = "#3F19F9";
const wdLightGreen = "#32FFD2";
const wdDarkBlue = "#1E0E6F";
const wdLightBlue = "#41B8F9";
const wdLightGrey = "#F7F6FF";
const wdRegularGrey = "#E8E5FD";

const useStyle = makeStyles((theme) => ({
  currentBalance: {
    backgroundImage: `url(${thirdSec})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgrounRepeat: "no-repeat",
    borderRadius: 10,
    padding: theme.spacing(3),
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
  },
  paperContent: {
    borderRadius: 10,
    padding: theme.spacing(2),
    height: "100%",
    boxSizing: "border-box",
    wordWrap: "break-word",
  },

  spacingTop: {
    marginTop: 50,
    "@media (max-width:600px)": {
      marginTop: 10,
    },
  },

  sizelogo: {
    maxWidth: 50,
  },
  profilePhoto: {
    backgroundColor: wdLightGrey,
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  boxNextMedals: {
    border: "1.5px dashed #c2c2d6",
  },
  iconCurrentBalance: {
    position: "relative",
    zIndez: 1,
    //bottom: 20,
    width: 50,
    backgroundColor: "white",
    borderRadius: 100,
  },
  buttons: {
    backgroundColor: wdRegularBlue,
    textTransform: "none",
    color: "white",
    borderRadius: 50,
    marginTop: 10,
    fontSize: ".8em",
    fontWeight: "normal",
    padding: "6px 0px!important",
    "&:hover": {
      backgroundColor: wdDarkBlue,
    },
  },
  textLightGreen: {
    color: wdLightGreen,
    fontWeight: 700,
  },
  textWhite: {
    color: "white",
  },
  textBlue: {
    color: wdDarkBlue,
    "& img": {
      marginRight: 5,
    },
  },
  textBlueName: {
    color: wdDarkBlue,
    fontWeight: 700,
  },
  textWhiteB: {
    color: "white",
    fontWeight: 700,
  },

  backgroundNM: {
    backgroundColor: wdRegularGrey,
    padding: 10,
  },
  backgroundM: {
    backgroundColor: "white",
    padding: 10,
  },
  backgroundPaperM: {
    backgroundColor: wdRegularGrey,
  },
  outlinedButton: {
    borderColor: wdLightBlue,
    color: wdRegularBlue,
    backgroundColor: wdLightGrey,
    borderRadius: 50,
    fontWeight: 700,
    textTransform: "none",
  },
}));

export const MyProfile = () => {
  const { firebase } = useFirebaseTools();

  const context = useContext(SesContext);
  const classes = useStyle();

  const [wallet, setwallet] = useState({ witicoins: 0 });
  const [isModalActive, setModalActive] = useState(false); // editProfile
  const [isModalPromoActive, setModalPromo] = useState(false);

  const { subscription } = useRole();

  useEffect(() => {
    let unsub = firebase
      .firestore()
      .doc(`production/Users/${context.uId}/witiwallet`)
      .onSnapshot((doc) => {
        let witicoins = doc.data() !== undefined ? doc.data().witicoins : 0;
        setwallet({ witicoins: witicoins });
      });
    return () => {
      unsub();
    };
  }, [context.uId, firebase]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = useMediaQuery("(max-width:600px)");

  const ButtonActions = (
    <Grid item xs={12}>
      <Head title="Mi perfil" />
      <Box mb={{ md: 5, lg: 9 }}>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          className={classes.spacingTop}
        >
          {context.isPromoter && (
            <Grid item xs={12} sm={4}>
              <Link to={MYMOVEMENTS} style={{ textDecoration: "none" }}>
                <Button
                  className={classes.outlinedButton}
                  fullWidth
                  variant="outlined"
                >
                  Mis Destacados
                </Button>
              </Link>
            </Grid>
          )}
          {context.isPromoter && (
            <Grid item xs={12} sm={4}>
              <Link to="/mis-pagos" style={{ textDecoration: "none" }}>
                <Button
                  className={classes.outlinedButton}
                  fullWidth
                  variant="outlined"
                >
                  Mis Pagos
                </Button>
              </Link>
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <Link to="/mis-favoritos" style={{ textDecoration: "none" }}>
              <Button
                className={classes.outlinedButton}
                fullWidth
                variant="outlined"
              >
                Mis favoritos
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );

  const promoterbox = (disabeleElevation) => (
    <Grid item xs={12} sm={6}>
      <Paper
        className={classes.currentBalance}
        elevation={disabeleElevation ? 0 : 2}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <img
              className={classes.iconCurrentBalance}
              src={witiwalletIcon}
              alt="icono witideal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.textLightGreen} variant="h6">
              Witideal
            </Typography>
            <Typography
              style={{
                color: wallet.witicoins && wallet.witicoins < 0 ? "red" : "",
              }}
              className={classes.textWhiteB}
              variant="h2"
            >
              Paquetes
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography className={classes.textWhite} variant="subtitle1">
              Destaca tus inmuebles con nuestra publicidad y vende tus inmuebles
              más rápido
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Link to={COMPRARPAQUETES} style={{ textDecoration: "none" }}>
              <Button fullWidth className={classes.buttons}>
                Agregar paquete
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );

  const userBox = (
    <Grid item xs={12} sm={6} lg={6}>
      <Paper className={classes.paperContent}>
        <Box pt={3} pb={3}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item sm={12} md={4}>
              <Grid container justifyContent="center" alignItems="center">
                <Avatar
                  className={classes.profilePhoto}
                  src={context.PhotoURL ? context.PhotoURL : profilePhoto}
                  alt="User profile"
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.textBlue}
                    gutterBottom
                    variant={isMobile ? "h5" : "h4"}
                    align={isMobile ? "center" : "left"}
                  >
                    ¡Hola!
                    <br />
                    {subscription && subscription.role === risingStar
                      ? "Plan RisingStar"
                      : ""}
                    {subscription && subscription.role === rockStar
                      ? "Plan RockStar"
                      : ""}
                    {subscription && subscription.role === superStar
                      ? "Plan Super Star"
                      : ""}
                  </Typography>
                  <Typography
                    className={classes.textBlueName}
                    gutterBottom
                    variant={isMobile ? "h5" : "h4"}
                    align={isMobile ? "center" : "left"}
                  >
                    {context.Name || "Promotor Witideal"}{" "}
                    {context.lastname || ""}{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "gray" }}
                    align={isMobile ? "center" : "left"}
                    gutterBottom
                  >
                    UID: {context.uId}
                  </Typography>

                  <br />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBlue} align="left">
                    <img src={PhoneIcon} alt="icono telefóno" />
                    {context.phone}
                  </Typography>
                  <Typography className={classes.textBlue} align="left">
                    <img src={EmailIcon} alt="icono email" />
                    {context.Email}
                  </Typography>
                  {context.isPromoter && context.companyName && (
                    <Typography className={classes.textBlue} align="left">
                      <img src={CompanyIcon} alt="icono compania" />
                      {context.companyName}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs md={12} lg={4}>
              <Button
                onClick={() => setModalActive(true)}
                fullWidth
                className={classes.buttons}
              >
                Editar mi Perfil
              </Button>
            </Grid>
            {/* {context.isPromoter && (
            <Grid item xs md={12} lg={4}>
              <Button
                onClick={() => setModalPromo(true)}
                fullWidth
                className={classes.buttons}>Obtener descuentos
              </Button>
            </Grid>
          )} */}
          </Grid>
        </Box>
        <Hidden only={["sm", "md", "lg", "xl"]}>
          {context.isPromoter && <Box pt={5}>{promoterbox(true)}</Box>}
          {ButtonActions}
        </Hidden>
      </Paper>
    </Grid>
  );

  return (
    <Fragment>
      {isModalActive && (
        <EditProfile {...context} setModalActive={setModalActive} />
      )}
      <ModalPromo
        open={isModalPromoActive}
        onClose={() => setModalPromo(false)}
      />
      <Box p={1} pb={5} pt={8}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={10}
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            className={classes.spacingTop}
            container
          >
            {userBox}
            <Hidden only={["xs"]}>
              {context.isPromoter && promoterbox(false)}
              {ButtonActions}
            </Hidden>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};
