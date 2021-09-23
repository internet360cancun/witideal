import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, IconButton, Icon, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { propertyType_es, action_es, dollarValue } from "../../assets/Strings";
import useSession from "../../Hooks/useSession";
import connect from "../../firebase";
import urlTranslator from "../../helpers/urlTranslator";
import stateNameTranslator from "../../helpers/stateNameTranslator";

// import roomIcon from '../../assets/roomIcon.svg';
// import parkIcon from '../../assets/figC.svg';
// import bathIcon from '../../assets/figD.svg';
// import areaIcon from '../../assets/figB.svg';

const wdPurpleSubtitle = "#1E0E6F";
const wdWhiteBackground = "#FFFFFF";
const wdBlueBackground = "#3F19F9";

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
    fontSize: ".95em",
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
    minHeight: 450,
    boxSizing: "border-box",
    height: "100%",
  },
  cardContent: {
    minHeight: 200,
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

export function PropertyCard(props) {
  const classes = useStyles();
  const session = useSession();
  const [favoriteReferences, setFavoriteReferences] = React.useState([]);

  const createSlugUrl = () => {
    try {
      let url = ``;
      if (props.properData.sublocality_level_1) {
        url = `${url}${props.properData.sublocality_level_1.replace(
          / /g,
          "-"
        )}-`;
      }

      if (props.properData.administrative_area_level_2_3) {
        url = `${url}${props.properData.administrative_area_level_2_3.replace(
          / /g,
          "-"
        )}-`;
      }

      if (props.properData.administrative_area_level_1) {
        url = `${url}${stateNameTranslator(
          props.properData.administrative_area_level_1
        ).replace(/ /g, "-")}`;
      } else {
        return "path";
      }
      return url;
    } catch (error) {
      return "path";
    }
  };

  // getFavoriteReferences
  useEffect(() => {
    if (session.SesState) {
      const unsubscribe = connect.users.onFavoriteChangeReferences(session.uId)(
        (references) => {
          setFavoriteReferences(references);
        }
      );
      return () => unsubscribe();
    }
  }, []);

  const isFavorite =
    favoriteReferences.filter((ref) => ref.path === props.properData._ref.path)
      .length > 0;

  // remove or add favorite
  const handleClick = async () => {
    if (!session.SesState) return false;
    if (isFavorite) {
      const favorites_filtered_ref = favoriteReferences.filter(
        (ref) => ref.path != props.properData._ref.path
      );
      connect.users.updateFavorite(session.uId, favorites_filtered_ref);
    } else {
      connect.users.updateFavorite(session.uId, [
        ...favoriteReferences,
        props.properData._ref,
      ]);
    }
  };

  return (
    <Card className={classes.area}>
      <CardActionArea className="h-100">
        <Grid item className={isFavorite ? classes.iconBlue : classes.icon}>
          <IconButton onClick={handleClick}>
            {isFavorite ? (
              <FavoriteIcon className={classes.iconLikeWhite} />
            ) : (
              <FavoriteBorderIcon className={classes.iconLike} />
            )}
          </IconButton>
        </Grid>
        <Link
          className={classes.link}
          to={`/propiedad/${urlTranslator(props.propertyType)}/${urlTranslator(
            props.action
          )}/${props.properData.pId}`}
        >
          <CardMedia
            component="img"
            alt="Imagen de la Propiedad"
            height="250"
            image={
              props.properData.principalPhotoPath !== undefined
                ? props.properData.principalPhotoPath
                : "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2FO77Sae7IfHRUem9FeZ54Uwpjbnn2%2FClMIb9hshbNbEAuMr3bD%2Fthumb%401100_JPEG_20191125_224414_743451701026495907.jpeg?alt=media&token=5ac2f147-9ca6-4406-85a3-0e8e2d74c3b1"
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
                  <Grid item xs={12}>
                    <NumberFormat
                      value={props.properData.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$ "}
                      suffix={props.properData.currency}
                      renderText={(value) => (
                        <Typography
                          variant="h6"
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
                      {propertyType_es[props.properData.propertyType]} para{" "}
                      {action_es[props.properData.action]}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={6}>
            <Typography className={classes.subtitleText} align='left' variant='subtitle2'>{action_es[props.properData.action]}</Typography>
          </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                {/*  ============   Coincidence Percentage */}
                <Paper className={classes.coincidenceWrapper} elevation={1}>
                  <Box p={1}>
                    <Typography
                      className={classes.coincidenceType}
                      variant="subtitle1"
                      align="center"
                    >
                      {`${props.properData.coincidence}% Coincidencia`}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  {props.properData.route !== undefined
                    ? props.properData.route
                    : ""}{" "}
                  {props.properData.street_number !== undefined
                    ? props.properData.street_number
                    : ""}{" "}
                  {props.properData.int_number !== undefined
                    ? props.properData.int_number
                    : ""}
                  ,{" "}
                  {props.properData.sublocality_level_1 !== undefined
                    ? props.properData.sublocality_level_1
                    : ""}
                  ,{" "}
                  {props.properData.administrative_area_level_2_3 !== undefined
                    ? props.properData.administrative_area_level_2_3
                    : ""}
                  ,{" "}
                  {props.properData.postal_code !== undefined
                    ? props.properData.postal_code
                    : ""}
                  .{" "}
                  {props.properData.administrative_area_level_1 !== undefined
                    ? props.properData.administrative_area_level_1
                    : ""}
                </Typography>
              </Grid>
            </Grid>
            {/*  ============   property location */}

            {/*  ============   Descriptive Text
        <div className={classes.textWrapper}>
        <Typography align='left' variant="body2" color="textSecondary" component="p">
          {props.properData.propertyDescription}
        </Typography>
        </div> */}
          </CardContent>
        </Link>
        {/* <Grid container justify="center" alignItems="center">
      <Grid item xs={2}>
      <img width="35" src={roomIcon} />
      </Grid>
      <Grid item xs={1}>
      <Typography>2</Typography>
      </Grid>
      <Grid item xs={2}>
      <img width="35" src={parkIcon} />
      </Grid>
      <Grid item xs={1}>
      <Typography>2</Typography>
      </Grid>
      <Grid item xs={2}>
      <img width="25" src={bathIcon} />
      </Grid>
      <Grid item xs={1}>
      <Typography>2</Typography>
      </Grid>
      <Grid item xs={2}>
      <img width="35" src={areaIcon} />
      </Grid>
      <Grid item xs={1}>
      <Typography>2</Typography>
      </Grid>

    </Grid> */}
      </CardActionArea>
    </Card>
  );
}
