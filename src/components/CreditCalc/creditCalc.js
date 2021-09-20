import React, { useState } from 'react';
import { Grid, Paper, Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import calculatorIcon from '../../assets/calculatorIcon.svg';
import { Currency } from '../Currency/currency';
import TextField from '../../layouts/textfield_auto_resize'

const wdRegularBlue = '#1E0E6F';
const wdHighlightBlue = '#3F19F9';
const wdLightBlue = '#41B8F9';
const wdGlowBlue = '#32FFD2';
const wdDarkBlue = '#3F19F9';

const useStyles = makeStyles(theme => ({
    calcButton: {
        borderRadius: 50,
        backgroundColor: wdHighlightBlue,
        marginTop: 20
    },
    paper: {
        borderRadius: 20,
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
    topShortSeparator: {
        marginTop: 10
    },
    textInput: {
        marginBottom: 10,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#41B8F9',
            borderRadius: 50,
          },
          '&:hover fieldset': {
            borderColor: wdHighlightBlue,
          },
          '&.Mui-focused fieldset': {
            borderColor:wdHighlightBlue,
          },
        },
    }
}));

export const CreditCalc = props => {

    const classes = useStyles();

    const [numRentProperties, setNumRentProperties] = useState('');
    const [numSaleProperties, setNumSaleProperties] = useState('');
    const [avgRentProperties, setAvgRentProperties] = useState('');
    const [avgSaleProperties, setAvgSaleProperties] = useState('');


    const handleNumRentProperties = event => {
        setNumRentProperties(event.target.value);
    }
    const handleNumSaleProperties = event => {
        setNumSaleProperties(event.target.value);
    }
    const handleAvgRentProperties = event => {
        setAvgRentProperties(event.target.value);
    }
    const handleAvgSaleProperties = event => {
        setAvgSaleProperties(event.target.value);
    }


    // console.log('numRentProperties', numRentProperties);
    // console.log('numSaleProperties', numSaleProperties);
    // console.log('avgRentProperties', avgRentProperties);
    // console.log('avgSaleProperties', avgSaleProperties);

    // const selectPackage = credits => {



    //     //thresholds
    //     let packageA = 500;
    //     let packageB = 5000;
    //     let packageC = 10000;
    //     //let packageD = 50000;

    //     if(credits > 0 && credits <= packageA){
    //         return 'package A'
    //     }else if(credits > packageA && credits <= packageB){
    //         return 'package B'
    //     }else if(credits > packageB && credits <= packageC){
    //         return 'package C'
    //     }else if(credits > packageC){
    //         return 'package D'
    //     }
    // }

    const handleCalcCredits = () => {
        const avgClicks = 6;
        const clickCostRent = 0.0015;
        const clickCostSale = 0.00002;
        const uploadCostRent = 0;
        const uploadCostSale = 0;

        let creditsUploadRent = uploadCostRent * numRentProperties;
        let creditsCPCRent = avgClicks * clickCostRent * Math.abs(numRentProperties) * Math.abs(avgRentProperties);
        creditsCPCRent = creditsCPCRent ? creditsCPCRent : 0
        
        let creditsUploadSale = uploadCostSale * numSaleProperties;
        let creditsCPCSale = avgClicks * clickCostSale * Math.abs(numSaleProperties) * Math.abs(avgSaleProperties);
        creditsCPCSale = creditsCPCSale ? creditsCPCSale : 0
        
        let totalCredits = creditsUploadRent + creditsCPCRent + creditsUploadSale + creditsCPCSale;
        console.log('totalCredits',totalCredits)
        props.setTotalCredits(Math.round(totalCredits));
    }

    


    return (
        <React.Fragment>
            <Paper className={classes.paper} elevation={2}>
                <img src={calculatorIcon} alt='calculator Icon for credit simulator' />
                <Box p={5}>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item lg={10}>
                            <Typography
                                className={classes.textHighLightBlue}
                                align='center'
                                variant='h5'
                                gutterBottom
                            >Utiliza el simulador para saber cuántos witicoins necesitas para tus inmuebles</Typography>

                            <Typography
                                className={classes.textRegularBlue}
                                align='center'
                                gutterBottom
                            >Los cobros se realizarán directamente sobre tus witicoins y podrás comprar más cada vez que sea necesario. </Typography>
                        </Grid>

                        <Grid item lg={8} className={classes.topSeparator}>
                            <form autoComplete='off'>
                                <Grid container justify='center' alignItems='center' spacing={2}>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <Typography className={classes.textHighLightBlue} gutterBottom variant='h5'>Renta</Typography>
                                        <TextField
                                            fullWidth
                                            id='numRentProperties'
                                            value={numRentProperties}
                                            className={classes.textInput}
                                            // defaultValue={numRentProperties}
                                            onChange={handleNumRentProperties}
                                            variant='outlined'
                                            label='No. de Propiedades'
                                            type='number'>

                                        </TextField>
                                        <Currency setter={setAvgRentProperties} label={'Precio Promedio Renta'}></Currency>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={12}>
                                        <Typography className={classes.textHighLightBlue} gutterBottom variant='h5'>Venta</Typography>
                                        <TextField
                                            fullWidth
                                            id='numSaleProperties'
                                            // defaultValue={numSaleProperties}
                                            onChange={handleNumSaleProperties}
                                            className={classes.textInput}
                                            value={numSaleProperties}
                                            variant='outlined'
                                            label='No. de Propiedades'
                                            type='number'></TextField>
                                        <Currency setter={setAvgSaleProperties} label={'Precio Promedio Venta'}></Currency>
                                    </Grid>
                                </Grid>


                            </form>
                            <Button
                                className={classes.calcButton}
                                onClick={handleCalcCredits}
                                // fullWidth
                                size='large'
                                variant='contained'
                                color='primary'>Calcular witicoins</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    )
}