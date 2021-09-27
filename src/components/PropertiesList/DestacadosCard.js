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
    height: "100%",
    width: "100%",
    paddingBottom:10
  },

  cardContent: {
    maxHeight: 100,
    
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
    height: 170,
  },
});

const DestacadosCard = ({ destacado }) => {
  const classes = useStyles();

  return (
    <Card className={classes.area}>
      <CardActionArea className="h-100">
        <Grid item className={classes.iconDestacado}>
          <IconButton>
            <Chip label="Destacado" size="small" />
          </IconButton>
        </Grid>

        <Grid item className={classes.iconBlue}>
          {/* <IconButton size="small">
            <FavoriteIcon fontSize="small" className={classes.iconLikeWhite} />
          </IconButton> */}
        </Grid>
        <Link
          className={classes.link}
          to={`/propiedad/${urlTranslator(
            destacado.propertyType
          )}/${urlTranslator(destacado.action)}/${destacado.id}`}
          
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
              <Typography
                className={classes.subtitleText}
                align="center"
                variant="caption"
              >
                ${destacado.price} {destacado.currency}
              </Typography>

              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  {destacado.locality}
                </Typography>
                <Typography variant="body1" align="center">
                  {destacado.route !== undefined ? destacado.route : ""}{" "}
                  {destacado.street_number !== undefined
                    ? destacado.street_number
                    : ""}{" "}
                  {destacado.int_number !== undefined
                    ? destacado.int_number
                    : ""}
                  ,{" "}
                  {destacado.sublocality_level_1 !== undefined
                    ? destacado.sublocality_level_1
                    : ""}
                  ,{" "}
                  {destacado.administrative_area_level_2_3 !== undefined
                    ? destacado.administrative_area_level_2_3
                    : ""}
                  ,{" "}
                  
                  .{" "}
                  {destacado.administrative_area_level_1 !== undefined
                    ? destacado.administrative_area_level_1
                    : ""}
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
