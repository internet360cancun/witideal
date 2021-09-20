import React from 'react';
import { Map } from '../Map/map';
import { Searchbar } from '../Searchbar/searchbar';
import { Grid,TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    inputForm:{
        marginBottom: 10,
        borderRadius: 50
    }
}));

export const InputMap = (props) => {

    const classes = useStyles();

    const [center, setCenter] = React.useState({ lat: 19.432608, lng: -99.133209 });
    const [markedPos, setMarkedPos] = React.useState({ lat: 19.432608, lng: -99.133209 });
    const [zoom, setZoom] = React.useState(14);
    const [address, setAddress] = React.useState(props.location.address);

    function setNewMapPos(latLng, z) {
        setMarkedPos(latLng);
        setCenter(latLng);
        setZoom(z);
    }


    function getAddress(addressToGet){
        setAddress(addressToGet)
    }

    React.useEffect(()=>{
        props.getAddress({
            ...props.location,
            ...address,
            })
    },[address])

    return (
        <React.Fragment>

            <Grid container spacing={6}>
                <Grid item md={12}>
                    <Typography align='left' variant='h6'>Escribe la dirección de tu inmueble en el buscador.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Searchbar getNewPos={setNewMapPos} getAddress={getAddress} />
                </Grid>
                <Grid item md={4}>
                    <TextField fullWidth value={props.location.street_address !== undefined ? props.location.street_address : ''} label='Calle' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.street_number !== undefined ? props.location.street_number : ''} label='Número' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.sublocality_level_1 !== undefined ? props.location.sublocality_level_1 : ''} label='Colonia' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.administrative_area_level_2_3 !== undefined ? props.location.administrative_area_level_2_3 : ''} label='Municipio/Delegación' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.postal_code !== undefined ? props.location.postal_code : ''} label='C.P.' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.locality !== undefined ? props.location.locality : ''} label='Ciudad' variant='outlined' className={classes.inputForm}></TextField>
                    <TextField fullWidth value={props.location.administrative_area_level_1 !== undefined ? props.location.administrative_area_level_1 : ''} label='Estado' variant='outlined' className={classes.inputForm}></TextField>
                </Grid>
                <Grid item md={8}>
                    <Map defaultCenter={{ lat: 19.432608, lng: -99.133209 }}
                        center={center}
                        defaultZoom={14}
                        circle={false}
                        markedPos={markedPos}
                        getNewPos={setNewMapPos}
                        zoom={zoom}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}