import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, IconButton } from '@material-ui/core';
import NumberFormat from "react-number-format";
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { propertyType_es, action_es } from '../../assets/Strings'
import sessionContext from '../../contexts/sessionContext'
import urlTranslator from '../../helpers/urlTranslator'

const wdPurpleSubtitle = '#1E0E6F';
const wdWhiteBackground = '#FFFFFF';
const wdBlueBackground = '#3F19F9';

const useStyles = makeStyles({
  subtitleText: {
    color: wdPurpleSubtitle,
    fontWeight: 700
  },
  link: {
    textDecoration: 'none',
    color: wdPurpleSubtitle
  },
  coincidenceType: {
    color: wdPurpleSubtitle,
    fontWeight: 700,
  },
  coincidenceWrapper: {
    backgroundColor: '#efeaf7'
  },
  textWrapper: {
    height: 100,
    width: '100%',
    overflow: 'hidden'
  },
  area: {
    position: 'relative',
    height: '100%'
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: wdWhiteBackground,
    borderRadius: 100,
    zIndex: 1
  },
  iconBlue: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: wdBlueBackground,
    borderRadius: 100,
    zIndex: 1
  },
  iconLike: {
    color: wdBlueBackground

  },
  iconLikeWhite: {
    color: wdWhiteBackground

  }

});

function FavoriteCard(props) {
  const classes = useStyles();
  const [isFavorite] = React.useState(true)
 
  const {_id, action, propertyType} = props.properData
  const session = useContext(sessionContext)

  const handleClick = () => {
    props.handleDeleteFavorite(props.properData._ref);
  }

  return (
    <React.Fragment>
      <Card className={classes.area} >
        <Grid item className={isFavorite ? classes.iconBlue : classes.icon}>
          <IconButton onClick={handleClick}>
            {isFavorite ? <FavoriteIcon className={classes.iconLikeWhite} /> : <FavoriteBorderIcon className={classes.iconLike} />}
          </IconButton>
        </Grid>
        <Link className={classes.link} to={`/propiedad/${urlTranslator(props.properData.propertyType)}/${urlTranslator(props.properData.action)}/${props.properData._id}`} target='_blank'>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Imagen de la Propiedad"
              height="250"
              image={props.properData.principalPhotoPath !== undefined ? props.properData.principalPhotoPath : "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2FO77Sae7IfHRUem9FeZ54Uwpjbnn2%2FClMIb9hshbNbEAuMr3bD%2Fthumb%401100_JPEG_20191125_224414_743451701026495907.jpeg?alt=media&token=5ac2f147-9ca6-4406-85a3-0e8e2d74c3b1"}
              title="Imagen de la Propiedad">
            </CardMedia>
            <CardContent>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={7}>
                  <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12}>
                      <NumberFormat
                        value={props.properData.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$ '}
                        suffix={` ${props.properData.currency}`}
                        renderText={value => <Typography variant='h5' gutterBottom align='center' className={classes.subtitleText}>{value} </Typography>}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.subtitleText} align='center' variant='subtitle1'>{propertyType_es[props.properData.propertyType]} para {action_es[props.properData.action]}</Typography>
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12}>

                  <Typography variant='body1' align='center'>
                    {props.properData.route !== undefined ? props.properData.route : ''} 
                    {props.properData.street_number !== undefined ? props.properData.street_number : ''} 
                    {props.properData.int_number !== undefined ? props.properData.int_number : ''}, 
                    {props.properData.sublocality_level_1 !== undefined ? props.properData.sublocality_level_1 : ''}, 
                    {props.properData.administrative_area_level_2_3 !== undefined ? props.properData.administrative_area_level_2_3 : ''}, 
                    {props.properData.postal_code !== undefined ? props.properData.postal_code : ''}. 
                    {props.properData.administrative_area_level_1 !== undefined ? props.properData.administrative_area_level_1 : ''}
                  </Typography>

                </Grid>
              </Grid>
             
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </React.Fragment>

  );
}

export default FavoriteCard
