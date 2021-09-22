import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography, Grid, Icon, Box, Link } from '@material-ui/core';
import MyPropertiesIcon from '../../assets/myPropertiesIcon.png';
import Img from '../../assets/landing_background.jpg';
import NumberFormat from 'react-number-format';

const wdRegularBlue = '#3f19f9';
const colorOutlineButton = '#E8E5FD';
const wdLightGreen = '#32FFD2';
const wdGeneralText = '#160A53';

const useStyles = makeStyles({
  card: {
    width: 600,
    textAlign: 'left',
    borderRadius: 15,
  },
  media: {
    height: 250,
  },
  regularBlueButton: {
    backgroundColor: wdRegularBlue,
    color: wdLightGreen,
    borderRadius: 100,
  },
  outlineButton: {
    backgroundColor: colorOutlineButton,
    color: wdRegularBlue,
    borderRadius: 100,
    width: 100,
  },
  alignButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginButtom: 10,
  },
  regularBlueText: {
    color: wdRegularBlue,
    fontWeight: 700,
  },
  generalText: {
    color: wdGeneralText,
  },
  link: {
    textDecoration: 'none',
    '& hover': {
      textDecorationLine: 'none',
    },
  },
});

/*
Props 
propertyPhoto: shows the main photo of the property
price: property price
location: property location

*/

export default function MyPropertyCard(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Link className={classes.link} >
          <CardActionArea>
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={props.propertyPhoto}
                  title="Foto del Inmueble"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent>
                  <Grid container>
                    <Box pl={2}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Icon>
                            <img src={MyPropertiesIcon} alt="edificio"></img>
                          </Icon>
                          <Typography
                            className={classes.generalText}
                            gutterBottom
                            align="left"
                            variant="subtitle1"
                          >
                            Renta
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            className={classes.generalText}
                            gutterBottom
                            variant="subtitle1"
                          >
                            Departamento
                          </Typography>
                        </Grid>
                      </Grid>
                      {
                        <NumberFormat
                          value={props.price}
                          thousandSeparator={true}
                          displayType={'text'}
                          prefix={'$'}
                          suffix={'MXN'}
                          renderText={(value) => (
                            <Typography variant="h5" align="left">
                              {value}
                            </Typography>
                          )}
                        />
                      }

                      <Typography className={classes.generalText} variant="h6">
                        {props.location}
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>
                <CardActions className={classes.alignButtons}>
                  <Button className={classes.outlineButton}>Editar</Button>
                  <Button className={classes.regularBlueButton}>
                    Ver Contacto
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </CardActionArea>
        </Link>
      </Card>
    </React.Fragment>
  );
}
