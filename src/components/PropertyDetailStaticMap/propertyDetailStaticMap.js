import React,{useState} from 'react';
import { StaticGoogleMap, Path, Marker } from 'react-static-google-map';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    sizeMap: {
        width: 600,
        height: 500,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: 400
        }
    }
}));

export const PropertyDetailStaticMap = props => {

    /*
        props ============

        latLng = string 'xxx,xxx'
        isExactLocation = boolean
    */

    const classes = useStyles();

    //const splitedLatLng = props.latLng.split(',')

    const lat = props.lat; //used when location is not exact
    const lng = props.lng; //used when location is not exact



    const GMapCircle = (lat, lng, rad, detail = 10) => {
        var circlePoints = []

        var r = 6371;

        var pi = Math.PI;

        var _lat = (lat * pi) / 180;
        var _lng = (lng * pi) / 180;
        var d = (rad / 1000) / r;

        var i = 0;

        for (i = 0; i <= 360; i += detail) {
            var brng = i * pi / 180;

            var pLat = Math.asin(Math.sin(_lat) * Math.cos(d) + Math.cos(_lat) * Math.sin(d) * Math.cos(brng));
            var pLng = ((_lng + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(_lat), Math.cos(d) - Math.sin(_lat) * Math.sin(pLat))) * 180) / pi;
            pLat = (pLat * 180) / pi;

            circlePoints.push({ lat: pLat, lng: pLng });
        }

        return circlePoints;
    }

    return (
        <React.Fragment>

            <StaticGoogleMap apiKey="AIzaSyCVzD2DnsLYxkD5sNF_IOSF24h5r6JiR9o"
                center={props.latLng}
                zoom="17"
                size="600x500"
                className={classes.sizeMap}
            >
                {props.isExactLocation ?
                    <Marker iconURL='https://tinyurl.com/y4wlmdeb' location={props.latLng} /> //Poner bandera en la vista para saber si es exacto o no
                    :
                    <Path fillcolor='0x4eb2e490' weight='2' points={GMapCircle(lat,lng, 200)} />}
            </StaticGoogleMap>

        </React.Fragment>
    )
}