import React from "react";
import {
  Grid,
  Card,
  Typography,
  IconButton,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import urlTranslator from "../../helpers/urlTranslator";

const wdPurpleSubtitle = "#1E0E6F";
const wdWhiteBackground = "#FFFFFF";
const wdBlueBackground = "#3F19F9";

const useStyles = makeStyles({
  subtitleText: {
    textAlign: "center",
    color: wdPurpleSubtitle,
    fontWeight: 500,
  },
  link: {
    textDecoration: "none",
    color: wdPurpleSubtitle,
  },
  coincidenceType: {
    fontSize: ".75em",
    color: wdPurpleSubtitle,
    fontWeight: 500,
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
    minHeight: 220,
    boxSizing: "border-box",
    height: "70%",
    width: "100%",
    "@media(max-width:1805px)": {
      height: "67%",
    },
  },

  cardContent: {
    minHeight: 100,
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
  iconDestacado: {
    position: "absolute",
    top: 1,
    left: 1,
    borderRadius: 100,
    zIndex: 1,
  },
  iconLike: {
    color: wdBlueBackground,
  },
  iconLikeWhite: {
    color: wdWhiteBackground,
  },
  img: {
    height: 150,
    "@media(max-width:1872px)": {
      height: 125,
    },
    "@media(max-width:1805px)": {
      height: 120,
    },
  },
});

const DestacadosCard = ({ destacado }) => {
  const classes = useStyles();

  console.log(destacado);

  return (
    <Card className={classes.area}>
      <CardActionArea className="h-100">
        <Grid item className={classes.iconDestacado}>
          <IconButton>
            <Chip label="Destacado" size="small" />
          </IconButton>
        </Grid>

        <Grid item className={classes.iconBlue}>
          <IconButton size="small">
            <FavoriteIcon fontSize="small" className={classes.iconLikeWhite} />
          </IconButton>
        </Grid>
        <Link
          className={classes.link}
          to={`/propiedad/${urlTranslator(
            destacado.propertyType
          )}/${urlTranslator(destacado.action)}/${destacado.id}`}
          target="_blank"
        >
          <CardMedia
            component="img"
            alt="Imagen de la Propiedad"
            className={classes.img}
            image={
              destacado
                ? destacado.principalPhotoPath
                : "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2FAD6LUP9cV4cQiVmbqbv32hTgMNp1%2F1GUPPh9iVD2JX2MLBxOO%2Fthumb%401100_98809_WhatsApp%20Image%202021-02-16%20at%2011.35.59%20AM%20(1).jpeg?alt=media"
            }
            title="Imagen de la Propiedad"
          ></CardMedia>
          <CardContent className={classes.cardContent}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} md={7}>
                <Grid container justifyContent="center" alignItems="center">
                  <Typography
                    className={classes.subtitleText}
                    align="center"
                    variant="caption"
                  >
                    ${destacado.price} {destacado.currency}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  {destacado.locality}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default DestacadosCard;
