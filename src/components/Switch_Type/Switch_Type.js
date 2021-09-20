import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


export function SwitchType(props) {

    const wdLightBlue = '#41B8F9';
    // const wdLightGreen = '#32FFD2';

    const useStyles = makeStyles(theme => ({
        wdBtnItem: {
            border: 'solid',
            borderWidth: 1,
            borderRadius: 50,
            borderColor: wdLightBlue,
            fontWeight: 700
        },
        wdBtnContainer:{
            '& .MuiButton-contained':{
                backgroundColor: 'red'
            }
        }
        
    }));
    const classes = useStyles();

    let [valores,setValores] = useState(['Habitacional', 'Comercial']);
    let [varianTog_ha,setVariant_ha] = useState('outlined');
    let [varianTog_co,setVariant_co] = useState('outlined');

    function handleClick_hab() {
        
        let actualVariant_ha = varianTog_ha === 'outlined' ? 'contained' : 'outlined';
        
        setVariant_ha(actualVariant_ha);
        setVariant_co('outlined');
        props.toHab();
    }

    function handleClick_com() {

        let actualVariant_co = varianTog_co === 'outlined' ? 'contained' : 'outlined';
        
        setVariant_ha('outlined');
        setVariant_co(actualVariant_co);
        props.toCom();
    }

    function defaultVal(){
        switch (props.children) {
            case valores[0]:
                handleClick_hab();
                break;
            case valores[1]:
                handleClick_com();
            default:
                break;
        }
    }

    React.useEffect(()=>{
        //defaultVal();
    },[props.children])


    //console.log(valores[chRent])
    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item sm>
                    <Button size='large' fullWidth={true} color='primary' variant={varianTog_ha} className={classes.wdBtnItem} onClick={handleClick_hab}>{valores[0]}</Button>
                </Grid>
                <Grid item sm>
                    <Button size='large' fullWidth={true} color='primary' variant={varianTog_co} className={classes.wdBtnItem} onClick={handleClick_com}>{valores[1]}</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
