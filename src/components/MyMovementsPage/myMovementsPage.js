import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import SesContext from "../../contexts/sessionContext";
import { styled } from "@material-ui/styles";
import Head from "../head";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { propertyType_es, action_es } from "../../assets/Strings";
import { useRole } from "../../Hooks/useRole";
import urlTranslator from "../../helpers/urlTranslator";
import { risingStar, rockStar, superStar } from "../../constants/subscriptions";

const wdPurpleSubtitle = "#1E0E6F";
const wdWhiteBackground = "#FFFFFF";
const wdBlueBackground = "#3F19F9";

const wdRegularBlue = "#1E0E6F";

const Title = styled(Typography)({
  color: wdRegularBlue,
});

const Page = styled(Box)({
  minHeight: "70vh",
});

const useStyles = makeStyles({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700,
  },
  link: {
    textDecoration: "none",
    color: wdPurpleSubtitle,
  },
  coincidenceType: {
    color: wdPurpleSubtitle,
    fontWeight: 700,
  },
  coincidenceWrapper: {
    backgroundColor: "#efeaf7",
  },
  textWrapper: {
    height: 100,
    width: "100%",
    overflow: "hidden",
  },
  area: {
    position: "relative",
    height: "100%",
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: wdWhiteBackground,
    borderRadius: 100,
    zIndex: 1,
  },
  iconBlue: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: wdBlueBackground,
    borderRadius: 100,
    zIndex: 1,
  },
  iconLike: {
    color: wdBlueBackground,
  },
  iconLikeWhite: {
    color: wdWhiteBackground,
  },
});

const MyMovements = () => {
  const db = firebase.firestore();

  const context = useContext(SesContext);
  const classes = useStyles();
  const [destacados, setDestacados] = useState([]);
  const { subscription } = useRole();

  const today = Date.now();

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
                setDestacados((oldArray) => [
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

  return (
    <Page paddingTop={10}>
      <Head title="Mis Destacados" />
      <Grid container justifyContent="center" alignItems="center">
        <Grid className="py-3" item xs={12} lg={4}>
          <Box p={5}>
            <Title align="center" variant="h4">
              Mis Destacados
            </Title>

            {destacados.length > 0 &&
            destacados &&
            subscription.role === risingStar
              ? destacados
                  .filter((el, i) => {
                    return i % 2 === 0;
                  })
                  .slice(0, 3)
                  .map((properties) => (
                    <div key={properties.id} className="py-3">
                      <Card className={classes.area}>
                        <Grid item className={classes.icon}>
                          <IconButton>
                            <FavoriteBorderIcon className={classes.iconLike} />
                          </IconButton>
                        </Grid>
                        <Link
                          className={classes.link}
                          to={`/propiedad/${urlTranslator(
                            properties.propertyType
                          )}/${urlTranslator(properties.action)}/${
                            properties.id
                          }`}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Imagen de la Propiedad"
                              height="250"
                              image={properties.principalPhotoPath}
                              title="Imagen de la Propiedad"
                            ></CardMedia>
                            <CardContent>
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                              >
                                <Grid item xs={7}>
                                  <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Grid item xs={12}>
                                      <NumberFormat
                                        value={properties.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$ "}
                                        suffix={` ${properties.currency}`}
                                        renderText={(value) => (
                                          <Typography
                                            variant="h5"
                                            gutterBottom
                                            align="center"
                                            className={classes.subtitleText}
                                          >
                                            {value}{" "}
                                          </Typography>
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography
                                        className={classes.subtitleText}
                                        align="center"
                                        variant="subtitle1"
                                      >
                                        {
                                          propertyType_es[
                                            properties.propertyType
                                          ]
                                        }{" "}
                                        para {action_es[properties.action]}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}></Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </div>
                  ))
              : null}

            {destacados.length > 0 &&
            destacados &&
            subscription.role === rockStar
              ? destacados
                  .filter((el, i) => {
                    return i % 2 === 0;
                  })
                  .slice(0, 5)
                  .map((properties) => (
                    <div key={properties._id} className="py-3">
                      <Card className={classes.area}>
                        <Grid item className={classes.icon}>
                          <IconButton>
                            <FavoriteBorderIcon className={classes.iconLike} />
                          </IconButton>
                        </Grid>
                        <Link className={classes.link} to={`/`}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Imagen de la Propiedad"
                              height="250"
                              image={properties.principalPhotoPath}
                              title="Imagen de la Propiedad"
                            ></CardMedia>
                            <CardContent>
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                              >
                                <Grid item xs={7}>
                                  <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Grid item xs={12}>
                                      <NumberFormat
                                        value={properties.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$ "}
                                        suffix={` ${properties.currency}`}
                                        renderText={(value) => (
                                          <Typography
                                            variant="h5"
                                            gutterBottom
                                            align="center"
                                            className={classes.subtitleText}
                                          >
                                            {value}{" "}
                                          </Typography>
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography
                                        className={classes.subtitleText}
                                        align="center"
                                        variant="subtitle1"
                                      >
                                        {
                                          propertyType_es[
                                            properties.propertyType
                                          ]
                                        }{" "}
                                        para {action_es[properties.action]}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}></Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </div>
                  ))
              : null}

            {destacados.length > 0 &&
            destacados &&
            subscription.role === superStar
              ? destacados
                  .filter((el, i) => {
                    return i % 2 === 0;
                  })
                  .slice(0, 10)
                  .map((properties) => (
                    <div key={properties._id} className="py-3">
                      <Card className={classes.area}>
                        <Grid item className={classes.icon}>
                          <IconButton>
                            <FavoriteBorderIcon className={classes.iconLike} />
                          </IconButton>
                        </Grid>
                        <Link className={classes.link} to={`/`}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Imagen de la Propiedad"
                              height="250"
                              image={properties.principalPhotoPath}
                              title="Imagen de la Propiedad"
                            ></CardMedia>
                            <CardContent>
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                              >
                                <Grid item xs={7}>
                                  <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Grid item xs={12}>
                                      <NumberFormat
                                        value={properties.price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$ "}
                                        suffix={` ${properties.currency}`}
                                        renderText={(value) => (
                                          <Typography
                                            variant="h5"
                                            gutterBottom
                                            align="center"
                                            className={classes.subtitleText}
                                          >
                                            {value}{" "}
                                          </Typography>
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography
                                        className={classes.subtitleText}
                                        align="center"
                                        variant="subtitle1"
                                      >
                                        {
                                          propertyType_es[
                                            properties.propertyType
                                          ]
                                        }{" "}
                                        para {action_es[properties.action]}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}></Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                      </Card>
                    </div>
                  ))
              : null}
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default MyMovements;
