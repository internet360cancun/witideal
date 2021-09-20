import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Grid,  } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import NumberFormat from "react-number-format";
import { Link } from 'react-router-dom';
import { propertyType_es, action_es } from '../../assets/Strings'
import urlTranslator from '../../helpers/urlTranslator';

const wdBlueBackground = '#3F19F9';

const useStyles = makeStyles({
  borderTop: {
    borderTop: '1px dashed'
  },
  subtitleText: {
    color: wdBlueBackground,
    fontWeight: 700,
    fontSize: '1.1em',
    margin: 'opx',
    padding: '0px'
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    
  },
  area: {
    position: 'relative',
    height: '100%',
  },
  bold:{
    fontWeight: 700,
  },
  action: {
    fontWeight: 700,
    color: '#000'
  }
});

const PictureCOntainer = styled('div')({
  width: '100%',
  height: '200px',
  ['@media (max-width:600px)']: {
    height: '120px',
  }
})

const Picture = styled('img')({
  display:'block',
  width: '100%!important',
  height: '100%!important',
  objectFit: 'cover',
  objectPosition: 'center center',
})

function InterestedCard(props) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Card className={classes.area} elevation={4}>
        <Link className={classes.link} to={`/propiedad/${urlTranslator(props.properData.propertyType)}/${urlTranslator(props.properData.action)}/${props.properData._id}`} target='_blank'>
          <Grid container justify='center' alignItems='center'>
            <Grid md={12} xs={5} item>
              <PictureCOntainer>
                <Picture 
                  component="img"
                  alt="Imagen de la Propiedad"
                  src={props.properData.principalPhotoPath || "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/witideal%2FO77Sae7IfHRUem9FeZ54Uwpjbnn2%2FClMIb9hshbNbEAuMr3bD%2Fthumb%401100_JPEG_20191125_224414_743451701026495907.jpeg?alt=media&token=5ac2f147-9ca6-4406-85a3-0e8e2d74c3b1"}
                  title="Imagen de la Propiedad"
                />
              </PictureCOntainer>
            </Grid>
            <Grid md={12} xs={7} item>
              <CardContent>
                <Grid container justify="center" alignItems="center" spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justify='center' alignItems='center'>
                      <Grid item xs={12}>
                        <NumberFormat
                          value={props.properData.price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'$ '}
                          suffix={` ${props.properData.currency}`}
                          renderText={value => <Typography align='center' className={classes.subtitleText}>{value}</Typography>}
                        />
                        <Typography align='center' variant='subtitle1' className={classes.action}>
                          {propertyType_es[props.properData.propertyType]} para {action_es[props.properData.action]}
                        </Typography>
                        <Typography variant='body1' align='center'  >
                          {/* {props.properData.route ? `${props.properData.route} ` : ''} 
                          {props.properData.street_number ? `${props.properData.street_number} ` : ''}  */}
                          {props.properData.int_number ? `${props.properData.int_number}, ` : ''} 
                          {props.properData.sublocality_level_1 ? `${props.properData.sublocality_level_1}, ` : ''}
                          {props.properData.administrative_area_level_2_3 ? `${props.properData.administrative_area_level_2_3} ,` : ''}
                          {/* {props.properData.postal_code ? `${props.properData.postal_code}, ` : ''} */}
                          {props.properData.administrative_area_level_1 ? `${props.properData.administrative_area_level_1}` : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Link>
      </Card>
    </React.Fragment>
  );
}

export default InterestedCard
