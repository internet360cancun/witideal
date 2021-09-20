import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core'
import NumberFormat from "react-number-format";
import { Dropdown } from '../Dropdown/dropdown';

const wdRegularBlue = '#1E0E6F';
const wdHighlightBlue = '#3F19F9';

const useStyles = makeStyles({
    container: {
        backgroundColor: '#F9F7FC'
    },
    textHighLightBlue2: {
        color: wdHighlightBlue,
        fontWeight: 700
    },
    textWhite: {
        color: 'white',
        fontWeight: 700
    },
    textHighLightBlue: {
        color: wdRegularBlue,
        fontWeight: 700
    },
    textRegularBlue: {
        color: wdRegularBlue
    },
    topSeparator: {
        marginTop: 50
    },
    formTitle: {
        color: wdRegularBlue,
        fontWeight: 700,
        marginBottom: 50
    },
    formControl: {
        margin: 2,
        minWidth: 120,
    },
})

export const PackageSelecter = props => {

    /*
        PROPS =====
        handler
        witiPackage
        numberPackages
    */

    const classes = useStyles();


    return (
        <React.Fragment>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={12} md={7} lg={6}>
                    <Grid container justify='center' alignItems='center' spacing={1}>
                        <Grid item xs={3} md={4}>
                            
                            
                            <Typography align='left' className={classes.textHighLightBlue} variant='h6'>{props.witiPackage.displayName}</Typography>
                            <Typography align='left' className={classes.textRegularBlue}> {props.witiPackage.witicoins > 0 ? `${props.witiPackage.witicoins} witicoins` : ''}</Typography>
                            <Typography align='left' className={classes.textRegularBlue}> {props.witiPackage.promoUploads > 0 ? `${props.witiPackage.promoUploads} cargas gratis` : ''} </Typography>
                            <Typography align='left' className={classes.textRegularBlue}> {props.witiPackage.promoWiticoins > 0 ? `+ ${props.witiPackage.promoWiticoins} witicoins de regalo` : ''}</Typography>
                        </Grid>
                        <Grid item xs={3} md={5}>
                            <NumberFormat
                                value={props.witiPackage.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$ '}
                                renderText={value => <Typography className={classes.textHighLightBlue} variant='h5'>{value}</Typography>}
                            />
                            <Typography className={classes.textRegularBlue} > + IVA</Typography>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <Dropdown
                                inputLabel='Cantidad'
                                fullWidth={true}
                                value={props.numberPackages > 0 ? props.numberPackages : 0}
                                handler={props.handler}
                                name={props.witiPackage.id}
                                valuesArray={[...Array(10).keys()]}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}